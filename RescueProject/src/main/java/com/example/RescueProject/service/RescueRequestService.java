package com.example.RescueProject.service;

import com.example.RescueProject.model.EStatus;
import com.example.RescueProject.model.RescueRequest;

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
    List<RescueRequest> findByStatus(EStatus status);
    List<RescueRequest> findRescueByVictim();
    List<RescueRequest> findRescueByRescuer();
    RescueRequest acceptRequest(Long id);
    RescueRequest cancelRequest(Long id);
    RescueRequest completeRequest(Long id);
    List<RescueRequest> searchRescueRequests(String keyword);
}