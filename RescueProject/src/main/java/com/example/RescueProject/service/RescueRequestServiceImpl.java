package com.example.RescueProject.service;

import com.example.RescueProject.model.EStatus;
import com.example.RescueProject.model.RescueRequest;
import com.example.RescueProject.repository.RescueRequestRepository;
import com.example.RescueProject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class RescueRequestServiceImpl implements RescueRequestService {
    private RescueRequestRepository rescueRequestRepository;
    private final UserRepository userRepository;


    public RescueRequestServiceImpl(RescueRequestRepository rescueRequestRepository,UserRepository userRepository) {
        this.rescueRequestRepository =rescueRequestRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<RescueRequest> getAllRescueRequest() {
        return rescueRequestRepository.findAll();
    }

    @Override
    public RescueRequest createRescue(RescueRequest rescueRequest) {
        rescueRequest.setStatus(EStatus.WAITING_ACCEPT);
        return rescueRequestRepository.save(rescueRequest);
    }

    @Override
    public RescueRequest findRescueById(Long id) {
        Optional<RescueRequest> rescueRequest = rescueRequestRepository.findById(id);
        if (rescueRequest.isPresent()){
            return rescueRequest.get();
        }
        return null;
    }

    @Override
    public RescueRequest updateRescue(Long id, RescueRequest rescueRequest) {
        Optional<RescueRequest> rescuePre = rescueRequestRepository.findById(id);
        if (rescuePre.isPresent()){
            RescueRequest newRescue = rescuePre.get();
            newRescue.setAddress(rescueRequest.getAddress());
            newRescue.setDetail(rescueRequest.getDetail());
            newRescue.setImage(rescueRequest.getImage());
            newRescue.setType(rescueRequest.getType());
            return rescueRequestRepository.save(newRescue);
        }
        else {
            throw  new IllegalArgumentException("Not found rescue request");
        }
    }

    @Override
    public void deleteRescue(Long id) {
        if (!rescueRequestRepository.existsById(id)){
            throw new NoSuchElementException("User not found");
        }
        rescueRequestRepository.deleteById(id);
    }

    @Override
    public List<RescueRequest> findRescueByVictimId(Long id) {
        return rescueRequestRepository.findByVictimId(id);
    }

    // rescuer

    @Override
    public List<RescueRequest> findRescueByRescuerId(Long id) {
        return rescueRequestRepository.findByRescuerId(id);
    }


    @Override
    public RescueRequest updateRescueByRescuer(Long id, RescueRequest rescueRequest) {
        Optional<RescueRequest> rescuePre = rescueRequestRepository.findById(id);
        if (rescuePre.isPresent()){
            RescueRequest newRescue = rescuePre.get();
            newRescue.setStatus(rescueRequest.getStatus());
            return rescueRequestRepository.save(newRescue);
        }
        else {
            throw  new IllegalArgumentException("Not found rescue request");
        }
    }

    @Override
    public List<RescueRequest> findByStatus(EStatus  status) {
        return rescueRequestRepository.findByStatus(status);
    }
}