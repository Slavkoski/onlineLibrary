package com.online.library.onlinelibrary.service;

import com.online.library.onlinelibrary.model.Book;
import com.online.library.onlinelibrary.model.Comment;

import java.util.List;

public interface CommentService {
    List<Comment> getAll();
    List<Comment> getAllByBook(Book book);
    List<Comment> getAllByBookId(int bookId);
}
