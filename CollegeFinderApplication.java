package com.collegefinder;

import com.collegefinder.data.CollegeRepository;
import com.collegefinder.data.JdbcCollegeRepository;
import com.collegefinder.integration.GoogleMapsClient;
import com.collegefinder.model.College;
import com.collegefinder.model.Course;
import com.collegefinder.model.Student;
import com.collegefinder.recommendation.LocationBasedStrategy;
import com.collegefinder.recommendation.MarksBasedStrategy;
import com.collegefinder.recommendation.RatingBasedStrategy;
import com.collegefinder.recommendation.Recommendation;
import com.collegefinder.recommendation.RecommendationEngine;
import com.collegefinder.recommendation.RecommendationStrategy;

import javax.sql.DataSource;
import java.io.Console;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;
import oracle.jdbc.pool.OracleDataSource;

public final class CollegeFinderApplication {
    private CollegeFinderApplication() {
    }

    public static void main(String[] args) throws Exception {
        Console console = System.console();
        if (console == null) {
            throw new IllegalStateException("Run from a terminal so CollegeFinder can securely prompt for DB credentials.");
        }

        String name = requiredInput(console, "Student name: ");
        String city = requiredInput(console, "Your city: ");
        double marks10 = readMarks(console, "10th marks (0-100): ");
        double marks12 = readMarks(console, "12th marks (0-100): ");
        String courseName = requiredInput(console, "Preferred course: ");
        Student student = new Student(name, city, marks10, marks12, new Course(0, courseName));

        CollegeRepository repository = createRepository(console);
        List<College> colleges = repository.findByCourse(courseName);
        if (colleges.isEmpty()) {
            System.out.println("No colleges found for course: " + courseName);
            return;
        }

        String mapsKey = System.getenv("GOOGLE_MAPS_API_KEY");
        List<RecommendationStrategy> strategies = new ArrayList<>(
                List.of(new MarksBasedStrategy(), new RatingBasedStrategy()));
        Map<Long, Double> distances = Map.of();
        if (mapsKey != null && !mapsKey.isBlank()) {
            GoogleMapsClient maps = new GoogleMapsClient(mapsKey);
            distances = fetchDistancesInParallel(student, colleges, maps);
            strategies.add(new LocationBasedStrategy());
        } else {
            System.out.println("GOOGLE_MAPS_API_KEY is not set; ranking without live distance.");
        }

        List<Recommendation> recommendations = new RecommendationEngine(strategies)
                .recommend(student, colleges, distances);
        if (recommendations.isEmpty()) {
            System.out.println("No eligible colleges found. Eligibility uses 12th marks versus course cutoff.");
            return;
        }
        printRecommendations(recommendations);
    }

    private static CollegeRepository createRepository(Console console) throws SQLException {
        String url = requiredEnvironment("COLLEGE_DB_URL");
        String username = requiredEnvironment("COLLEGE_DB_USER");
        char[] passwordChars = console.readPassword("Database password: ");
        if (passwordChars == null) {
            throw new IllegalStateException("Could not read database password");
        }
        String password = new String(passwordChars);
        java.util.Arrays.fill(passwordChars, '\0');
        OracleDataSource source = new OracleDataSource();
        source.setURL(url);
        source.setUser(username);
        source.setPassword(password);
        DataSource dataSource = source;
        return new JdbcCollegeRepository(dataSource);
    }

    private static Map<Long, Double> fetchDistancesInParallel(Student student, List<College> colleges,
                                                               GoogleMapsClient maps) throws Exception {
        ExecutorService executor = Executors.newFixedThreadPool(Math.min(colleges.size(), 8));
        try {
            List<CompletableFuture<Map.Entry<Long, Double>>> requests = colleges.stream()
                    .map(college -> CompletableFuture.supplyAsync(() -> {
                        try {
                            double km = maps.getDrivingDistanceKm(student.getCity(), college.getLocation());
                            return Map.entry(college.getId(), km);
                        } catch (Exception exception) {
                            throw new java.util.concurrent.CompletionException(exception);
                        }
                    }, executor))
                    .toList();
            return CompletableFuture.allOf(requests.toArray(CompletableFuture[]::new))
                    .thenApply(ignored -> requests.stream().map(CompletableFuture::join)
                            .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue)))
                    .get();
        } finally {
            executor.shutdown();
        }
    }

    private static void printRecommendations(List<Recommendation> recommendations) {
        int rank = 1;
        for (Recommendation recommendation : recommendations) {
            College college = recommendation.college();
            System.out.printf("%n%d. %s (%s) — score %.1f%n", rank++, college.getName(),
                    college.getType(), recommendation.score());
            System.out.printf("   Location: %s | Rating: %.1f/5 | Cutoff: %.1f%n",
                    college.getLocation(), college.getRating(), college.getCutoff());
            System.out.printf("   Facilities: infrastructure %.1f, food %.1f, transport %.1f%n",
                    college.getInfrastructureScore(), college.getFoodScore(), college.getTransportScore());
            recommendation.distanceKm().ifPresent(distance ->
                    System.out.printf("   Driving distance: %.1f km%n", distance));
            System.out.println("   Map: " + GoogleMapsClient.getMapUrl(college.getLocation()));
            college.getContacts().forEach(contact -> System.out.printf("   Contact: %s, %s — %s%n",
                    contact.staffName(), contact.designation(), contact.phoneNumber()));
        }
    }

    private static String requiredInput(Console console, String prompt) {
        String value = console.readLine("%s", prompt);
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("Input is required: " + prompt);
        }
        return value.trim();
    }

    private static double readMarks(Console console, String prompt) {
        try {
            return Double.parseDouble(requiredInput(console, prompt));
        } catch (NumberFormatException exception) {
            throw new IllegalArgumentException("Marks must be a number", exception);
        }
    }

    private static String requiredEnvironment(String name) {
        String value = System.getenv(name);
        if (value == null || value.isBlank()) {
            throw new IllegalStateException("Set the " + name + " environment variable");
        }
        return value;
    }
}
