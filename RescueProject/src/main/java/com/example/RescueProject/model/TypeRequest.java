package com.example.RescueProject.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;



@Entity
public class TypeRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "type")
    @JsonIgnore
    List<RescueRequest> rescueRequests;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<RescueRequest> getRescueRequests() {
        return rescueRequests;
    }

    public void setRescueRequests(List<RescueRequest> rescueRequests) {
        this.rescueRequests = rescueRequests;
    }
}
