package com.online.library.onlinelibrary.repository;

import com.online.library.onlinelibrary.model.Author;
import com.online.library.onlinelibrary.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuthorRepository extends JpaRepository<Author,Integer> {
    public List<Author> findAll();
    public default List<Book> findAllBooks(Author author){
        return author.getBooks();
    }
    public List<Author> findAllByFirstName(String firstName);
}
