package com.example.RescueProject.model;

import com.fasterxml.jackson.annotation.JsonBackReference;  // Thêm để tránh lặp JSON nếu cần
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;  // Giữ nếu dùng, hoặc thay LocalDateTime

@Data
@Entity
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;

    @Enumerated(EnumType.STRING)
    private EUserRole role;

    // Fix: Owning side – FK ở Account table, map đến User base
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")  // FK cột user_id trỏ User.id
    @JsonBackReference("user-account")  // Fix: Tránh lặp JSON (match với User nếu thêm)
    private User user;  // Map đến User (base, JPA cast subclass RescueTeam/Victim)
}