package com.online.library.onlinelibrary.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Publisher {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  private String name;
  @Column(name = "description",length = 4048)
  private String description;
  @Lob
  @Column(name = "image",length = 10000000)
  private byte[] image;
  @OneToMany
  private List<Book> books;
}
