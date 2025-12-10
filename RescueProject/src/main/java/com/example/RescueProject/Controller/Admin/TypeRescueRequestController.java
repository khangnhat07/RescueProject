package com.example.RescueProject.Controller.Admin;

import com.example.RescueProject.model.TypeRequest;
import com.example.RescueProject.response.ApiResponse;
import com.example.RescueProject.service.TypeRescueRequestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class TypeRescueRequestController {
    private TypeRescueRequestService typeRescueRequestService;

    public TypeRescueRequestController(TypeRescueRequestService typeRescueRequestService) {
        this.typeRescueRequestService = typeRescueRequestService;
    }

    @GetMapping("/type-request")
    public ResponseEntity<ApiResponse<List<TypeRequest>>> getAllTypeRequest(){
        List<TypeRequest> typeRequestList = this.typeRescueRequestService.getAllTypeRequest();
        var result = new ApiResponse<>(HttpStatus.OK,"Get all type request", typeRequestList,null);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/type-request")
    public ResponseEntity<ApiResponse<TypeRequest>> createTypeRequest(@RequestBody TypeRequest typeRequest){
        TypeRequest newTypeRequest = this.typeRescueRequestService.createTypeRequest(typeRequest);
        var result = new ApiResponse<>(HttpStatus.CREATED,"Create new type request", newTypeRequest,null);
        return ResponseEntity.ok().body(result);
    }

    @PutMapping("/type-request/{id}")
    public ResponseEntity<ApiResponse<TypeRequest>> updateTypeRequest(@PathVariable long id,@RequestBody TypeRequest typeRequest){
        var result = new ApiResponse<>(HttpStatus.OK,"Update type request",this.typeRescueRequestService.updateTypeRequest(id,typeRequest),null);
        return ResponseEntity.ok().body(result);
    }
}