package com.example.RescueProject.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class BlogCreateRequest {
        private String title;
        private String content;
        private Long categoryId;
        private boolean published;
        private String image;
}
