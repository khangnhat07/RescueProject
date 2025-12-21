package com.example.RescueProject.service.Impl;

import com.example.RescueProject.model.TypeRequest;
import com.example.RescueProject.repository.TypeRescueRequestRepository;
import com.example.RescueProject.service.TypeRescueRequestService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TypeRescueRequestServiceImpl implements TypeRescueRequestService {


    private TypeRescueRequestRepository typeRescueRequestRepository;

    public TypeRescueRequestServiceImpl(TypeRescueRequestRepository typeRescueRequestRepository) {
        this.typeRescueRequestRepository = typeRescueRequestRepository;
    }

    @Override
    public List<TypeRequest> getAllTypeRequest() {
        return this.typeRescueRequestRepository.findAll();
    }

    @Override
    public TypeRequest createTypeRequest(TypeRequest typeRequest) {
        return this.typeRescueRequestRepository.save(typeRequest);
    }

    @Override
    public TypeRequest updateTypeRequest(Long id, TypeRequest typeRequest) {
        Optional<TypeRequest> typeRequestPre = this.typeRescueRequestRepository.findById(id);
        if (typeRequestPre.isPresent()){
            TypeRequest newTypeRequest = typeRequestPre.get();
            newTypeRequest.setName(typeRequest.getName());
            return typeRescueRequestRepository.save(newTypeRequest);
        }
        else {
            throw  new IllegalArgumentException("Not found rescue request");
        }

    }


}
