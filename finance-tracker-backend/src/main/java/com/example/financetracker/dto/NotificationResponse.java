package com.example.financetracker.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class NotificationResponse {
    private Long id;
    private Long senderId;
    private Long recipientId;
    private String message;
    private boolean read;
    private LocalDateTime createdAt;
}
