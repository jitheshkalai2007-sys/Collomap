package com.collegefinder.recommendation;

import com.collegefinder.model.College;

import java.util.OptionalDouble;

public record Recommendation(College college, double score, OptionalDouble distanceKm) {
}
