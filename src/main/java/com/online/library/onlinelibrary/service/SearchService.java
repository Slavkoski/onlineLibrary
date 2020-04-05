package com.online.library.onlinelibrary.service;

import com.online.library.onlinelibrary.model.SearchResultModel;
import java.util.List;

public interface SearchService {

  List<SearchResultModel> search(String searchTerm);
}
