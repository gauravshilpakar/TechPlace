package com.starter.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user", schema = "public")
public class User {
    @Id
    @Column(name = "_id")
    private Long id;
    private String name;
    private String email;
    private String avatarUrl;
}
