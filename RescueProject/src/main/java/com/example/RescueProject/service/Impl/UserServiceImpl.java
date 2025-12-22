package com.example.RescueProject.service.Impl;

import com.example.RescueProject.model.User;
import com.example.RescueProject.repository.UserRepository;
import com.example.RescueProject.service.UserService;

public class UserServiceImpl implements UserService {
    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
