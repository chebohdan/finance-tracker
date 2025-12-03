package com.example.financetracker.rest;

import com.example.financetracker.dto.NotificationResponse;
import com.example.financetracker.model.Notification;
import com.example.financetracker.model.UserCredentials;
import com.example.financetracker.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping("/unread")
    public List<NotificationResponse> getUnread(@AuthenticationPrincipal UserCredentials userCredentials) {
        return notificationService.getUnreadNotifications(userCredentials.getId());
    }
}
