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
  private static final Integer PAGE_SIZE = 9;

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

  @Override
  public List<Book> getAllBooksByGenreIdAndPageNumber(Integer genreId, Integer pageNumber) {
    List<Book> allBooks = getAllBooksByGenreId(genreId);
    int listSize = allBooks.size();
    return allBooks.subList(calculateStartIndex(pageNumber, listSize),
        calculateEndIndex(pageNumber, listSize));
  }

  @Override
  public Integer getNumberOfPagesByGenreId(Integer genreId) {
    return calculateNumberOfPages(getAllBooksByGenreId(genreId).size());
  }

  @Override
  public Genre getGenreByIdAndPageNumber(Integer genreId, Integer pageNumber) {
    Genre genre = getGenreById(genreId);
    List<Book> allBooks = genre.getBooks();
    int listSize = allBooks.size();
    genre.setBooks(allBooks.subList(calculateStartIndex(pageNumber, listSize),
        calculateEndIndex(pageNumber, listSize)));
    return genre;
  }

  @Override
  public void removeBookFromAllGenres(Book book) {
    getGenreByBookId(book.getId()).forEach(genre -> {
      genre.getBooks().remove(book);
      genreRepository.save(genre);
    });
  }

  private SearchResultModel createSearchResultModel(Genre genre) {
    return SearchResultModel.builder()
        .id(genre.getId())
        .title(genre.getName())
        .link("/genre/" + genre.getId())
        .description("")
        .build();
  }

  private int calculateStartIndex(int pageNumber, int listSize) {
    int startIndex = (pageNumber - 1) * PAGE_SIZE;
    return Math.min(startIndex, listSize);
  }

  private int calculateEndIndex(int pageNumber, int listSize) {
    int endIndex = (pageNumber) * PAGE_SIZE;
    return Math.min(endIndex, listSize);
  }

  private int calculateNumberOfPages(int listSize) {
    return (int) Math.ceil(((double) listSize) / PAGE_SIZE);
  }
}
