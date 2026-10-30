package com.collegefinder.model;

public record Course(long id, String name) {
    public Course {
        if (id < 0) {
            throw new IllegalArgumentException("Course id cannot be negative");
        }
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Course name is required");
        }
        name = name.trim();
    }
}
