package com.example.financetracker.service;

import com.example.financetracker.dto.NotificationResponse;
import com.example.financetracker.mapper.NotificationMapper;
import com.example.financetracker.model.Notification;
import com.example.financetracker.model.User;
import com.example.financetracker.repo.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final SimpMessagingTemplate messagingTemplate;
    private final NotificationMapper notificationMapper;

    public Notification sendInvitationNotification(User sender, User recipient, String accountName) {

        Notification notification = new Notification();
        notification.setSender(sender);
        notification.setRecipient(recipient);
        notification.setMessage(sender.getUserCredentials().getUsername() + " invited you to join account: " + accountName);
        notification.setCreatedAt(LocalDateTime.now());

        notificationRepository.save(notification);

        // Send DTO to frontend
        NotificationResponse notificationResponse = notificationMapper.toResponse(notification);

        messagingTemplate.convertAndSend(
                "/topic/user/" + recipient.getId(),
                notificationResponse
        );

        return notification;
    }

    public List<NotificationResponse> getUnreadNotifications(Long recipientId) {
        return notificationRepository.findByRecipientIdAndReadFalse(recipientId)
                .stream()
                .map(notificationMapper::toResponse)
                .toList();
    }
}
