package com.example.RescueProject.Controller.User;

import com.example.RescueProject.model.User;
import com.example.RescueProject.request.UserUpdateRequest;
import com.example.RescueProject.response.ApiResponse;
import com.example.RescueProject.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UpdateUserController {

    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<User>> getMyProfile(
            Authentication authentication
    ) {
        String email = authentication.getName(); // EMAIL LOGIN
        User user = userService.getUserByEmail(email);

        return ResponseEntity.ok(
                new ApiResponse<>(HttpStatus.OK, "My profile", user, null)
        );
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<User>> updateMyProfile(
            Authentication authentication,
            @RequestBody UserUpdateRequest request
    ) {
        String email = authentication.getName();
        User updated = userService.updateMyProfile(email, request);

        return ResponseEntity.ok(
                new ApiResponse<>(HttpStatus.OK, "Profile updated", updated, null)
        );
    }
}
