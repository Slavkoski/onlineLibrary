package com.online.library.onlinelibrary.service.impl;

import com.online.library.onlinelibrary.model.SearchResultModel;
import com.online.library.onlinelibrary.service.AuthorService;
import com.online.library.onlinelibrary.service.BookService;
import com.online.library.onlinelibrary.service.GenreService;
import com.online.library.onlinelibrary.service.PublisherService;
import com.online.library.onlinelibrary.service.SearchService;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.springframework.stereotype.Service;

@Service
public class SearchServiceImpl implements SearchService {
  private final AuthorService authorService;
  private final PublisherService publisherService;
  private final BookService bookService;
  private final GenreService genreService;

  public SearchServiceImpl(AuthorService authorService,
      PublisherService publisherService,
      BookService bookService, GenreService genreService) {
    this.authorService = authorService;
    this.publisherService = publisherService;
    this.bookService = bookService;
    this.genreService = genreService;
  }

  @Override
  public List<SearchResultModel> search(String searchTerm) {
    return Stream.of(bookService.searchBooks(searchTerm),
        authorService.searchAuthors(searchTerm),
        genreService.searchGenres(searchTerm),
        publisherService.searchPublishers(searchTerm))
        .flatMap(Collection::stream)
        .collect(Collectors.toList());
  }
}
