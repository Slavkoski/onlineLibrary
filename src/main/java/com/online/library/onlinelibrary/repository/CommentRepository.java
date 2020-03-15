package com.online.library.onlinelibrary.repository;

import com.online.library.onlinelibrary.model.Book;
import com.online.library.onlinelibrary.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
  List<Comment> findAllByBook(Book book);
}
