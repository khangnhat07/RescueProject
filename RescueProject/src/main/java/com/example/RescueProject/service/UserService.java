package com.example.RescueProject.service;

import com.example.RescueProject.model.User;
import com.example.RescueProject.request.UserUpdateRequest;

public interface UserService {

    User getUserByEmail(String email);   // USER LOGIN

    User getUserById(Long id);            // ADMIN

    User updateMyProfile(String email, UserUpdateRequest request);
}
