package com.collegefinder.model;

public final class Student {
    private final String name;
    private final String city;
    private final double marks10;
    private final double marks12;
    private final Course preferredCourse;

    public Student(String name, String city, double marks10, double marks12, Course preferredCourse) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Student name is required");
        }
        if (city == null || city.isBlank()) {
            throw new IllegalArgumentException("Student city is required");
        }
        validateMarks(marks10, "10th");
        validateMarks(marks12, "12th");
        if (preferredCourse == null) {
            throw new IllegalArgumentException("Preferred course is required");
        }
        this.name = name.trim();
        this.city = city.trim();
        this.marks10 = marks10;
        this.marks12 = marks12;
        this.preferredCourse = preferredCourse;
    }

    private static void validateMarks(double marks, String exam) {
        if (!Double.isFinite(marks) || marks < 0 || marks > 100) {
            throw new IllegalArgumentException(exam + " marks must be between 0 and 100");
        }
    }

    public String getName() {
        return name;
    }

    public String getCity() {
        return city;
    }

    public double getMarks10() {
        return marks10;
    }

    public double getMarks12() {
        return marks12;
    }

    public Course getPreferredCourse() {
        return preferredCourse;
    }
}
