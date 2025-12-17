package com.example.RescueProject.respone;

import com.example.RescueProject.model.EUserRole;
import lombok.Data;

@Data
public class AuthResponse {
    private String jwt ;
    private String message;
    private EUserRole role;
}
