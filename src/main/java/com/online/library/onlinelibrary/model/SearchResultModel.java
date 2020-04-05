package com.online.library.onlinelibrary.model;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class SearchResultModel {
  private final String title;
  private final String link;
  private final Integer id;
  private final String description;
}
