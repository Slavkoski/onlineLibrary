package com.online.library.onlinelibrary.service.impl;

import com.online.library.onlinelibrary.model.Book;
import com.online.library.onlinelibrary.model.Publisher;
import com.online.library.onlinelibrary.model.SearchResultModel;
import com.online.library.onlinelibrary.repository.PublisherRepository;
import com.online.library.onlinelibrary.service.BookService;
import com.online.library.onlinelibrary.service.PublisherService;
import java.io.IOException;
import java.util.stream.Collectors;
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
  public boolean deleteById(final Integer publisherId) {
    try {
      publisherRepository.deleteById(publisherId);
      return true;
    } catch (Exception e) {
      e.printStackTrace();
    }
    return false;
  }

  @Override
  public List<SearchResultModel> searchPublishers(String searchTerm) {
    return publisherRepository.findAllByNameContainsOrDescriptionContains(searchTerm, searchTerm)
        .stream()
        .map(this::createSearchResultModel)
        .collect(Collectors.toList());
  }

  @Override
  public byte[] getImageByPublisherId(Integer publisherId) {
    return getById(publisherId).getImage();
  }

  @Override
  public List<Book> getAllBooksForPublisherId(Integer publisherId) {
    return getById(publisherId).getBooks();
  }

  @Override
  public Publisher save(Integer id, String name, String description, MultipartFile image) {
    Publisher publisher = publisherRepository.getOne(id);
    if (publisher != null) {
      publisher.setName(name != null ? name : publisher.getName());
      publisher.setDescription(description != null ? description : publisher.getDescription());
      byte[] newImage = null;
      if (image != null && image.getSize() > 0) {
        try {
          newImage = image.getBytes();
        } catch (IOException e) {
          e.printStackTrace();
        }
      }
      publisher.setImage(newImage != null ? newImage : publisher.getImage());
      return publisherRepository.save(publisher);
    }
    return null;
  }

  private SearchResultModel createSearchResultModel(Publisher publisher) {
    return SearchResultModel.builder()
        .id(publisher.getId())
        .title(publisher.getName())
        .link("/publisher/" + publisher.getId())
        .description(
            publisher.getDescription().length() > 500 ? publisher.getDescription().substring(0, 496)
                + "..." : publisher.getDescription())
        .build();
  }
}
