package com.example.RescueProject.service;

import com.example.RescueProject.model.EUserRole;
import com.example.RescueProject.model.User;
import com.example.RescueProject.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminUserServiceImpl implements AdminUserService {

    private final UserRepository userRepository;

    public AdminUserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> getAllRescuers() {
        return userRepository.findByRole(EUserRole.ROLE_RESCUETEAM);
    }

    @Override
    public User getRescuerById(Long id) {
        return userRepository.findById(id)
                .filter(u -> u.getRole() == EUserRole.ROLE_RESCUETEAM)
                .orElseThrow(() -> new RuntimeException("Rescuer not found"));
    }
    @Override
    public List<User> getAllVictims() {
        return userRepository.findByRole(EUserRole.ROLE_VICTIM);
    }
    @Override
    public User getVictimById(Long id) {
        return userRepository.findById(id)
                .filter(u -> u.getRole() == EUserRole.ROLE_VICTIM)
                .orElseThrow(() -> new RuntimeException("Victim not found"));
    }

    @Override
    public void softDeleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setActive(false);
        userRepository.save(user);
    }
    @Override
    public User updateUser(Long id, User updatedUser) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setUsername(updatedUser.getUsername());
        user.setPhone(updatedUser.getPhone());
        user.setAddress(updatedUser.getAddress());
        user.setActive(updatedUser.isActive());

        return userRepository.save(user);
    }

}
