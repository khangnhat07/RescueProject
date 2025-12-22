package com.example.RescueProject.Controller;

import com.example.RescueProject.config.JwtProvider;
import com.example.RescueProject.model.EUserRole;
import com.example.RescueProject.model.User;
import com.example.RescueProject.repository.UserRepository;
import com.example.RescueProject.request.LoginRequest;

import com.example.RescueProject.response.AuthResponse;
import com.example.RescueProject.service.CustomerUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtProvider jwtProvider;
    @Autowired
    private CustomerUserDetailsService customerUserDetailsService;


    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws Exception {
        // Check if email already exists
        User isEmailExists = userRepository.findByEmail(user.getEmail());
        if (isEmailExists != null) {
            throw new Exception("Email already used with another account");
        }

        // Create a new user
        User createdUser = new User();
        createdUser.setEmail(user.getEmail());
        createdUser.setUsername(user.getUsername());
        createdUser.setPassword(passwordEncoder.encode(user.getPassword()));
        createdUser.setRole(user.getRole());  // Ensure the role is set

        // Save the user to the database
        User savedUser = userRepository.save(createdUser);

        // Create a cart for the customer

        List<GrantedAuthority> authorities = AuthorityUtils.createAuthorityList(savedUser.getRole().name());
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                user.getEmail(),
                user.getPassword(),
                authorities
        );


        // Set the authentication in the SecurityContext
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Generate the JWT token with the authentication (including role)
        String jwt = jwtProvider.generateToken(authentication);

        // Prepare the response with JWT and role
        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setMessage("Register success");
        authResponse.setRole(savedUser.getRole());

        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }


    @PostMapping("/signin")
    public ResponseEntity<AuthResponse>singin(@RequestBody LoginRequest req){
        String username= req.getEmail();

        String password = req.getPassword();

        Authentication authentication= authenticate(username,password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        Collection<? extends GrantedAuthority> authorities= authentication.getAuthorities();

        String role= authorities.isEmpty()?null:authorities.iterator().next().getAuthority();
        String jwt = jwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setMessage("Register success");
        authResponse.setRole(EUserRole.valueOf(role));

        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    private Authentication authenticate(String username, String password) {
        UserDetails userDetails = customerUserDetailsService.loadUserByUsername(username);
        if(userDetails == null){
            throw new BadCredentialsException("Invalid username");
        }
        if(!passwordEncoder.matches(password, userDetails.getPassword())){
            throw new BadCredentialsException("invalid password");
        }
        return new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
    }


}
