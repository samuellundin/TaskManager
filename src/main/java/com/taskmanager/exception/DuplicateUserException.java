package com.taskmanager.exception;

public class DuplicateUserException extends Exception {

    private static final String MESSAGE = "User already exist";

    public DuplicateUserException() {
        super(MESSAGE);
    }

    public DuplicateUserException(String message) {
        super(message);
    }

}
