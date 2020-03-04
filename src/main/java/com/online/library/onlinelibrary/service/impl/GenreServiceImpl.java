package com.online.library.onlinelibrary.service.impl;

import com.online.library.onlinelibrary.model.Book;
import com.online.library.onlinelibrary.model.Genre;
import com.online.library.onlinelibrary.repository.GenreRepository;
import com.online.library.onlinelibrary.service.GenreService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GenreServiceImpl implements GenreService {
    private final GenreRepository genreRepository;

    public GenreServiceImpl(final GenreRepository genreRepository) {
        this.genreRepository = genreRepository;
    }

    @Override
    public List<Genre> getAll() {
        return genreRepository.findAll();
    }

    @Override
    public List<Book> getAllBooksByGenreId(final int genreId) {
        return genreRepository.getOne(genreId).getBooks();
    }

    @Override
    public List<Book> getAllBooksByGenreName(final String genre) {
        return genreRepository.getByName(genre).getBooks();
    }
}
