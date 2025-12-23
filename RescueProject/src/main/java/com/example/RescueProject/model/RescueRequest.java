package com.example.RescueProject.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@Entity
public class RescueRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "victim_id")
    private Victim victim;

    @OneToMany(mappedBy = "rescueRequest")
    private List<RescueDetails> rescueDetails;
}
