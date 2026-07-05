package com.cognizant.spring_learn.controller;

import com.cognizant.spring_learn.model.AuthenticationResponse;
import com.cognizant.spring_learn.util.JwtUtil;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

@RestController
public class AuthenticationController {

    @GetMapping("/authenticate")
    public AuthenticationResponse authenticate(
            @RequestHeader("Authorization") String authHeader) {

        String base64Credentials =
                authHeader.substring("Basic ".length());

        byte[] decoded =
                Base64.getDecoder().decode(base64Credentials);

        String credentials =
                new String(decoded, StandardCharsets.UTF_8);

        String[] values = credentials.split(":", 2);

        String username = values[0];
        String password = values[1];

        // Normally you'd validate the username/password here

        String token = JwtUtil.generateToken(username);

        return new AuthenticationResponse(token);
    }
}