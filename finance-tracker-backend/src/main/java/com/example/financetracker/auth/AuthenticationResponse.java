package com.example.financetracker.auth;

import com.example.financetracker.model.ERole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    private List<ERole> roles;
    private String token;
    private Long userId;
    private String username;
}
