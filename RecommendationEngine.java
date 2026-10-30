package com.collegefinder.recommendation;

import com.collegefinder.model.College;
import com.collegefinder.model.Student;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.OptionalDouble;

public final class RecommendationEngine {
    private final List<RecommendationStrategy> strategies;

    public RecommendationEngine(List<RecommendationStrategy> strategies) {
        if (strategies == null || strategies.isEmpty()) {
            throw new IllegalArgumentException("At least one recommendation strategy is required");
        }
        this.strategies = List.copyOf(strategies);
    }

    public List<Recommendation> recommend(Student student, List<College> colleges,
                                          Map<Long, Double> distancesKm) {
        return colleges.stream()
                .filter(college -> student.getMarks12() >= college.getCutoff())
                .map(college -> {
                    Double distance = distancesKm.get(college.getId());
                    OptionalDouble distanceKm = distance == null
                            ? OptionalDouble.empty() : OptionalDouble.of(distance);
                    double score = strategies.stream()
                            .mapToDouble(strategy -> strategy.score(student, college, distanceKm))
                            .average()
                            .orElseThrow();
                    return new Recommendation(college, score, distanceKm);
                })
                .sorted(Comparator.comparingDouble(Recommendation::score).reversed()
                        .thenComparing(recommendation -> recommendation.college().getName()))
                .toList();
    }
}
