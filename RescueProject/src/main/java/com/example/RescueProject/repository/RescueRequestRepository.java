package com.example.RescueProject.repository;

import com.example.RescueProject.model.EStatus;
import com.example.RescueProject.model.RescueRequest;
import com.example.RescueProject.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RescueRequestRepository extends JpaRepository<RescueRequest, Long> {
    List<RescueRequest> findByVictimId(Long victimId);
    List<RescueRequest> findByRescuerId(Long rescuerId);
    List<RescueRequest> findByStatus(EStatus status);
    @Query("SELECT r FROM RescueRequest r JOIN r.victim v " +
            "WHERE LOWER(r.address) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR v.phone LIKE CONCAT('%', :keyword, '%')")
    List<RescueRequest> searchByAddressOrPhone(@Param("keyword") String keyword);
}
