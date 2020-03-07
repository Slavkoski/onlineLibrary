package com.online.library.onlinelibrary.service;

import com.online.library.onlinelibrary.model.Publisher;

import java.util.List;

public interface PublisherService {

    List<Publisher> getAll();

    Publisher getById(Integer publisherId);

    Publisher getByBookId(Integer bookId);

    Publisher addPublisher(String name, String description);

    void deleteById(Integer publisherId);
}
