package com.example.RescueProject.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@Entity
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String content;
    private Date sentAt;

    @OneToMany(mappedBy = "notification")
    private List<UserNotification> userNotifications;
}
