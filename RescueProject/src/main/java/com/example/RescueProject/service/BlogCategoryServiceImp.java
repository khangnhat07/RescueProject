package com.example.RescueProject.service;

import com.example.RescueProject.model.BlogCategory;
import com.example.RescueProject.repository.BlogCategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BlogCategoryServiceImp implements BlogCategoryService {
    private final BlogCategoryRepository categoryRepository;

    public BlogCategoryServiceImp(BlogCategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<BlogCategory> getAllCategories() {
        return categoryRepository.findAll();
    }
}
