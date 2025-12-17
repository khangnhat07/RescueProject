package com.example.RescueProject.service;

import com.example.RescueProject.model.RescueRequest;
import com.example.RescueProject.model.User;

import java.util.List;

public interface RescueRequestService {
    List<RescueRequest> getAllRescueRequest();
    RescueRequest createRescue(RescueRequest rescueRequest);
    RescueRequest findRescueById(Long id);
    RescueRequest updateRescue(Long id, RescueRequest rescueRequest);
    void deleteRescue(Long id);
    List<RescueRequest> findRescueByVictimId(Long id);
    List<RescueRequest> findRescueByRescuerId(Long id);
    RescueRequest updateRescueByRescuer(Long id, RescueRequest rescueRequest);
    List<User> getRescueTeamsByVictim(Long victimId);
}