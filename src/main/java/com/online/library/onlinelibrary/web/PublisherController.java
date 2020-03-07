package com.online.library.onlinelibrary.web;

import com.online.library.onlinelibrary.model.Publisher;
import com.online.library.onlinelibrary.service.PublisherService;
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
@RequestMapping(path = "/publisher", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class PublisherController {
    private final PublisherService publisherService;

    public PublisherController(final PublisherService publisherService) {
        this.publisherService = publisherService;
    }

    @GetMapping
    public List<Publisher> getAll(){
        return publisherService.getAll();
    }

    @GetMapping("/{publisherId}")
    public Publisher getDetailsByPublisherId(@PathVariable Integer publisherId){
        return publisherService.getById(publisherId);
    }

    @GetMapping("/book/{bookId}")
    public Publisher getByBookId(@PathVariable Integer bookId){
        return publisherService.getByBookId(bookId);
    }

    @PostMapping("/add")
    public Publisher add(@RequestParam String name,
                         @RequestParam String description){
        return publisherService.addPublisher(name,description);
    }

    @PostMapping("/delete")
    public void delete(@RequestParam Integer publisherId){
        publisherService.deleteById(publisherId);
    }
}
