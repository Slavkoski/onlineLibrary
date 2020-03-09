package com.online.library.onlinelibrary.web;

import com.online.library.onlinelibrary.model.Author;
import com.online.library.onlinelibrary.model.Book;
import com.online.library.onlinelibrary.model.Genre;
import com.online.library.onlinelibrary.service.BookService;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

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
    public List<Author> getAuthorsForBook(@PathVariable Integer bookId){
        return bookService.getAuthorsForBook(bookId);
    }

    @GetMapping(value = "details/{bookId}")
    public Book details(@PathVariable Integer bookId){
        return bookService.getById(bookId);
    }

    @PostMapping(value = "/add")
    public Book addBook(@RequestParam String title,
                        @RequestParam String description,
                        @RequestParam String publishedYear,
                        @RequestParam Integer[] genreId,
                        @RequestParam Integer publisherId,
                        @RequestParam Integer[] authors){
        return bookService.save(title,description,publishedYear,publisherId,Arrays.asList(genreId), Arrays.asList(authors));
    }

    @PostMapping(value = "/delete")
    public void deleteBook(@RequestParam Integer bookId){
        bookService.deleteBookById(bookId);
    }

    @PostMapping(value = "/genre")
    public List<Genre> getGenreForBookId(@RequestParam Integer bookId){
        return bookService.getGenreByBookId(bookId);
    }
}
