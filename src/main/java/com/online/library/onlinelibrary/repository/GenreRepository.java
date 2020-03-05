package com.online.library.onlinelibrary.repository;

import com.online.library.onlinelibrary.model.Book;
import com.online.library.onlinelibrary.model.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GenreRepository extends JpaRepository<Genre,Integer> {
    Genre getByName(String name);
    List<Genre> findByBooksContains(Book book);
}
