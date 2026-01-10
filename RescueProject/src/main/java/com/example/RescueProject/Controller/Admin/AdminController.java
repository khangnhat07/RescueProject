package com.example.RescueProject.Controller.Admin;

import com.example.RescueProject.model.User;
import com.example.RescueProject.response.ApiResponse;
import com.example.RescueProject.service.AdminUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final AdminUserService adminUserService;

    public AdminController(AdminUserService adminUserService) {
        this.adminUserService = adminUserService;
    }

    // GET: danh sách đội cứu hộ
    @GetMapping("/rescuers")
    public ResponseEntity<ApiResponse<List<User>>> getAllRescuers() {
        List<User> rescuers = adminUserService.getAllRescuers();

        var result = new ApiResponse<>(
                HttpStatus.OK,
                "List of rescue teams",
                rescuers,
                null
        );

        return ResponseEntity.ok().body(result);
    }

    // GET: danh sách nạn nhân
    @GetMapping("/victims")
    public ResponseEntity<ApiResponse<List<User>>> getAllVictims() {
        List<User> victims = adminUserService.getAllVictims();

        var result = new ApiResponse<>(
                HttpStatus.OK,
                "List of victims",
                victims,
                null
        );

        return ResponseEntity.ok().body(result);
    }
    @GetMapping("/rescuers/{id}")
    public ResponseEntity<ApiResponse<User>> getRescuerById(@PathVariable Long id) {
        User rescuer = adminUserService.getRescuerById(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        HttpStatus.OK,
                        "Rescuer detail",
                        rescuer,
                        null
                )
        );
    }
    @GetMapping("/victim/{id}")
    public ResponseEntity<ApiResponse<User>> getVictimById(@PathVariable Long id) {
        User victim = adminUserService.getVictimById(id);
        return ResponseEntity.ok(
                new ApiResponse<>(
                        HttpStatus.OK,
                        "Victim detail",
                        victim,
                        null
                )
        );
    }
    @DeleteMapping("/deactivate_users/{id}")
    public ResponseEntity<ApiResponse<Void>> deactivateUser(@PathVariable Long id) {
        adminUserService.softDeleteUser(id);
        return ResponseEntity.ok(
                new ApiResponse<>(
                        HttpStatus.OK,
                        "User deactivated successfully",
                        null,
                        null
                )
        );
    }
    @PutMapping("/update_users/{id}")
    public ResponseEntity<ApiResponse<User>> updateUser(
            @PathVariable Long id,
            @RequestBody User updatedUser) {

        User user = adminUserService.updateUser(id, updatedUser);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        HttpStatus.OK,
                        "User updated successfully",
                        user,
                        null
                )
        );
    }
}
