package com.online.library.onlinelibrary.repository;

import com.online.library.onlinelibrary.model.Author;
import com.online.library.onlinelibrary.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book,Integer> {
    public List<Book> findAll();
    public List<Book> findAllByAuthor(Author author);
    public List<Book> findAllByAuthorId(Integer id);
}
