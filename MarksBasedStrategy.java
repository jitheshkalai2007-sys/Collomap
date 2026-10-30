package com.collegefinder.recommendation;

import com.collegefinder.model.College;
import com.collegefinder.model.Student;

import java.util.OptionalDouble;

public final class MarksBasedStrategy implements RecommendationStrategy {
    @Override
    public String getName() {
        return "marks";
    }

    @Override
    public double score(Student student, College college, OptionalDouble distanceKm) {
        return (student.getMarks10() + student.getMarks12()) / 2.0;
    }
}
