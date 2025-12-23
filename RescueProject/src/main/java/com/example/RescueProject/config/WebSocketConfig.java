package com.example.RescueProject.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // ĐÂY LÀ CHỖ QUAN TRỌNG GÂY LỖI 403
        registry.addEndpoint("/ws")
                // Cách 1: Cho phép cụ thể frontend của bạn (Khuyên dùng)
                .setAllowedOrigins("http://localhost:5173", "http://localhost:3000")

                // Hoặc Cách 2: Cho phép tất cả (Dễ tính hơn nhưng kém bảo mật hơn chút)
                // .setAllowedOriginPatterns("*")

                .withSockJS(); // Kích hoạt SockJS fallback
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // Cấu hình prefix (không ảnh hưởng lỗi 403, giữ nguyên code cũ của bạn)
        registry.setApplicationDestinationPrefixes("/app");
        registry.enableSimpleBroker("/topic", "/queue", "/user");
        registry.setUserDestinationPrefix("/user");
    }
}