package com.online.library.onlinelibrary.service;

import com.online.library.onlinelibrary.model.Book;
import com.online.library.onlinelibrary.model.Publisher;

import com.online.library.onlinelibrary.model.SearchResultModel;
import java.io.IOException;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface PublisherService {

  List<Publisher> getAll();

  Publisher getById(Integer publisherId);

  Publisher getByBookId(Integer bookId);

  Publisher addPublisher(String name, String description, MultipartFile image) throws IOException;

  void deleteById(Integer publisherId);

  List<SearchResultModel> searchPublishers(String searchTerm);

  byte[] getImageByPublisherId(Integer publisherId);

  List<Book> getAllBooksForPublisherId(Integer publisherId);

  Publisher save(Integer id, String name, String description, MultipartFile image);
}
