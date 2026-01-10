package com.example.RescueProject.request;

import lombok.Data;

@Data
public class UserUpdateRequest {
        private String avatar;
        private String username;   // tên hiển thị
        private String phone;
        private String city;
        private String address;
}

