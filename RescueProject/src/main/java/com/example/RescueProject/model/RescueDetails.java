package com.example.RescueProject.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@Entity
public class RescueDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "type_request_id")
    private TypeRequest typeRequest;

    @OneToOne
    @JoinColumn(name = "address_request_id")
    private Address addressRequest;

    @ManyToOne
    @JoinColumn(name = "rescue_team_id")
    private RescueTeam rescueTeam;

    @Enumerated(EnumType.STRING)
    private EStatus status;

    @OneToMany(mappedBy = "rescueDetail", cascade = CascadeType.ALL)
    private List<Image> images;

    private String date;

    @ManyToOne
    @JoinColumn(name = "rescue_request_id")
    private RescueRequest rescueRequest;
}
