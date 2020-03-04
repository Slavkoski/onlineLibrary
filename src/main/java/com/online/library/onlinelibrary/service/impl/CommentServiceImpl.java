package com.online.library.onlinelibrary.service.impl;

import com.online.library.onlinelibrary.model.Book;
import com.online.library.onlinelibrary.model.Comment;
import com.online.library.onlinelibrary.repository.BookRepository;
import com.online.library.onlinelibrary.repository.CommentRepository;
import com.online.library.onlinelibrary.service.CommentService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final BookRepository bookRepository;

    public CommentServiceImpl(final CommentRepository commentRepository, final BookRepository bookRepository) {
        this.commentRepository = commentRepository;
        this.bookRepository = bookRepository;
    }

    @Override
    public List<Comment> getAll() {
        return commentRepository.findAll();
    }

    @Override
    public List<Comment> getAllByBook(final Book book) {
        return commentRepository.findAllByBook(book);
    }

    @Override
    public List<Comment> getAllByBookId(final int bookId) {
        return commentRepository.findAllByBook(bookRepository.getOne(bookId));
    }
}
