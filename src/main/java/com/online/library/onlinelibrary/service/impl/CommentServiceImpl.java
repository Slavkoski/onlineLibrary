package com.online.library.onlinelibrary.service.impl;

import com.online.library.onlinelibrary.model.Book;
import com.online.library.onlinelibrary.model.Comment;
import com.online.library.onlinelibrary.repository.BookRepository;
import com.online.library.onlinelibrary.repository.CommentRepository;
import com.online.library.onlinelibrary.model.ApplicationUser;
import com.online.library.onlinelibrary.repository.ApplicationUserRepository;
import com.online.library.onlinelibrary.service.CommentService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final BookRepository bookRepository;
    private final ApplicationUserRepository applicationUserRepository;

    public CommentServiceImpl(final CommentRepository commentRepository,
                              final BookRepository bookRepository, final ApplicationUserRepository applicationUserRepository) {
        this.commentRepository = commentRepository;
        this.bookRepository = bookRepository;
        this.applicationUserRepository = applicationUserRepository;
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

    @Override
    public Comment addComment(final String description,
                              final Integer bookId) {
        Book book = bookRepository.getOne(bookId);
        final String principal = SecurityContextHolder.getContext()
                                                      .getAuthentication()
                                                      .getPrincipal()
                                                      .toString();
        ApplicationUser user = applicationUserRepository.findByEmail(principal);
        if (user != null) {
            return commentRepository.save(Comment
                    .builder()
                    .comment(description)
                    .user(user)
                    .book(book)
                    .build());
        }
        return null;
    }

    @Override
    public void deleteCommentById(final Integer commentId) {
        commentRepository.deleteById(commentId);
    }

    @Override
    public void deleteAllCommentsByBook(Book book) {
        getAllByBook(book).forEach(commentRepository::delete);
    }
}
