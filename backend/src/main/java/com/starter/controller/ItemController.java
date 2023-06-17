package com.starter.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.starter.entity.Item;
import com.starter.repository.ItemRepository;
import com.starter.service.ItemService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "http://localhost:4200/")
public class ItemController {
    @Autowired
    private ItemRepository itemRepository;
    @Autowired
    private ItemService itemService;

    @GetMapping
    List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    @GetMapping("/{id}")
    Optional<Item> getById(@PathVariable Long id) {
        return itemRepository.findById(id);
    }
    @GetMapping("/user/{id}")
    List<Item> getAllItemsByUserId(@PathVariable Long id) {
        return itemRepository.findByUserId(id);
    }
    @PostMapping("/save")
    Item saveItem(@RequestParam("item") String item, @RequestParam("file") MultipartFile file) throws IOException {
//        item.setImageUrl(file.getBytes());

        ObjectMapper objectMapper = new ObjectMapper();
        Item newItem = objectMapper.readValue(item, Item.class);
        newItem.setImageUrl(file.getBytes());
        log.info("Item received: {}", newItem);
        return itemService.updateItem(newItem);
    }

    @DeleteMapping("/delete/{id}")
    ResponseEntity<?> deleteItem(@PathVariable Long id) {
         itemService.deleteItem(id);
         return ResponseEntity.ok().build();
    }
}
