package com.example.RescueProject.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String content;
    private String time;
    private boolean published;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private BlogCategory category;
}
