package com.online.library.onlinelibrary.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String commentOwnerName;
    private String comment;
    @ManyToOne
    private Book book;
}
