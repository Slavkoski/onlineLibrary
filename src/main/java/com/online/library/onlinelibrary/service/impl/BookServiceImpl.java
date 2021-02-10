package com.online.library.onlinelibrary.service.impl;

import com.online.library.onlinelibrary.model.*;
import com.online.library.onlinelibrary.repository.AuthorRepository;
import com.online.library.onlinelibrary.repository.BookRepository;
import com.online.library.onlinelibrary.repository.GenreRepository;
import com.online.library.onlinelibrary.repository.PublisherRepository;
import com.online.library.onlinelibrary.service.BookService;
import com.online.library.onlinelibrary.service.CommentService;
import com.online.library.onlinelibrary.service.GenreService;

import java.util.Collection;
import java.util.stream.Collectors;

import com.online.library.onlinelibrary.util.Util;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class BookServiceImpl implements BookService {
  private static final Integer PAGE_SIZE = 9;
  private final BookRepository bookRepository;
  private final AuthorRepository authorRepository;
  private final GenreRepository genreRepository;
  private final GenreService genreService;
  private final PublisherRepository publisherRepository;
  private final CommentService commentService;

  public BookServiceImpl(BookRepository bookRepository, final AuthorRepository authorRepository,
      final GenreRepository genreRepository, final GenreService genreService,
      final PublisherRepository publisherRepository,
      CommentService commentService) {
    this.bookRepository = bookRepository;
    this.authorRepository = authorRepository;
    this.genreRepository = genreRepository;
    this.genreService = genreService;
    this.publisherRepository = publisherRepository;
    this.commentService = commentService;
  }

  @Override
  public Book save(final String title, final String description, final String publishedYear,
                   final Integer publishedId, List<Integer> genreIds, List<Integer> authors,
                   final String priority, final MultipartFile image, final MultipartFile pdf) {
    genreIds = genreIds.stream().distinct().collect(Collectors.toList());
    authors = authors.stream().distinct().collect(Collectors.toList());
    List<Author> authorList = new ArrayList<>();
    try {
      Book book = bookRepository.save(Book.builder()
          .title(title)
          .description(description)
          .publishedYear(publishedYear)
          .author(new ArrayList<>())
          .priority(Priority.valueOf(priority))
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
  public boolean deleteBookById(final Integer bookId) {
    Book book = bookRepository.getOne(bookId);
    List<Author> authorList = book.getAuthor();
    authorList.forEach(author -> {
      author.getBooks().remove(book);
      authorRepository.save(author);
    });
    genreService.removeBookFromAllGenres(book);
    Publisher publisher = publisherRepository.findByBooksContains(book);
    if (publisher != null) {
      publisher.getBooks().remove(book);
      publisherRepository.save(publisher);
    }
    commentService.deleteAllCommentsByBook(book);
    try {
      bookRepository.delete(book);
      return true;
    } catch (Exception e) {
      e.printStackTrace();
    }
    return false;
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
    final Collection<? extends GrantedAuthority> authorities = SecurityContextHolder.getContext()
                                                                                    .getAuthentication()
                                                                                    .getAuthorities();
    Book book=bookRepository.getOne(bookId);
    if(Util.isValidBookForUser(book,authorities)){
//      return java.util.Base64.getDecoder().decode(new String(book.getPdf()));
      return book.getPdf();
    }
    return null;
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

  @Override
  public List<Book> getBooksByPageNumber(Integer pageNumber, final Collection<? extends GrantedAuthority> authorities) {

    List<Book> allBooks = getAll();
    allBooks.forEach(book -> book.setLabelForHigherLevelOfUser(Util.getLabelForPriority(book)));
    int listSize = allBooks.size();
    return allBooks.subList(calculateStartIndex(pageNumber, listSize),
        calculateEndIndex(pageNumber, listSize));
  }

  @Override
  public Integer getNumberOfPages(final String priority) {
    if(priority!=null && priority.equals("")){
      return calculateNumberOfPages(getAll().size());
    }
    return calculateNumberOfPages(getAllBooksByPriority(Priority.valueOf(priority)).size());
  }

  @Override
  public Book saveBook(Integer id, String title, String description, String publishedYear,
      List<Integer> genreIds, List<Integer> authors, Integer publisherId, MultipartFile image,
      MultipartFile pdf) {
    genreIds = genreIds != null ? genreIds.stream().distinct().collect(Collectors.toList())
        : new ArrayList<>();
    authors = authors != null ? authors.stream().distinct().collect(Collectors.toList())
        : new ArrayList<>();
    List<Author> authorList = new ArrayList<>();
    List<Genre> genreList = new ArrayList<>();
    Book book = getById(id);
    if (book != null) {
      book.setTitle(title != null ? title : book.getTitle());
      book.setDescription(description != null ? description : book.getDescription());
      book.setPublishedYear(publishedYear != null ? publishedYear : book.getPublishedYear());
      byte[] newImage = null;
      if (image != null && image.getSize() > 0) {
        try {
          newImage = image.getBytes();
        } catch (IOException e) {
          e.printStackTrace();
        }
      }
      book.setImage(newImage != null ? newImage : book.getImage());
      byte[] newPdf = null;
      if (pdf != null && pdf.getSize() > 0) {
        try {
          newPdf = pdf.getBytes();
        } catch (IOException e) {
          e.printStackTrace();
        }
      }
      book.setPdf(newPdf != null ? newPdf : book.getPdf());
      authors.forEach(authorId -> authorList.add(authorRepository.getOne(authorId)));
      if (!authorList.isEmpty()) {
        book.getAuthor().stream().filter(author -> author.getBooks().contains(book))
            .forEach(author -> {
              author.getBooks().remove(book);
              authorRepository.save(author);
            });
        book.setAuthor(new ArrayList<>());
      }
      authorList.forEach(author -> {
        book.getAuthor().add(author);
        author.getBooks().add(book);
        authorRepository.save(author);
      });
      genreIds.forEach(genreId -> genreList.add(genreRepository.getOne(genreId)));
      if (!genreList.isEmpty()) {
        genreService.getGenreByBookId(book.getId())
            .forEach(genre -> {
              genre.getBooks().remove(book);
              genreRepository.save(genre);
            });
      }
      genreList.forEach(genre -> {
        genre.getBooks().add(book);
        genreRepository.save(genre);
      });
      Publisher oldPublisher = publisherRepository.findByBooksContains(book);
      if (oldPublisher != null && oldPublisher.getId() != publisherId) {
        Publisher publisher = publisherRepository.getOne(publisherId);
        if (publisher != null) {
          oldPublisher.getBooks().remove(book);
          publisherRepository.save(oldPublisher);
          publisher.getBooks().add(book);
          publisherRepository.save(publisher);
        }
      } else if (oldPublisher == null) {
        Publisher publisher = publisherRepository.getOne(publisherId);
        if (publisher != null) {
          publisher.getBooks().add(book);
          publisherRepository.save(publisher);
        }
      }
      return bookRepository.save(book);
    }
    return null;
  }

  @Override
  public List<Book> getBooksByPriority( final Priority priority, final Collection<? extends GrantedAuthority> authorities) {
    List<Book> allBooks = bookRepository.findAllByPriority(priority);;
    allBooks.forEach(book -> book.setLabelForHigherLevelOfUser(Util.getLabelForPriority(book)));
    return allBooks;
  }

  public List<Book> getAllBooksByPriority(Priority priority){
    return bookRepository.findAllByPriority(priority);
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
