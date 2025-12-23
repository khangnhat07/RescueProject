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
    @OneToOne
    @JoinColumn(name = "rescue_detail_id")
    private RescueDetails rescueDetail;

    private Boolean isPublished;

    @OneToMany(mappedBy = "chatroom")
    private List<Message> messages;
}
