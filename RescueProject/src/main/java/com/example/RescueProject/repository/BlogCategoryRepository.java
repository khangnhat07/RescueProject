package com.example.RescueProject.repository;

import com.example.RescueProject.model.BlogCategory;
import com.example.RescueProject.model.RescueRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogCategoryRepository extends JpaRepository<BlogCategory, Long> {
}
