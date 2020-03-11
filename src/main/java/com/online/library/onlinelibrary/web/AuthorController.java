package com.online.library.onlinelibrary.web;

import com.online.library.onlinelibrary.model.Author;
import com.online.library.onlinelibrary.model.Book;
import com.online.library.onlinelibrary.repository.AuthorRepository;
import com.online.library.onlinelibrary.service.AuthorService;
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
                            @RequestParam String birthDate) {
        return authorService.addAuthor(firstName,lastName,city,country,biography,birthDate);
    }

    @GetMapping(value = "/books/{authorId}")
    public List<Book> getAllBooksForAuthor(@PathVariable Integer authorId){
        return authorService.getById(authorId).getBooks();
    }

    @GetMapping(value = "/details/{authorId}")
    public Author getDetails(@PathVariable Integer authorId){
        return authorService.getById(authorId);
    }

    @PostMapping(value = "/delete")
    public void deleteAuthor(@RequestParam Integer authorId){
        authorService.deleteById(authorId);
    }

}
