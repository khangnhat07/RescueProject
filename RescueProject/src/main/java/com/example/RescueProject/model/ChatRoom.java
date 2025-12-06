package com.example.RescueProject.model;


import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@Entity
public class ChatRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Boolean isPublished;

    @OneToMany(mappedBy = "chatroom")
    private List<Message> messages;
}
