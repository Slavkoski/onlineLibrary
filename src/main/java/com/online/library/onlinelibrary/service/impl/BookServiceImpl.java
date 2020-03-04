package com.online.library.onlinelibrary.service.impl;

import com.online.library.onlinelibrary.model.Author;
import com.online.library.onlinelibrary.model.Book;
import com.online.library.onlinelibrary.repository.AuthorRepository;
import com.online.library.onlinelibrary.repository.BookRepository;
import com.online.library.onlinelibrary.service.BookService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;

    public BookServiceImpl(BookRepository bookRepository, final AuthorRepository authorRepository) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
    }

    @Override
    public Book save(final String title, final String description, final String publishedYear, final List<Integer> authors) {
        List<Author> authorList = new ArrayList<>();
        Book book=bookRepository.save(new Book(title, description, publishedYear));
        authors.forEach(authorId -> authorList.add(authorRepository.getOne(authorId)));
        authorList.forEach(author -> {
            book.getAuthor().add(author);
            author.getBooks().add(book);
            authorRepository.save(author);
        });
        return bookRepository.save(book);
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
}
