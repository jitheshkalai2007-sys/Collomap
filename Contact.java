package com.collegefinder.model;

public record Contact(String staffName, String designation, String phoneNumber) {
    public Contact {
        staffName = staffName == null ? "" : staffName.trim();
        designation = designation == null ? "" : designation.trim();
        phoneNumber = phoneNumber == null ? "" : phoneNumber.trim();
    }
}
