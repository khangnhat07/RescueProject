package com.example.RescueProject.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class BlogUpdateRequest {

        private String title;
        private String content;

        // cho phép đổi category khi update
        private Long categoryId;
        private String image;
        // admin có thể set publish khi update
        private Boolean published;
}
