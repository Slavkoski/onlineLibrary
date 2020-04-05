package com.online.library.onlinelibrary.repository;

import com.online.library.onlinelibrary.model.Book;
import com.online.library.onlinelibrary.model.Publisher;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PublisherRepository extends JpaRepository<Publisher, Integer> {
  Publisher findByBooksContains(Book book);

  List<Publisher> findAllByNameContainsOrDescriptionContains(String name, String description);
}
