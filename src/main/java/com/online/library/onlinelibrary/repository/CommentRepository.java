package com.online.library.onlinelibrary.repository;

import com.online.library.onlinelibrary.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment,Integer> {
}
