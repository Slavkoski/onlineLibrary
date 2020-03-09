package com.online.library.onlinelibrary.service;

import com.online.library.onlinelibrary.model.Author;
import com.online.library.onlinelibrary.model.Book;
import com.online.library.onlinelibrary.model.Genre;

import java.util.List;

public interface BookService {
    Book save(String title, String description, String publishedYear,Integer publisherId, List<Integer> genreId, List<Integer> authors);

    List<Book> getAll();

    List<Author> getAuthorsForBook(Integer bookId);

    Book getById(Integer bookId);

    void deleteBookById(Integer bookId);

    List<Genre> getGenreByBookId(Integer bookId);
}
