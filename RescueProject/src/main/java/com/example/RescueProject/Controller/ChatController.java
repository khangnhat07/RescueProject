package com.example.RescueProject.Controller;

import com.example.RescueProject.model.ChatMessage;
import com.example.RescueProject.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;

@Controller
public class ChatController {

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    /**
     * Xử lý gửi tin nhắn Real-time
     * Client gửi tới: /app/chat/{roomId}
     * Server bắn về: /topic/room/{roomId}
     */
    @MessageMapping("/chat/{roomId}")
    @SendTo("/topic/room/{roomId}")
    public ChatMessage sendMessage(@DestinationVariable String roomId, @Payload ChatMessage chatMessage) {
        // 1. Gán thông tin bắt buộc
        chatMessage.setRoomId(roomId);
        chatMessage.setTimestamp(LocalDateTime.now());

        // 2. Lưu vào Database (để lát nữa API getHistory có cái mà lấy)
        return chatMessageRepository.save(chatMessage);
    }
}