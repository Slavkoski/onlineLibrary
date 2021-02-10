package com.online.library.onlinelibrary.web;

import com.online.library.onlinelibrary.model.Priority;
import com.online.library.onlinelibrary.util.Util;
import com.online.library.onlinelibrary.model.Author;
import com.online.library.onlinelibrary.model.Book;
import com.online.library.onlinelibrary.model.Genre;
import com.online.library.onlinelibrary.service.BookService;
import java.io.IOException;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@CrossOrigin({"*", "localhost:3000"})
@RestController
@RequestMapping(path = "/books", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class BookController {

  private final BookService bookService;

  public BookController(BookService bookService) {
    this.bookService = bookService;
  }

  @GetMapping
  public List<Book> getAll() {
    return bookService.getAll();
  }


  @GetMapping(value = "/authors/{bookId}")
  public List<Author> getAuthorsForBook(@PathVariable Integer bookId) {
    return bookService.getAuthorsForBook(bookId);
  }

  @GetMapping(value = "/details/{bookId}")
  public Book details(@PathVariable Integer bookId) {
    return bookService.getById(bookId);
  }

  @GetMapping(value = "/page/{pageNumber}")
  public List<Book> getBooksForPage(@PathVariable Integer pageNumber){
    return bookService.getBooksByPageNumber(pageNumber,SecurityContextHolder.getContext().getAuthentication().getAuthorities());
  }

  @GetMapping(value = "/{priority}")
  public List<Book> getAllByPriority(
          @PathVariable String priority) {
    return bookService.getBooksByPriority(Priority.valueOf(priority),SecurityContextHolder.getContext().getAuthentication().getAuthorities());
  }

  @GetMapping(value = "/numberOfPages")
  public Integer getNumberOfPages(){
    return bookService.getNumberOfPages("");
  }

  @PostMapping(value = "/add")
  public Book addBook(@RequestParam String title,
      @RequestParam String description,
      @RequestParam String publishedYear,
      @RequestParam Integer[] genres,
      @RequestParam Integer publisherId,
      @RequestParam Integer[] authors,
      @RequestParam String priority,
      @RequestParam MultipartFile image,
      @RequestParam MultipartFile pdf
  ) {
    return bookService.save(title, description, publishedYear, publisherId, Arrays.asList(genres),
        Arrays.asList(authors), priority, image, pdf);
  }

  @PostMapping(value = "/delete")
  public boolean deleteBook(@RequestParam Integer bookId) {
    return bookService.deleteBookById(bookId);
  }

  @PostMapping(value = "/genre")
  public List<Genre> getGenreForBookId(@RequestParam Integer bookId) {
    return bookService.getGenreByBookId(bookId);
  }

  @PostMapping(value = "/save")
  public Book saveBook(
      @RequestParam Integer id,
      @RequestParam(required = false) String title,
      @RequestParam(required = false) String description,
      @RequestParam(required = false) String publishedYear,
      @RequestParam(required = false) Integer[] genres,
      @RequestParam(required = false) Integer publisherId,
      @RequestParam(required = false) Integer[] authors,
      @RequestParam(required = false) MultipartFile image,
      @RequestParam(required = false) MultipartFile pdf){
    return bookService.saveBook(id,title,description,publishedYear, Arrays.asList(genres),
        Arrays.asList(authors),publisherId,image,pdf);
  }

  @GetMapping(value = "/image/{bookId}")
  public void getImage(@PathVariable Integer bookId, HttpServletResponse response)
      throws IOException {
    response.setContentType("image/jpeg, image/jpg, image/png, image/gif");
    response.getOutputStream().write(bookService.getImageByBookId(bookId));
    response.getOutputStream().close();
  }

  @GetMapping(value = "/pdf/{bookId}")
  public void getPdf(@PathVariable Integer bookId, HttpServletResponse response)
      throws IOException {
    byte [] pdf=bookService.getPdfByBookId(bookId);
    if(pdf!=null){
        response.setContentType("application/pdf");
        response.getOutputStream().write(bookService.getPdfByBookId(bookId));
        response.getOutputStream().close();
    }else{
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
    }
  }
}
