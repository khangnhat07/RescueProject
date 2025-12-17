package com.example.RescueProject.request;

import lombok.Data;

@Data
public class BlogUpdateRequest {

        private String title;
        private String content;

        // cho phép đổi category khi update
        private Long categoryId;

        // admin có thể set publish khi update
        private Boolean published;
}
