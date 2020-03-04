package com.online.library.onlinelibrary.service;

import com.online.library.onlinelibrary.model.Author;

import java.util.List;

public interface AuthorService {
    List<Author> getAll();
    List<Author> searchByName(String name);
    Author getById(int id);
    Author addAuthor(String firstName, String lastName, String biography, String birthDate);

    void deleteById(Integer authorId);
}
