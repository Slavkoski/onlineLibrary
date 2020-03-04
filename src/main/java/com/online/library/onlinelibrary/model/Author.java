package com.online.library.onlinelibrary.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Author {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String firstName;
    private String lastName;
    private String biography;
    private Date birthDate;
    @JsonIgnore
    @ManyToMany
    private List<Book> books;

    public Author(final String firstName, final String lastName, final String biography, final Date birthDate) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.biography = biography;
        this.birthDate = birthDate;
        this.books=new ArrayList<>();
    }
}
