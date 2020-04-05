package com.online.library.onlinelibrary.service.impl;

import com.online.library.onlinelibrary.model.Book;
import com.online.library.onlinelibrary.model.Genre;
import com.online.library.onlinelibrary.model.SearchResultModel;
import com.online.library.onlinelibrary.repository.BookRepository;
import com.online.library.onlinelibrary.repository.GenreRepository;
import com.online.library.onlinelibrary.service.BookService;
import com.online.library.onlinelibrary.service.GenreService;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GenreServiceImpl implements GenreService {
  private final GenreRepository genreRepository;
  private final BookRepository bookRepository;

  public GenreServiceImpl(final GenreRepository genreRepository,
      final BookRepository bookRepository) {
    this.genreRepository = genreRepository;
    this.bookRepository = bookRepository;
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

  @Override
  public Genre addGenre(final String name) {
    return genreRepository.save(Genre.builder().name(name).build());
  }

  @Override
  public void deleteGenre(final Integer genreId) {
    genreRepository.deleteById(genreId);
  }

  @Override
  public Genre getGenreById(final Integer genreId) {
    return genreRepository.getOne(genreId);
  }

  @Override
  public List<Genre> getGenreByBookId(final Integer bookId) {
    Book book = bookRepository.getOne(bookId);
    return genreRepository.findByBooksContains(book);
  }

  @Override
  public List<SearchResultModel> searchGenres(String searchTerm) {
    return genreRepository.findAllByNameContains(searchTerm)
        .stream()
        .map(this::createSearchResultModel)
        .collect(Collectors.toList());
  }

  private SearchResultModel createSearchResultModel(Genre genre) {
    return SearchResultModel.builder()
        .id(genre.getId())
        .title(genre.getName())
        .link("/genre/" + genre.getId())
        .description("")
        .build();
  }
}
