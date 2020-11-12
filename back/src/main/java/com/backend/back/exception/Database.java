package com.backend.back.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class Database extends RuntimeException{
    public Database(String message) {
        super(message);
    }
}
