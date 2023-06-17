package com.starter.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
public class GithubUser {
    private Long id;
    private String name;
    private String email;
    private String avatarUrl;
}
