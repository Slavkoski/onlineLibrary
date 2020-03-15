package com.online.library.onlinelibrary.service;

import com.online.library.onlinelibrary.model.Author;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface AuthorService {
  List<Author> getAll();

  List<Author> searchByName(String name);

  Author getById(int id);

  Author addAuthor(String firstName, String lastName, String city, String country, String biography,
      String birthDate, MultipartFile image);

  void deleteById(Integer authorId);
}
