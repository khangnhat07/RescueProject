package com.example.RescueProject.Controller.RescueTeam;

import com.example.RescueProject.model.RescueRequest;
import com.example.RescueProject.response.ApiResponse;
import com.example.RescueProject.service.RescueRequestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/requests/rescuer")
public class RescueRequestRescuerController {
    private RescueRequestService rescueRequestService;

    public RescueRequestRescuerController(RescueRequestService rescueRequestService) {
        this.rescueRequestService = rescueRequestService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<List<RescueRequest>>> findRescueByRescuerId(@PathVariable long id){
        List<RescueRequest> rescueRequests = this.rescueRequestService.findRescueByRescuerId(id);
        var result = new ApiResponse<>(HttpStatus.OK,"Get all rescue by Rescuer", rescueRequests, null);
        return ResponseEntity.ok().body(result);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<RescueRequest>> updateRescueStatus(@PathVariable long id, @RequestBody RescueRequest rescueRequest){
        var result = new ApiResponse<>(HttpStatus.OK,"Update Resuce Status",rescueRequestService.updateRescueByRescuer(id,rescueRequest),null);
        return ResponseEntity.ok().body(result);
    }
}
