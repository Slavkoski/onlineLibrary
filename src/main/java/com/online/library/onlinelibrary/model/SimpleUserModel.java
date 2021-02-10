package com.online.library.onlinelibrary.model;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class SimpleUserModel {

    private final long id;
    private final String firstName;
    private final String lastName;
    private final String email;
    private final List<String> roles;
}
