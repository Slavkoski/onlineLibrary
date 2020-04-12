package com.online.library.onlinelibrary.web;

import com.online.library.onlinelibrary.model.Author;
import com.online.library.onlinelibrary.model.Book;
import com.online.library.onlinelibrary.repository.AuthorRepository;
import com.online.library.onlinelibrary.service.AuthorService;
import java.io.IOException;
import javax.servlet.http.HttpServletResponse;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin({"*", "localhost:3000"})
@RestController
@RequestMapping(path = "/authors", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class AuthorController {
  private final AuthorService authorService;

  public AuthorController(final AuthorService authorService) {
    this.authorService = authorService;
  }

  @GetMapping
  public List<Author> getAll() {
    return authorService.getAll();
  }

  @PostMapping(value = "/add")
  public Author addAuthor(@RequestParam String firstName,
      @RequestParam String lastName,
      @RequestParam String city,
      @RequestParam String country,
      @RequestParam String biography,
      @RequestParam String birthDate,
      @RequestParam MultipartFile image) {
    return authorService.addAuthor(firstName, lastName, city, country, biography, birthDate, image);
  }

  @GetMapping(value = "/books/{authorId}")
  public List<Book> getAllBooksForAuthor(@PathVariable Integer authorId) {
    return authorService.getById(authorId).getBooks();
  }

  @GetMapping(value = "/details/{authorId}")
  public Author getDetails(@PathVariable Integer authorId) {
    return authorService.getById(authorId);
  }

  @PostMapping(value = "/delete")
  public void deleteAuthor(@RequestParam Integer authorId) {
    authorService.deleteById(authorId);
  }

  @GetMapping(value = "/image/{authorId}")
  public void getImage(@PathVariable Integer authorId, HttpServletResponse response)
      throws IOException {
    response.setContentType("image/jpeg, image/jpg, image/png, image/gif");
    response.getOutputStream().write(authorService.getImageByAuthorId(authorId));
    response.getOutputStream().close();
  }

  @PostMapping(value = "/save")
  public Author saveAuthor(
      @RequestParam Integer authorId,
      @RequestParam(required = false) String firstName,
      @RequestParam(required = false) String lastName,
      @RequestParam(required = false) String city,
      @RequestParam(required = false) String country,
      @RequestParam(required = false) String biography,
      @RequestParam(required = false) String birthDate,
      @RequestParam(required = false) MultipartFile image){
    return authorService.saveAuthor(authorId,firstName,lastName,city,country,biography,birthDate,image);
  }
}
