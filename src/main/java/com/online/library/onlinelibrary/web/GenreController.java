package com.online.library.onlinelibrary.web;

import com.online.library.onlinelibrary.model.Book;
import com.online.library.onlinelibrary.model.Genre;
import com.online.library.onlinelibrary.service.GenreService;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin({"*", "localhost:3000"})
@RestController
@RequestMapping(path = "/genre", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class GenreController {
  private final GenreService genreService;

  public GenreController(final GenreService genreService) {
    this.genreService = genreService;
  }

  @GetMapping
  public List<Genre> getAll() {
    return genreService.getAll();
  }

  @GetMapping(value = "/books/{genreId}")
  public List<Book> getAllBooksByGenreId(@PathVariable("genreId") Integer genreId) {
    return genreService.getAllBooksByGenreId(genreId);
  }

  @GetMapping(value = "/book/{bookId}")
  public List<Genre> getGenreByBookId(@PathVariable Integer bookId){
    return genreService.getGenreByBookId(bookId);
  }

  @GetMapping(value = "/books/{genreId}/{pageNumber}")
  public List<Book> getAllBooksByGenreIdAndPageNumber(@PathVariable Integer genreId,
                                                      @PathVariable Integer pageNumber) {
    return genreService.getAllBooksByGenreIdAndPageNumber(genreId,pageNumber);
  }

  @GetMapping(value = "/books/numberOfPages/{genreId}")
  public Integer getNumberOfPagesByGenreId(@PathVariable Integer genreId){
    return genreService.getNumberOfPagesByGenreId(genreId);
  }

  @GetMapping(value = "/{genreId}/{pageNumber}")
  public Genre getGenre(@PathVariable("genreId") Integer genreId,
                        @PathVariable Integer pageNumber) {
    return genreService.getGenreByIdAndPageNumber(genreId,pageNumber);
  }

  @PostMapping(value = "/add")
  public Genre addGenre(@RequestParam String name) {
    return genreService.addGenre(name);
  }

  @PostMapping(value = "/delete")
  public void deleteGenre(@RequestParam Integer genreId) {
    genreService.deleteGenre(genreId);
  }
}
