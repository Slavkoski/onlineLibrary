package com.online.library.onlinelibrary.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Book {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  private String title;

  @ManyToMany(mappedBy = "books")
  private List<Author> author;
  @Lob
  @Column(name = "description",length = 4048)
  private String description;
  private String publishedYear;
  @Lob
  @Column(name = "pdf",length = 100000000)
  private byte[] pdf;
  @Lob
  @Column(name = "image",length = 10000000)
  private byte[] image;
}
