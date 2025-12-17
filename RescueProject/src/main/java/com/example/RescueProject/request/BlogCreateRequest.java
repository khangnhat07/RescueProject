package com.example.RescueProject.request;

import lombok.Data;
@Data
public class BlogCreateRequest {
        private String title;
        private String content;
        private Long categoryId;
        private boolean published;
}
