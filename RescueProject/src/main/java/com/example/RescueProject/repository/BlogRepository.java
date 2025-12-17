package com.example.RescueProject.repository;

import com.example.RescueProject.model.Blog;
import com.example.RescueProject.model.RescueRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {
    List<Blog> findByCategoryId(Long categoryId);
    List<Blog> findByPublishedTrueOrderByTimeDesc();

    List<Blog> findByCategoryIdAndPublishedTrue(Long categoryId);

    Blog findByIdAndPublishedTrue(Long id);
}
