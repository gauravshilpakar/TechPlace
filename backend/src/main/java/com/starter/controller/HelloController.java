package com.starter.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/hello")
@CrossOrigin(origins = {"${app.cors.origins}"})
public class HelloController {
    @GetMapping
    String hello(){
        return "Hello from TechPlace!";
    }
}
