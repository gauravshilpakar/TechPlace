package com.starter.service;

import com.starter.entity.User;
import com.starter.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
public class UserService {

@Autowired
private UserRepository userRepository;
    public Optional<User> findByEmail(String email) {
        log.info("retrieving user by email: {}", email);
        return userRepository.findByEmail(email);
    }
    public Optional<User> findById(Long id) {
        log.info("retrieving user by id: {}", id);
        return userRepository.findById(id);
    }

    public User saveUser(User user){
        log.info("saving user user by id: {}", user);
        return userRepository.save(user);
    }

}
