package com.example.RescueProject.service;

import com.example.RescueProject.model.EStatus;
import com.example.RescueProject.model.RescueRequest;
import com.example.RescueProject.model.User;
import com.example.RescueProject.repository.RescueRequestRepository;
import com.example.RescueProject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
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

        String email = org.springframework.security.core.context.SecurityContextHolder
                .getContext().getAuthentication().getName();

        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("Người dùng không tồn tại");
        }

        rescueRequest.setVictim(user);

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
            throw new NoSuchElementException("Request is not found");
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

    @Override
    public List<RescueRequest> findRescueByVictim() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email);

        return rescueRequestRepository.findByVictimId(user.getId());
    }

    @Override
    public List<RescueRequest> findRescueByRescuer() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User rescuer = userRepository.findByEmail(email);

        return rescueRequestRepository.findByRescuerId(rescuer.getId());
    }



    //rescuer feature

    @Override
    public RescueRequest acceptRequest(Long id) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User rescuer = userRepository.findByEmail(email);

        Optional<RescueRequest> rescueRequest = rescueRequestRepository.findById(id);
        if (rescueRequest.isPresent()){
            RescueRequest request = rescueRequest.get();
            if (request.getStatus() == EStatus.WAITING_ACCEPT){
                request.setStatus(EStatus.IN_PROCESS);
                request.setRescuer(rescuer);
                return rescueRequestRepository.save(request);
            }
            else {
                throw new RuntimeException("Request have been accepted");
            }
        }
        else {
            throw  new IllegalArgumentException("Not found rescue request");
        }
    }

    @Override
    public RescueRequest cancelRequest(Long id) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User rescuer = this.userRepository.findByEmail(email);

        Optional<RescueRequest> rescueRequest = rescueRequestRepository.findById(id);
        if (rescueRequest.isPresent()){
            RescueRequest request = rescueRequest.get();
            // kiểm tra quyền
            if (request.getStatus() == EStatus.IN_PROCESS ){
                if (request.getRescuer() != null && request.getRescuer().getEmail().equals(email)){
                    // thực hiện hủy request
                    request.setStatus(EStatus.WAITING_ACCEPT);
                    request.setRescuer(null);
                    return rescueRequestRepository.save(request);
                }
                else {
                    throw new RuntimeException("Bạn không có quyền hủy yêu cầu của người khác!");
                }
            }
            else {
                throw new RuntimeException("Chỉ có thể hủy yêu cầu đang trong quá trình xử lý.");
            }
    }else {
            throw new IllegalArgumentException("Không tìm thấy yêu cầu cứu hộ này.");
        }
    }


}