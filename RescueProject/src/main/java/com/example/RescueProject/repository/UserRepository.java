package com.example.RescueProject.repository;

import com.example.RescueProject.model.EUserRole;
import com.example.RescueProject.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByRole(EUserRole role);
}
