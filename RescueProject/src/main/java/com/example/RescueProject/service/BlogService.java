package com.example.RescueProject.service;

import com.example.RescueProject.model.Blog;
import com.example.RescueProject.request.BlogCreateRequest;
import com.example.RescueProject.request.BlogUpdateRequest;

import java.util.List;

public interface BlogService {
    // Thêm String imageUrl vào hàm create và update
    Blog createBlog(BlogCreateRequest request, String imageUrl);
    Blog updateBlog(Long id, BlogUpdateRequest request, String imageUrl);

    void deleteBlog(Long id);
    Blog getBlogById(Long id);
    List<Blog> getAllBlogs();
    Blog publishBlog(Long id, boolean published);
    List<Blog> getBlogsByCategory(Long categoryId);
    List<Blog> getPublishedBlogs();
    List<Blog> getPublishedBlogsByCategory(Long categoryId);
    Blog getPublishedBlogDetail(Long id);
    List<Blog> searchPublishedBlogs(Long categoryId, String keyword);
}