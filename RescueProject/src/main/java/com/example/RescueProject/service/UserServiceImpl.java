package com.example.RescueProject.service;

import com.example.RescueProject.model.Address;
import com.example.RescueProject.model.User;
import com.example.RescueProject.repository.AddressRepository;
import com.example.RescueProject.repository.UserRepository;
import com.example.RescueProject.request.UserUpdateRequest;
import com.example.RescueProject.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final AddressRepository addressRepository; // 1. THÊM REPO NÀY VÀO

    @Override
    public User getUserByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found with email: " + email);
        }
        return user;
    }
    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    @Transactional // 2. NÊN THÊM ĐỂ ĐẢM BẢO TÍNH TOÀN VẸN DỮ LIỆU
    public User updateMyProfile(String email, UserUpdateRequest request) {
        User user = getUserByEmail(email);
        if (request.getAvatar() != null)
            user.setAvatar(request.getAvatar());
        // 3. KIỂM TRA NULL TRƯỚC KHI SET (Để tránh ghi đè dữ liệu cũ bằng null)
        if (request.getUsername() != null) {
            user.setUsername(request.getUsername());
        }

        if (request.getPhone() != null) {
            user.setPhone(request.getPhone());
        }
        if (request.getCity() != null || request.getAddress() != null) {
            Address addr = user.getAddress();
            if (addr == null) {
                addr = new Address();
            }

            if (request.getCity() != null) {
                addr.setCity(request.getCity());
            }

            if (request.getAddress() != null) {
                addr.setStreet(request.getAddress());
            }


            user.setAddress(addr);
        }

        return userRepository.save(user);
    }
}