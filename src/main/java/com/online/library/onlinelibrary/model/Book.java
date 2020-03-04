package com.online.library.onlinelibrary.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;

    @ManyToMany(mappedBy = "books")
    private List<Author> author;
    private String description;
    private String publishedYear;
    @Lob
    private byte[] pdf;

    public Book(final String title, final String description, final String publishedYear, final List<Author> authorList) {
        this.title=title;
        this.description=description;
        this.publishedYear=publishedYear;
        this.author=authorList;
    }
    public Book(final String title, final String description, final String publishedYear) {
        this.title=title;
        this.description=description;
        this.publishedYear=publishedYear;
        this.author=new ArrayList<>();
    }
}
