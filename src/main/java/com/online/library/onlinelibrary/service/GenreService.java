package com.online.library.onlinelibrary.service;

import com.online.library.onlinelibrary.model.Book;
import com.online.library.onlinelibrary.model.Genre;

import java.util.List;

public interface GenreService {
    List<Genre> getAll();
    List<Book> getAllBooksByGenreId(int genreId);
    List<Book> getAllBooksByGenreName(String genreName);
}
