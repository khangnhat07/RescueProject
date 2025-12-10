package com.example.RescueProject.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;


@Entity
public class RescueRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="victim_id")
    private User victim;

    @ManyToOne
    @JoinColumn(name="rescuer_id")
    private User rescuer;

    @ManyToOne
    @JoinColumn(name="type_id")
    private TypeRequest type;

    private String address;

    private String detail;

    private String status;

    private String image;

    private String datetime;

    public RescueRequest() {
    }

    public User getVictim() {
        return victim;
    }

    public void setVictim(User victim) {
        this.victim = victim;
    }

    public User getRescuer() {
        return rescuer;
    }

    public void setRescuer(User rescuer) {
        this.rescuer = rescuer;
    }

    public TypeRequest getType() {
        return type;
    }

    public void setType(TypeRequest type) {
        this.type = type;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDatetime() {
        return datetime;
    }

    public void setDatetime(String datetime) {
        this.datetime = datetime;
    }
}
