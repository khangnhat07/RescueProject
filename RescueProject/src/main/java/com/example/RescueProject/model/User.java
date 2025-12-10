package com.example.RescueProject.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;  // Upgrade date từ String
import java.util.List;


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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public List<RescueRequest> getRescueRequests() {
        return rescueRequests;
    }

    public void setRescueRequests(List<RescueRequest> rescueRequests) {
        this.rescueRequests = rescueRequests;
    }

    public List<RescueRequest> getRescueRequestsAsRescuer() {
        return rescueRequestsAsRescuer;
    }

    public void setRescueRequestsAsRescuer(List<RescueRequest> rescueRequestsAsRescuer) {
        this.rescueRequestsAsRescuer = rescueRequestsAsRescuer;
    }
}