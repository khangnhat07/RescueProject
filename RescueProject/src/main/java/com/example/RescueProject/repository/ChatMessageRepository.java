package com.example.RescueProject.repository;

import com.example.RescueProject.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    // 1. Tìm lịch sử chat của một phòng (Ca cứu hộ)
    // Sắp xếp: Tin nhắn cũ nhất lên đầu (ASC), mới nhất ở cuối
    List<ChatMessage> findByRoomIdOrderByTimestampAsc(String roomId);

    // 2. (Tùy chọn) Nếu bạn vẫn muốn dùng recipientEmail (chat riêng tư)
    // Tìm tin nhắn giữa 2 người cụ thể
    List<ChatMessage> findByRoomId(String roomId);
}