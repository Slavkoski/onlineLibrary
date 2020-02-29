package com.online.library.onlinelibrary.service;

import com.online.library.onlinelibrary.model.Book;

import java.util.List;

public interface BookService {
    public Book save(Book book);
    public List<Book> getAll();
}
