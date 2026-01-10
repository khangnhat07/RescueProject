package com.example.RescueProject.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    private User victim;

    @ManyToOne
    @JoinColumn(name = "rescuer_id")
    private User rescuer;

    @ManyToOne
    @JoinColumn(name = "type_id")
    private TypeRequest type;

    private String address;

    private String detail;

    @Enumerated(EnumType.STRING)
    private EStatus status;

    private String image;

    private String datetime;

}
