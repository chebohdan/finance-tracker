package com.example.financetracker.dto;

import com.example.financetracker.model.EUserAccountRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserAccountResponse {
    private Long userId;
    private Long accountId;
    private String firstName;
    private String lastName;
    private String email;
    private Boolean autoCategorization;
    private EUserAccountRole role;
}
