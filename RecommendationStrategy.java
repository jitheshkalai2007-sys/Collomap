package com.collegefinder.recommendation;

import com.collegefinder.model.College;
import com.collegefinder.model.Student;

import java.util.OptionalDouble;

public interface RecommendationStrategy {
    String getName();

    double score(Student student, College college, OptionalDouble distanceKm);
}
