package com.example.RescueProject.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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

    @NotNull(message = "Vui lòng chọn loại yêu cầu cứu hộ")
    @ManyToOne
    @JoinColumn(name = "type_id")
    private TypeRequest type;

    @NotBlank(message = "Địa chỉ không được để trống")
    private String address;

    @NotBlank(message = "Mô tả chi tiết không được để trống")
//    @Column(columnDefinition = "TEXT")
    private String detail;

    @Enumerated(EnumType.STRING)
    private EStatus status;

    private String image;

    private String datetime;

}
