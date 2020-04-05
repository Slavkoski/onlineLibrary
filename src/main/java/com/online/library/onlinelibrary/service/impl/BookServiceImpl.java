package com.online.library.onlinelibrary.service.impl;

import com.online.library.onlinelibrary.model.Author;
import com.online.library.onlinelibrary.model.Book;
import com.online.library.onlinelibrary.model.Genre;
import com.online.library.onlinelibrary.model.Publisher;
import com.online.library.onlinelibrary.model.SearchResultModel;
import com.online.library.onlinelibrary.repository.AuthorRepository;
import com.online.library.onlinelibrary.repository.BookRepository;
import com.online.library.onlinelibrary.repository.GenreRepository;
import com.online.library.onlinelibrary.repository.PublisherRepository;
import com.online.library.onlinelibrary.service.BookService;
import com.online.library.onlinelibrary.service.GenreService;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class BookServiceImpl implements BookService {
  private final BookRepository bookRepository;
  private final AuthorRepository authorRepository;
  private final GenreRepository genreRepository;
  private final GenreService genreService;
  private final PublisherRepository publisherRepository;

  public BookServiceImpl(BookRepository bookRepository, final AuthorRepository authorRepository,
      final GenreRepository genreRepository, final GenreService genreService,
      final PublisherRepository publisherRepository) {
    this.bookRepository = bookRepository;
    this.authorRepository = authorRepository;
    this.genreRepository = genreRepository;
    this.genreService = genreService;
    this.publisherRepository = publisherRepository;
  }

  @Override
  public Book save(final String title, final String description, final String publishedYear,
      final Integer publishedId, List<Integer> genreIds, List<Integer> authors,
      final MultipartFile image, final MultipartFile pdf) {
    genreIds = genreIds.stream().distinct().collect(Collectors.toList());
    authors = authors.stream().distinct().collect(Collectors.toList());
    List<Author> authorList = new ArrayList<>();
    try {
      Book book = bookRepository.save(Book.builder()
          .title(title)
          .description(description)
          .publishedYear(publishedYear)
          .author(new ArrayList<>())
          .image(image.getBytes())
          .pdf(pdf.getBytes())
          .build());
      authors.forEach(authorId -> authorList.add(authorRepository.getOne(authorId)));
      authorList.forEach(author -> {
        book.getAuthor().add(author);
        author.getBooks().add(book);
        authorRepository.save(author);
      });
      genreIds.forEach(genreId -> {
        Genre genre = genreRepository.getOne(genreId);
        genre.getBooks().add(book);
        genreRepository.save(genre);
      });
      Publisher publisher = publisherRepository.getOne(publishedId);
      publisher.getBooks().add(book);
      publisherRepository.save(publisher);
      return bookRepository.save(book);
    } catch (IOException e) {
      e.printStackTrace();
    }
    return null;
  }

  @Override
  public List<Book> getAll() {
    return bookRepository.findAll();
  }

  @Override
  public List<Author> getAuthorsForBook(final Integer bookId) {
    return bookRepository.findById(bookId).map(Book::getAuthor).orElse(new ArrayList<>());
  }

  @Override
  public Book getById(final Integer bookId) {
    return bookRepository.findById(bookId).orElse(null);
  }

  @Override
  public void deleteBookById(final Integer bookId) {
    Book book = bookRepository.getOne(bookId);
    List<Author> authorList = book.getAuthor();
    authorList.forEach(author -> {
      author.getBooks().remove(book);
      authorRepository.save(author);
    });
    bookRepository.delete(book);
  }

  @Override
  public List<Genre> getGenreByBookId(final Integer bookId) {
    return genreService.getGenreByBookId(bookId);
  }

  @Override
  public byte[] getImageByBookId(Integer bookId) {
    return bookRepository.getOne(bookId).getImage();
  }

  @Override
  public byte[] getPdfByBookId(Integer bookId) {
    return bookRepository.getOne(bookId).getPdf();
  }

  @Override
  public List<SearchResultModel> searchBooks(String searchTerm) {
    return bookRepository
        .findAllByTitleContainsOrDescriptionContainsOrPublishedYearContains(searchTerm, searchTerm,
            searchTerm)
        .stream()
        .map(this::createSearchResultModel)
        .collect(Collectors.toList());
  }

  private SearchResultModel createSearchResultModel(Book book) {
    return SearchResultModel.builder()
        .id(book.getId())
        .title(book.getTitle())
        .link("/book/" + book.getId())
        .description(
            book.getDescription().length() > 500 ? book.getDescription().substring(0, 495) + "..."
                : book.getDescription())
        .build();
  }
}
