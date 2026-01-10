package com.example.RescueProject.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Data
//@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
public class PasswordResetToken {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Integer id;


}
