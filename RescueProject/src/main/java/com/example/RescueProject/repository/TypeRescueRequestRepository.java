package com.example.RescueProject.repository;

import com.example.RescueProject.model.TypeRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeRescueRequestRepository extends JpaRepository<TypeRequest, Long> {
}
