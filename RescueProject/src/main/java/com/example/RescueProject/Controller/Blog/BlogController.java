package com.example.RescueProject.Controller.Blog;


import com.example.RescueProject.model.Blog;
import com.example.RescueProject.response.ApiResponse;
import com.example.RescueProject.service.BlogService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/blogs")
public class BlogController {
    private final BlogService blogService;

    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    // 🔓 GET ALL PUBLISHED BLOGS
    @GetMapping
    public ResponseEntity<ApiResponse<List<Blog>>> getPublishedBlogs() {
        return ResponseEntity.ok(
                new ApiResponse<>(
                        HttpStatus.OK,
                        "Published blogs",
                        blogService.getPublishedBlogs(),
                        null
                )
        );
    }

    // 🔓 GET BLOG DETAIL
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Blog>> getBlogDetail(@PathVariable Long id) {
        return ResponseEntity.ok(
                new ApiResponse<>(
                        HttpStatus.OK,
                        "Blog detail",
                        blogService.getPublishedBlogDetail(id),
                        null
                )
        );
    }

    // 🔓 GET BLOG BY CATEGORY
    @GetMapping("/category/{id}")
    public ResponseEntity<ApiResponse<List<Blog>>> getBlogsByCategory(@PathVariable Long id) {
        return ResponseEntity.ok(
                new ApiResponse<>(
                        HttpStatus.OK,
                        "Blogs by category",
                        blogService.getPublishedBlogsByCategory(id),
                        null
                )
        );
    }

}
