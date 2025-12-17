package com.example.RescueProject.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class UserNotification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "notification_id")
    private Notification notification;

    @Enumerated(EnumType.STRING)
    private ENotification status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
