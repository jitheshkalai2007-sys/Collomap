package com.collegefinder.model;

import java.util.List;

public final class PrivateCollege extends College {
    public PrivateCollege(long id, String name, String location, double cutoff, double rating,
                          double infrastructureScore, double foodScore, double transportScore,
                          Course course, List<Contact> contacts) {
        super(id, name, location, cutoff, rating, infrastructureScore, foodScore,
                transportScore, course, contacts);
    }

    @Override
    public String getType() {
        return "PRIVATE";
    }
}
