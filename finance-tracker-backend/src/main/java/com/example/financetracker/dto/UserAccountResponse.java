package com.example.financetracker.dto;

import com.example.financetracker.model.EAccountRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserAccountResponse {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private EAccountRole accountRole;
}
