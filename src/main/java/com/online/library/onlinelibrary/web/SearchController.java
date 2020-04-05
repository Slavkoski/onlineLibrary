package com.online.library.onlinelibrary.web;

import com.online.library.onlinelibrary.model.SearchResultModel;
import com.online.library.onlinelibrary.service.SearchService;
import java.util.List;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin({"*", "localhost:3000"})
@RestController
@RequestMapping(path = "/search", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class SearchController {
  private final SearchService searchService;

  public SearchController(SearchService searchService) {this.searchService = searchService;}

  @GetMapping(value = "/{searchTerm}")
  public List<SearchResultModel> search(@PathVariable String searchTerm){
    return searchService.search(searchTerm);
  }

}
