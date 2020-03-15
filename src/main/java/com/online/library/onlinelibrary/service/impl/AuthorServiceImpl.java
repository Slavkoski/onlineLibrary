package com.online.library.onlinelibrary.service.impl;

import com.online.library.onlinelibrary.model.Author;
import com.online.library.onlinelibrary.repository.AuthorRepository;
import com.online.library.onlinelibrary.service.AuthorService;
import java.io.IOException;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

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
  public Author addAuthor(String firstName, String lastName, String city, String country,
      String biography, String birthDate, MultipartFile image) {
    try {
      Author author = Author.builder()
          .firstName(firstName)
          .lastName(lastName)
          .city(city)
          .country(country)
          .birthDate(new SimpleDateFormat("dd/MM/yyyy").parse(birthDate))
          .biography(biography)
          .books(new ArrayList<>())
          .image(image.getBytes())
          .build();
      return authorRepository.save(author);
    } catch (ParseException | IOException e) {
      e.printStackTrace();
    }
    return null;
  }

  @Override
  public void deleteById(final Integer authorId) {
    authorRepository.deleteById(authorId);
  }
}
