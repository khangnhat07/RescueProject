package com.example.RescueProject.config;

import lombok.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JwtConstant {
    public static final String SECRET_KEY = "bskkshdksueawssdlsndklsndssdbcbzxcvbnmqeewrtyuiopjsbcguwowoqqnxmanaiqhwooecn";
    public static final String JWT_HEADER = "Authorization";
}