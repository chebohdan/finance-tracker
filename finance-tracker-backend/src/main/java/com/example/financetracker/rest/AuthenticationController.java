package com.example.financetracker.rest;

import com.example.financetracker.auth.AuthenticationRequest;
import com.example.financetracker.auth.AuthenticationResponse;
import com.example.financetracker.auth.AuthenticationService;
import com.example.financetracker.auth.RegisterRequest;
import com.example.financetracker.exception.MissingRefreshTokenException;
import com.example.financetracker.model.RefreshToken;
import com.example.financetracker.model.User;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.WebUtils;

@RestController
@RequestMapping("/api/v1/auth")
@AllArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authService;

    @PostMapping("/register")
    public ResponseEntity<User> registerDriver(
            @RequestBody RegisterRequest registerRequest
    ){
        return ResponseEntity.ok(authService.register(registerRequest));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest authenticationRequest
    ){
        AuthenticationResponse authenticationResponse =authService.authenticate(authenticationRequest);
        RefreshToken refreshToken = authService.generateRefreshToken(authenticationRequest);
        ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken.getRefreshToken())
                .httpOnly(true)
                .secure(true)
                .path("/api/v1/auth/refresh-token")
                .maxAge(7 * 24 * 60 * 60)
                .sameSite("Strict")
                .build();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).body(authenticationResponse);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<AuthenticationResponse> refreshToken(
            HttpServletRequest request
    ){
        Cookie refreshCookie = WebUtils.getCookie(request, "refreshToken");
        if (refreshCookie == null || refreshCookie.getValue() == null || refreshCookie.getValue().isEmpty()) {
            throw new MissingRefreshTokenException();
        }
        String refreshToken = refreshCookie.getValue();
        AuthenticationResponse authenticationResponse = authService.refreshToken(refreshToken);
        return ResponseEntity.ok(authenticationResponse);
    }


}
