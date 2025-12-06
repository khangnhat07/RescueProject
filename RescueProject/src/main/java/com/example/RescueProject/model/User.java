package com.example.RescueProject.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;  // Upgrade date từ String
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User {  // Giữ abstract
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String phone;
    private String address;

    @OneToMany(mappedBy = "victim")
    @JsonIgnore
    List<RescueRequest> rescueRequests;


    @OneToMany(mappedBy = "rescuer")
    @JsonIgnore
    List<RescueRequest> rescueRequestsAsRescuer;
}