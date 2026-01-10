package com.example.RescueProject.service;

import com.example.RescueProject.model.RescueRequest;
import com.example.RescueProject.model.User;

import java.util.List;

public interface AdminUserService {
    List<User> getAllRescuers();
    User getRescuerById(Long id);
    List<User> getAllVictims();
    User getVictimById(Long id);
    void softDeleteUser(Long id);
    User updateUser(Long id, User updatedUser);
}