package com.example.RescueProject.Controller.User;

import com.example.RescueProject.model.EStatus;
import com.example.RescueProject.model.RescueRequest;
import com.example.RescueProject.model.User;
import com.example.RescueProject.response.ApiResponse;
import com.example.RescueProject.service.RescueRequestService;
import com.example.RescueProject.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
public class RescueRequestUserController {
    private RescueRequestService rescueRequestService;



    public RescueRequestUserController(RescueRequestService rescueRequestService) {
        this.rescueRequestService = rescueRequestService;

    }

    @GetMapping("/requests")
    public ResponseEntity<ApiResponse<List<RescueRequest>>> getAllRequest(){
        List<RescueRequest> rescueRequestList = this.rescueRequestService.getAllRescueRequest();
        var  result = new ApiResponse<>(HttpStatus.OK,"Get All Request", rescueRequestList,null);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/requests")
    public ResponseEntity<ApiResponse<RescueRequest>> createRescue(@RequestBody RescueRequest rescueRequest){

        RescueRequest newRequest =this.rescueRequestService.createRescue(rescueRequest);
        var result =new ApiResponse<>(HttpStatus.CREATED,"Create Rescue", newRequest,null);
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/requests/{id}")
    public ResponseEntity<ApiResponse<RescueRequest>> findRescueById(@PathVariable long id){
        RescueRequest rescueRequest = this.rescueRequestService.findRescueById(id);
        var result =new ApiResponse<>(HttpStatus.OK,"Find Rescue By Id", rescueRequest,null);
        return ResponseEntity.ok().body(result);
    }

    @PutMapping("/requests/{id}")
    public ResponseEntity<ApiResponse<RescueRequest>> updateRescue(@PathVariable long id, @RequestBody RescueRequest rescueRequest){
        var result = new ApiResponse<>(HttpStatus.OK,"Update Resuce",rescueRequestService.updateRescue(id,rescueRequest),null);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/requests/{id}")
    public ResponseEntity<ApiResponse<RescueRequest>> deleteRescue(@PathVariable long id){
        rescueRequestService.deleteRescue(id);
        ApiResponse<RescueRequest> result = new ApiResponse<>(HttpStatus.NO_CONTENT,"Delete user",null,null);
        return ResponseEntity.ok().body(result);
    }


    // get rescue By victim id
    @GetMapping("/requests/victim/{id}")
    public ResponseEntity<ApiResponse<List<RescueRequest>>> findRescueByVictim(@PathVariable long id){
        List<RescueRequest> rescueRequestList = this.rescueRequestService.findRescueByVictimId(id);
        var  result = new ApiResponse<>(HttpStatus.OK,"Get All Request By Victim", rescueRequestList,null);
        return ResponseEntity.ok().body(result);

    }

    @GetMapping("/requests/filter-status")
    public ResponseEntity<ApiResponse<List<RescueRequest>>> findRequestByStatus(@RequestParam EStatus status){
        List<RescueRequest> rescueRequests = this.rescueRequestService.findByStatus(status);
        var result = new ApiResponse<>(HttpStatus.OK,"Get request by Status", rescueRequests,null);
        return ResponseEntity.ok().body(result);
    }


    @GetMapping("/requests/my-request")
    public ResponseEntity<ApiResponse<List<RescueRequest>>> findRequestByVictim() {
        List<RescueRequest> rescueRequestList = this.rescueRequestService.findRescueByVictim();
        var result = new ApiResponse<>(HttpStatus.OK,"Get request by current victim",rescueRequestList,null);
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/requests/search")
    public ResponseEntity<?> search(@RequestParam String keyword) {
        try {
            List<RescueRequest> results = rescueRequestService.searchRescueRequests(keyword);
            return ResponseEntity.ok(results);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi tìm kiếm: " + e.getMessage());
        }
    }

}
