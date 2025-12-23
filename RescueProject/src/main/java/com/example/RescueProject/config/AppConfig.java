package com.example.RescueProject.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class AppConfig implements WebMvcConfigurer {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // 1. Tắt CSRF vì chúng ta dùng API (JWT/Stateless)
                .csrf(csrf -> csrf.disable())

                // 2. Kích hoạt CORS với cấu hình bên dưới
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // 3. Phân quyền
                .authorizeHttpRequests(auth -> auth
                        // Cho phép các yêu cầu OPTIONS (Pre-flight request) đi qua hết
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers("/auth/**").permitAll()
                        .requestMatchers("/blogs/**").permitAll()

                        // Tạm thời cho phép tất cả admin blogs (để test)
                        .requestMatchers("/admin/blogs/**").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/admin/blogs/**").permitAll()
                        .anyRequest().authenticated()
                );

        return http.build();
    }

    // Cấu hình CORS chi tiết
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        // Cho phép origin của React
        config.setAllowedOrigins(List.of("http://localhost:5173"));

        // Cho phép các phương thức phổ biến
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));

        // QUAN TRỌNG: Cho phép các Header này để không bị 403 khi gửi FormData
        config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Cache-Control"));

        config.setAllowCredentials(true);
        config.setExposedHeaders(List.of("Authorization"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}