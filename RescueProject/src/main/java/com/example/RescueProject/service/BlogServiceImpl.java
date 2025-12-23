package com.example.RescueProject.service;

import com.example.RescueProject.model.Blog;
import com.example.RescueProject.model.BlogCategory;
import com.example.RescueProject.model.RescueRequest;
import com.example.RescueProject.model.User;
import com.example.RescueProject.repository.BlogCategoryRepository;
import com.example.RescueProject.repository.BlogRepository;
import com.example.RescueProject.repository.RescueRequestRepository;
import com.example.RescueProject.request.BlogCreateRequest;
import com.example.RescueProject.request.BlogUpdateRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class BlogServiceImpl implements BlogService {

    private final BlogRepository blogRepository;
    private final BlogCategoryRepository categoryRepository;

    public BlogServiceImpl(BlogRepository blogRepository,
                           BlogCategoryRepository categoryRepository) {
        this.blogRepository = blogRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Blog createBlog(BlogCreateRequest request, String imageUrl) {
        BlogCategory category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Blog blog = new Blog();
        blog.setTitle(request.getTitle());
        blog.setContent(request.getContent());

        // imageUrl lúc này là link từ Cloudinary (ví dụ: https://res.cloudinary.com/...)
        blog.setImage(imageUrl);

        blog.setCategory(category);
        blog.setPublished(false);
        // Lưu ý: Nên dùng LocalDateTime để dễ format ở Frontend thay vì ép String ngay
        blog.setTime(LocalDateTime.now().toString());

        return blogRepository.save(blog);
    }

    @Override
    public Blog updateBlog(Long id, BlogUpdateRequest request, String imageUrl) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog not found"));

        if (request.getTitle() != null) blog.setTitle(request.getTitle());
        if (request.getContent() != null) blog.setContent(request.getContent());

        // LOGIC MỚI: Cập nhật URL ảnh từ Cloudinary
        // Nếu Frontend không gửi ảnh mới, imageUrl sẽ null hoặc giữ link cũ tùy bạn xử lý ở Frontend
        if (imageUrl != null && !imageUrl.isEmpty()) {
            blog.setImage(imageUrl);
        }

        if (request.getCategoryId() != null) {
            BlogCategory category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            blog.setCategory(category);
        }

        if (request.getPublished() != null) {
            blog.setPublished(request.getPublished());
        }

        return blogRepository.save(blog);
    }

    // --- Các phương thức GET, DELETE, PUBLISH bên dưới giữ nguyên ---
    @Override
    public void deleteBlog(Long id) {
        if (!blogRepository.existsById(id)) {
            throw new RuntimeException("Blog not found");
        }
        blogRepository.deleteById(id);
    }

    @Override
    public Blog getBlogById(Long id) {
        return blogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog not found"));
    }

    @Override
    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    @Override
    public Blog publishBlog(Long id, boolean published) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog not found"));
        blog.setPublished(published);
        return blogRepository.save(blog);
    }

    @Override
    public List<Blog> getBlogsByCategory(Long categoryId) {
        return blogRepository.findByCategoryId(categoryId);
    }

    @Override
    public List<Blog> getPublishedBlogs() {
        return blogRepository.findByPublishedTrueOrderByTimeDesc();
    }

    @Override
    public List<Blog> getPublishedBlogsByCategory(Long categoryId) {
        return blogRepository.findByCategoryIdAndPublishedTrue(categoryId);
    }

    @Override
    public Blog getPublishedBlogDetail(Long id) {
        Blog blog = blogRepository.findByIdAndPublishedTrue(id);
        if (blog == null) {
            throw new RuntimeException("Blog not found or unpublished");
        }
        return blog;
    }

    @Override
    public List<Blog> searchPublishedBlogs(Long categoryId, String keyword) {
        return blogRepository.searchPublishedBlogs(categoryId, keyword);
    }
}