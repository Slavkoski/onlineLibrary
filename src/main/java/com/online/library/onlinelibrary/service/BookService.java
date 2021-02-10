package com.online.library.onlinelibrary.service;

import com.online.library.onlinelibrary.model.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collection;
import java.util.List;

public interface BookService {
  Book save(String title, String description, String publishedYear, Integer publisherId,
            List<Integer> genreId, List<Integer> authors, final String priority, MultipartFile image, MultipartFile pdf);

  List<Book> getAll();

  List<Author> getAuthorsForBook(Integer bookId);

  Book getById(Integer bookId);

  boolean deleteBookById(Integer bookId);

  List<Genre> getGenreByBookId(Integer bookId);

  byte[] getImageByBookId(Integer bookId);

  byte[] getPdfByBookId(Integer bookId);

  List<SearchResultModel> searchBooks(String searchTerm);

  List<Book> getBooksByPageNumber(Integer pageNumber, final Collection<? extends GrantedAuthority> authorities);

  Integer getNumberOfPages(final String priority);

  Book saveBook(Integer id, String title, String description, String publishedYear, List<Integer> genres, List<Integer> authors, Integer publisherId, MultipartFile image, MultipartFile pdf);

  List<Book> getBooksByPriority(Priority priority, final Collection<? extends GrantedAuthority> authorities);
}
