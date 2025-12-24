package com.example.RescueProject.model;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // QUAN TRỌNG: Mã phòng chat (Thường là ID của ca cứu hộ: "req_123")
    // Thay vì gửi cho recipientEmail cụ thể, ta gửi vào "phòng" này.
    private String roomId;

    private String senderEmail; // Email người gửi
    private String content;     // Nội dung
    private LocalDateTime timestamp;

    @Enumerated(EnumType.STRING)
    private EUserRole senderRole;
}