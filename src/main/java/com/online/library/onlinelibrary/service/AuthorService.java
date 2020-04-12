package com.online.library.onlinelibrary.service;

import com.online.library.onlinelibrary.model.Author;

import com.online.library.onlinelibrary.model.SearchResultModel;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface AuthorService {
  List<Author> getAll();

  List<Author> searchByName(String name);

  Author getById(int id);

  Author addAuthor(String firstName, String lastName, String city, String country, String biography,
      String birthDate, MultipartFile image);

  boolean deleteById(Integer authorId);

  byte[] getImageByAuthorId(Integer authorId);

  List<SearchResultModel> searchAuthors(String searchTerm);

  Author saveAuthor(Integer authorId, String firstName, String lastName, String city, String country, String biography, String birthDate, MultipartFile image);
}
