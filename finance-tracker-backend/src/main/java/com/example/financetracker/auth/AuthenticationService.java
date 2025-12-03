package com.example.financetracker.auth;

import com.example.financetracker.config.JwtService;
import com.example.financetracker.model.ERole;
import com.example.financetracker.model.RefreshToken;
import com.example.financetracker.model.User;
import com.example.financetracker.model.UserCredentials;
import com.example.financetracker.repo.RefreshTokenRepository;
import com.example.financetracker.repo.UserCredentialsRepository;
import com.example.financetracker.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final UserCredentialsRepository userCredentialsRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;


    public User register(RegisterRequest registerRequest) {

        if (userCredentialsRepository.existsByUsername(registerRequest.getEmail())) {
            throw new BadCredentialsException("This username is already taken");
        }

        User user =
                User.builder()
                .firstName(registerRequest.getFirstName())
                .lastName(registerRequest.getLastName())
                .birthday(registerRequest.getBirthday())
                .email(registerRequest.getEmail())
                .build();

        UserCredentials userCredentials =
                UserCredentials.builder()
                .username(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .roles(List.of(ERole.USER, ERole.DRIVER))
                .user(user)
                .build();

        user.setUserCredentials(userCredentials);

        return userRepository.save(user);
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserCredentials userCredentials = userCredentialsRepository.findByUsername(request.getUsername())
                .orElseThrow();
        String jwtToken = jwtService.generateToken(userCredentials);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .roles(userCredentials.getRoles().stream().toList())
                .userId(userCredentials.getId())
                .username(userCredentials.getUsername())
                .build();
    }

    public AuthenticationResponse refreshToken(String refreshToken) {
        RefreshToken refreshTokenEntity = refreshTokenRepository.findByRefreshToken(refreshToken)
                .orElseThrow(() -> new AccessDeniedException("Refresh token not found"));

        UserCredentials userCredentials = userCredentialsRepository.findByUsername(
                        jwtService.extractUsername(refreshToken))
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (!jwtService.isTokenValid(refreshToken, userCredentials)) {
            throw new AccessDeniedException("Refresh token is invalid or expired");
        }

        String jwtToken = jwtService.generateToken(userCredentials);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .roles(userCredentials.getRoles().stream().toList())
                .userId(userCredentials.getId())
                .build();
    }

    public RefreshToken generateRefreshToken(AuthenticationRequest request) {
        UserCredentials userCredentials = userCredentialsRepository.findByUsername(request.getUsername())
                .orElseThrow();
        String refreshTokenString = jwtService.generateRefreshToken(userCredentials);
        RefreshToken refreshTokenEntity = new RefreshToken(refreshTokenString);
        refreshTokenRepository.save(refreshTokenEntity);
        return refreshTokenEntity;
    }



}
