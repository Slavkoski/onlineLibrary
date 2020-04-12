package com.online.library.onlinelibrary.web;

import com.online.library.onlinelibrary.model.Book;
import com.online.library.onlinelibrary.model.Publisher;
import com.online.library.onlinelibrary.service.PublisherService;
import java.io.IOException;
import javax.servlet.http.HttpServletResponse;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin({"*", "localhost:3000"})
@RestController
@RequestMapping(path = "/publisher", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class PublisherController {
  private final PublisherService publisherService;

  public PublisherController(final PublisherService publisherService) {
    this.publisherService = publisherService;
  }

  @GetMapping
  public List<Publisher> getAll() {
    return publisherService.getAll();
  }

  @GetMapping("/{publisherId}")
  public Publisher getDetailsByPublisherId(@PathVariable Integer publisherId) {
    return publisherService.getById(publisherId);
  }

  @GetMapping("/book/{bookId}")
  public Publisher getByBookId(@PathVariable Integer bookId) {
    return publisherService.getByBookId(bookId);
  }

  @GetMapping("/books/{publisherId}")
  public List<Book> getAllBooksForPublisherId(@PathVariable Integer publisherId) {
    return publisherService.getAllBooksForPublisherId(publisherId);
  }

  @PostMapping("/add")
  public Publisher add(@RequestParam String name,
      @RequestParam String description,
      @RequestParam MultipartFile image) throws IOException {
    return publisherService.addPublisher(name, description, image);
  }

  @PostMapping("/save")
  public Publisher save(@RequestParam Integer id,
      @RequestParam(required = false) String name,
      @RequestParam(required = false) String description,
      @RequestParam(required = false) MultipartFile image) throws IOException {
    return publisherService.save(id,name, description, image);
  }

  @PostMapping("/delete")
  public boolean delete(@RequestParam Integer publisherId) {
    return publisherService.deleteById(publisherId);
  }

  @GetMapping("/image/{publisherId}")
  public void getImage(@PathVariable Integer publisherId, HttpServletResponse response)
      throws IOException {
    response.setContentType("image/jpeg, image/jpg, image/png, image/gif");
    response.getOutputStream().write(publisherService.getImageByPublisherId(publisherId));
    response.getOutputStream().close();
  }
}
