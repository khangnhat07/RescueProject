package com.example.RescueProject.Controller;

import com.example.RescueProject.model.ChatMessage;
import com.example.RescueProject.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // Dùng RestController để trả về JSON
@RequestMapping("/api/chat")
public class ChatHistoryController {

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    /**
     * API lấy lịch sử chat
     * URL gọi: GET http://localhost:8080/api/chat/history/{roomId}
     */
    @GetMapping("/history/{roomId}")
    public ResponseEntity<List<ChatMessage>> getChatHistory(@PathVariable String roomId) {
        // Gọi hàm tìm kiếm mà bạn đã viết trong Repository
        List<ChatMessage> history = chatMessageRepository.findByRoomId(roomId);

        return ResponseEntity.ok(history);
    }
}