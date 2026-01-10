package com.example.RescueProject.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "chatroom_id")
    private ChatRoom chatroom;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private User sender;

    private String content;
    private String timeSent;

}
