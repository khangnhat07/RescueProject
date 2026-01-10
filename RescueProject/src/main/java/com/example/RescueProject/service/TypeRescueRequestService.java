package com.example.RescueProject.service;

import com.example.RescueProject.model.TypeRequest;

import java.util.List;

public interface TypeRescueRequestService {
    List<TypeRequest> getAllTypeRequest();
    TypeRequest createTypeRequest(TypeRequest typeRequest);
    TypeRequest updateTypeRequest(Long id,TypeRequest typeRequest);
}
