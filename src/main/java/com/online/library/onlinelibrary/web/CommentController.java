package com.online.library.onlinelibrary.web;

import com.online.library.onlinelibrary.model.Comment;
import com.online.library.onlinelibrary.repository.CommentRepository;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/comment", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class CommentController {
    private final CommentRepository commentRepository;

    public CommentController(final CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @GetMapping
    public List<Comment> getAll(){
        return commentRepository.findAll();
    }
}
