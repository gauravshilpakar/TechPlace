package com.starter.controller;

import com.starter.entity.User;
import com.starter.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:4200/")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/{id}")
    public User getUserInfo(@PathVariable Long id){
       return userService.findById(id).orElseThrow(()-> new HttpClientErrorException(HttpStatus.NOT_FOUND));
    }
}
