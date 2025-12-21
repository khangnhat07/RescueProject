package com.example.RescueProject.Controller.Blog;


import com.example.RescueProject.model.Blog;
import com.example.RescueProject.model.BlogCategory;
import com.example.RescueProject.response.ApiResponse;
import com.example.RescueProject.service.BlogCategoryService;
import com.example.RescueProject.service.BlogService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/blogs")
public class BlogCategoryController {

    private final BlogCategoryService categoryService;

    public BlogCategoryController(BlogCategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/categories")
    public ResponseEntity<ApiResponse<List<BlogCategory>>> getAllCategories() {
        return ResponseEntity.ok(
                new ApiResponse<>(
                        HttpStatus.OK,
                        "Category list",
                        categoryService.getAllCategories(),
                        null
                )
        );
    }

}
