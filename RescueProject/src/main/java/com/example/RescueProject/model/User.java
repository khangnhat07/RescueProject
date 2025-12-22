package com.example.RescueProject.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;  // Upgrade date từ String
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;   // dùng để login
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    // bcrypt
    private String email;
    private String name;
    private String phone;
    private String date;

    @Enumerated(EnumType.STRING)
    private EUserRole role;   // ROLE_VICTIM, ROLE_RESCUETEAM, ROLE_ADMIN

    @OneToOne
    @JoinColumn(name = "address_id")
    private Address address;
}
