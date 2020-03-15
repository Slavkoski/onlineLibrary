package com.online.library.onlinelibrary.service.impl;

import com.online.library.onlinelibrary.model.Publisher;
import com.online.library.onlinelibrary.repository.PublisherRepository;
import com.online.library.onlinelibrary.service.BookService;
import com.online.library.onlinelibrary.service.PublisherService;
import java.io.IOException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

@Service
public class PublisherServiceImpl implements PublisherService {
  private final PublisherRepository publisherRepository;
  private final BookService bookService;

  public PublisherServiceImpl(final PublisherRepository publisherRepository,
      final BookService bookService) {
    this.publisherRepository = publisherRepository;
    this.bookService = bookService;
  }

  @Override
  public List<Publisher> getAll() {
    return publisherRepository.findAll();
  }

  @Override
  public Publisher getById(final Integer publisherId) {
    return publisherRepository.getOne(publisherId);
  }

  @Override
  public Publisher getByBookId(final Integer bookId) {
    return publisherRepository.findByBooksContains(bookService.getById(bookId));
  }

  @Override
  public Publisher addPublisher(final String name, final String description,
      final MultipartFile image)
      throws IOException {
    return publisherRepository.save(Publisher
        .builder()
        .name(name)
        .description(description)
        .image(image.getBytes())
        .books(new ArrayList<>())
        .build()
    );
  }

  @Override
  public void deleteById(final Integer publisherId) {
    publisherRepository.deleteById(publisherId);
  }
}
