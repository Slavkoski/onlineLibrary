package com.online.library.onlinelibrary.service.impl;

import com.online.library.onlinelibrary.model.Author;
import com.online.library.onlinelibrary.model.Book;
import com.online.library.onlinelibrary.model.Genre;
import com.online.library.onlinelibrary.model.Publisher;
import com.online.library.onlinelibrary.repository.AuthorRepository;
import com.online.library.onlinelibrary.repository.BookRepository;
import com.online.library.onlinelibrary.repository.GenreRepository;
import com.online.library.onlinelibrary.repository.PublisherRepository;
import com.online.library.onlinelibrary.service.BookService;
import com.online.library.onlinelibrary.service.GenreService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;
    private final GenreRepository genreRepository;
    private final GenreService genreService;
    private final PublisherRepository publisherRepository;

    public BookServiceImpl(BookRepository bookRepository, final AuthorRepository authorRepository, final GenreRepository genreRepository, final GenreService genreService, final PublisherRepository publisherRepository) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
        this.genreRepository = genreRepository;
        this.genreService = genreService;
        this.publisherRepository = publisherRepository;
    }

    @Override
    public Book save(final String title, final String description, final String publishedYear, final Integer publishedId, final List<Integer> genreIds, final List<Integer> authors) {
        List<Author> authorList = new ArrayList<>();
        Book book = bookRepository.save(new Book(title, description, publishedYear));
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
        Publisher publisher=publisherRepository.getOne(publishedId);
        publisher.getBooks().add(book);
        publisherRepository.save(publisher);
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
}
