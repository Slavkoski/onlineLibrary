package com.online.library.onlinelibrary.web;

import com.online.library.onlinelibrary.model.Comment;
import com.online.library.onlinelibrary.repository.CommentRepository;
import com.online.library.onlinelibrary.service.CommentService;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin({"*", "localhost:3000"})
@RestController
@RequestMapping(path = "/comment", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class CommentController {
  private final CommentService commentService;

  public CommentController(final CommentService commentService) {
    this.commentService = commentService;
  }

  @GetMapping
  public List<Comment> getAll() {
    return commentService.getAll();
  }

  @GetMapping(value = "/book/{bookId}")
  public List<Comment> getCommentsByBookId(@PathVariable("bookId") Integer bookId) {
    return commentService.getAllByBookId(bookId);
  }

  @PostMapping(value = "/add")
  public Comment addComment(@RequestParam String description,
      @RequestParam String commentOwnerName,
      @RequestParam Integer bookId) {
    return commentService.addComment(description, commentOwnerName, bookId);
  }

  @PostMapping(value = "/delete")
  public void deleteComment(@RequestParam Integer commentId) {
    commentService.deleteCommentById(commentId);
  }
}
