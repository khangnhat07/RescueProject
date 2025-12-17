package com.example.RescueProject.model;

import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity
public class TypeRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String typeName;
}
