package com.collegefinder.recommendation;

import com.collegefinder.model.College;
import com.collegefinder.model.Student;

import java.util.OptionalDouble;

public final class RatingBasedStrategy implements RecommendationStrategy {
    @Override
    public String getName() {
        return "rating";
    }

    @Override
    public double score(Student student, College college, OptionalDouble distanceKm) {
        double ratingScore = college.getRating() * 20.0;
        double facilityScore = (college.getInfrastructureScore() + college.getFoodScore()
                + college.getTransportScore()) / 3.0;
        return ratingScore * 0.7 + facilityScore * 0.3;
    }
}
