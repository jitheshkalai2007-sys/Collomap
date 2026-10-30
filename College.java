package com.collegefinder.model;

import java.util.List;

public abstract class College {
    private final long id;
    private final String name;
    private final String location;
    private final double cutoff;
    private final double rating;
    private final double infrastructureScore;
    private final double foodScore;
    private final double transportScore;
    private final Course course;
    private final List<Contact> contacts;

    protected College(long id, String name, String location, double cutoff, double rating,
                      double infrastructureScore, double foodScore, double transportScore,
                      Course course, List<Contact> contacts) {
        if (id < 0 || name == null || name.isBlank() || location == null || location.isBlank()) {
            throw new IllegalArgumentException("College id, name, and location are required");
        }
        validateScore(cutoff, "cutoff");
        if (!Double.isFinite(rating) || rating < 0 || rating > 5) {
            throw new IllegalArgumentException("rating must be between 0 and 5");
        }
        validateScore(infrastructureScore, "infrastructure score");
        validateScore(foodScore, "food score");
        validateScore(transportScore, "transport score");
        if (course == null) {
            throw new IllegalArgumentException("College course is required");
        }
        this.id = id;
        this.name = name.trim();
        this.location = location.trim();
        this.cutoff = cutoff;
        this.rating = rating;
        this.infrastructureScore = infrastructureScore;
        this.foodScore = foodScore;
        this.transportScore = transportScore;
        this.course = course;
        this.contacts = contacts == null ? List.of() : List.copyOf(contacts);
    }

    private static void validateScore(double score, String field) {
        if (!Double.isFinite(score) || score < 0 || score > 100) {
            throw new IllegalArgumentException(field + " must be between 0 and 100");
        }
    }

    public abstract String getType();

    public long getId() { return id; }
    public String getName() { return name; }
    public String getLocation() { return location; }
    public double getCutoff() { return cutoff; }
    public double getRating() { return rating; }
    public double getInfrastructureScore() { return infrastructureScore; }
    public double getFoodScore() { return foodScore; }
    public double getTransportScore() { return transportScore; }
    public Course getCourse() { return course; }
    public List<Contact> getContacts() { return contacts; }
}
