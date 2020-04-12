package com.online.library.onlinelibrary.service;

import com.online.library.onlinelibrary.model.Book;
import com.online.library.onlinelibrary.model.Genre;

import com.online.library.onlinelibrary.model.SearchResultModel;
import java.util.List;

public interface GenreService {
  List<Genre> getAll();

  List<Book> getAllBooksByGenreId(int genreId);

  List<Book> getAllBooksByGenreName(String genreName);

  Genre addGenre(String name);

  void deleteGenre(Integer genreId);

  Genre getGenreById(Integer genreId);

  List<Genre> getGenreByBookId(Integer bookId);

  List<SearchResultModel> searchGenres(String searchTerm);

  List<Book> getAllBooksByGenreIdAndPageNumber(Integer genreId, Integer pageNumber);

  Integer getNumberOfPagesByGenreId(Integer genreId);

  Genre getGenreByIdAndPageNumber(Integer genreId, Integer pageNumber);

  void removeBookFromAllGenres(Book book);
}
