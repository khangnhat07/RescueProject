package com.example.RescueProject.repository;

import com.example.RescueProject.model.EStatus;
import com.example.RescueProject.model.RescueRequest;
import com.example.RescueProject.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RescueRequestRepository extends JpaRepository<RescueRequest, Long> {
    List<RescueRequest> findByVictimId(Long victimId);
    List<RescueRequest> findByRescuerId(Long rescuerId);

    List<RescueRequest> findByStatus(EStatus status);
}
