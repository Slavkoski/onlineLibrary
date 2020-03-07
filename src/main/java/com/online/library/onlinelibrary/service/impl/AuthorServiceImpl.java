package com.online.library.onlinelibrary.service.impl;

import com.online.library.onlinelibrary.model.Author;
import com.online.library.onlinelibrary.repository.AuthorRepository;
import com.online.library.onlinelibrary.service.AuthorService;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

@Service
public class AuthorServiceImpl implements AuthorService {
    private final AuthorRepository authorRepository;

    public AuthorServiceImpl(final AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    @Override
    public List<Author> getAll() {
        return authorRepository.findAll();
    }

    @Override
    public List<Author> searchByName(final String name) {
        return authorRepository.findAllByFirstName(name);
    }

    @Override
    public Author getById(final int id) {
        return authorRepository.getOne(id);
    }

    @Override
    public Author addAuthor(String firstName, String lastName, String biography, String birthDate) {
        try {
            Author author = new Author(firstName, lastName, biography, new SimpleDateFormat("dd/MM/yyyy").parse(birthDate));
            return authorRepository.save(author);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public void deleteById(final Integer authorId) {
        authorRepository.deleteById(authorId);
    }
}
