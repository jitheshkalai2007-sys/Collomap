package com.collegefinder.recommendation;

import com.collegefinder.model.College;
import com.collegefinder.model.Student;

import java.util.OptionalDouble;

public final class LocationBasedStrategy implements RecommendationStrategy {
    @Override
    public String getName() {
        return "location";
    }

    @Override
    public double score(Student student, College college, OptionalDouble distanceKm) {
        if (distanceKm.isEmpty()) {
            throw new IllegalArgumentException("Distance is required for location-based ranking");
        }
        return 100.0 / (1.0 + distanceKm.getAsDouble());
    }
}
