package com.example.RescueProject.Controller.Admin;

import com.example.RescueProject.model.Blog;
import com.example.RescueProject.request.BlogCreateRequest;
import com.example.RescueProject.request.BlogUpdateRequest;
import com.example.RescueProject.response.ApiResponse;
import com.example.RescueProject.service.BlogService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/blogs")
public class AdminBlogController {

    private final BlogService blogService;

    public AdminBlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    // CREATE BLOG
    // Thay đổi: Bỏ consumes multipart, dùng @RequestBody để nhận JSON
    @PostMapping
    public ResponseEntity<ApiResponse<Blog>> createBlog(@RequestBody BlogCreateRequest request) {
        // request.getImage() bây giờ đã là URL (String) từ Cloudinary gửi về
        Blog created = blogService.createBlog(request, request.getImage());

        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK, "Thành công", created, null));
    }

    // UPDATE BLOG
    // Thay đổi: Bỏ consumes multipart, dùng @RequestBody
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Blog>> updateBlog(
            @PathVariable Long id,
            @RequestBody BlogUpdateRequest request) {

        // request.getImage() là URL ảnh mới (hoặc ảnh cũ) dạng String
        Blog updated = blogService.updateBlog(id, request, request.getImage());

        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK, "Cập nhật thành công", updated, null));
    }

    // XÓA HÀM saveFile (Vì không còn lưu file ở Backend nữa)

    // DELETE BLOG
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteBlog(@PathVariable Long id) {
        blogService.deleteBlog(id);
        return ResponseEntity.ok(
                new ApiResponse<>(HttpStatus.OK, "Blog deleted", null, null)
        );
    }

    // GET BLOG DETAIL
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Blog>> getBlogDetail(@PathVariable Long id) {
        Blog blog = blogService.getBlogById(id);
        return ResponseEntity.ok(
                new ApiResponse<>(HttpStatus.OK, "Blog detail", blog, null)
        );
    }

    // GET ALL BLOGS
    @GetMapping
    public ResponseEntity<ApiResponse<List<Blog>>> getAllBlogs() {
        List<Blog> blogs = blogService.getAllBlogs();
        return ResponseEntity.ok(
                new ApiResponse<>(HttpStatus.OK, "List of blogs", blogs, null)
        );
    }

    // PUBLISH / UNPUBLISH
    @PostMapping("/{id}/publish")
    public ResponseEntity<ApiResponse<Blog>> publishBlog(
            @PathVariable Long id,
            @RequestParam boolean published
    ) {
        Blog blog = blogService.publishBlog(id, published);
        return ResponseEntity.ok(
                new ApiResponse<>(HttpStatus.OK, "Blog publish updated", blog, null)
        );
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<ApiResponse<List<Blog>>> getBlogsByCategory(@PathVariable Long id) {
        List<Blog> blogs = blogService.getBlogsByCategory(id);
        return ResponseEntity.ok(
                new ApiResponse<>(HttpStatus.OK, "List of blogs by category", blogs, null)
        );
    }
}