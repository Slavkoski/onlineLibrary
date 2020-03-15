package com.online.library.onlinelibrary.service;

import com.online.library.onlinelibrary.model.Publisher;

import java.io.IOException;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface PublisherService {

  List<Publisher> getAll();

  Publisher getById(Integer publisherId);

  Publisher getByBookId(Integer bookId);

  Publisher addPublisher(String name, String description, MultipartFile image) throws IOException;

  void deleteById(Integer publisherId);
}
