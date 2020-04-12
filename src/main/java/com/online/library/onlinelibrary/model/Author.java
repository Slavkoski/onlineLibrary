package com.online.library.onlinelibrary.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Author {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  private String firstName;
  private String lastName;
  @Lob
  @Column(name = "biography",length = 4048)
  private String biography;
  private Date birthDate;
  private String city;
  private String country;
  @Lob
  @Column(name = "image",length = 10000000)
  private byte[] image;
  @JsonIgnore
  @ManyToMany
  private List<Book> books;
}
