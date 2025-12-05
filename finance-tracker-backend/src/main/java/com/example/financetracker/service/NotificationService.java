package com.example.financetracker.service;

import com.example.financetracker.dto.NotificationResponse;
import com.example.financetracker.mapper.NotificationMapper;
import com.example.financetracker.model.Notification;
import com.example.financetracker.model.User;
import com.example.financetracker.repo.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Service responsible for managing notifications.
 */
@Service
@RequiredArgsConstructor
public class NotificationService {

    private static final Logger log = LoggerFactory.getLogger(NotificationService.class);

    private final NotificationRepository notificationRepository;
    private final SimpMessagingTemplate messagingTemplate;
    private final NotificationMapper notificationMapper;

    /**
     * Sends an invitation notification from one user to another.
     *
     * @param sender      the user sending the invitation
     * @param recipient   the user receiving the invitation
     * @param accountName the name of the account being shared
     * @return the saved Notification entity
     */
    public Notification sendInvitationNotification(User sender, User recipient, String accountName) {
        log.info("Sending invitation notification from userId={} to userId={} for account '{}'",
                sender.getId(), recipient.getId(), accountName);

        Notification notification = new Notification();
        notification.setSender(sender);
        notification.setRecipient(recipient);
        notification.setMessage(sender.getUserCredentials().getUsername() + " invited you to join account: " + accountName);
        notification.setCreatedAt(LocalDateTime.now());

        notificationRepository.save(notification);
        log.debug("Notification saved with id={}", notification.getId());

        // Send DTO to frontend
        NotificationResponse notificationResponse = notificationMapper.toResponse(notification);

        messagingTemplate.convertAndSend(
                "/topic/user/" + recipient.getId(),
                notificationResponse
        );

        log.info("Notification sent via WebSocket to userId={}", recipient.getId());

        return notification;
    }

    /**
     * Retrieves unread notifications for a given recipient.
     *
     * @param recipientId the ID of the user receiving notifications
     * @return a list of unread NotificationResponse DTOs
     */
    public List<NotificationResponse> getUnreadNotifications(Long recipientId) {
        log.info("Fetching unread notifications for userId={}", recipientId);

        List<NotificationResponse> unreadNotifications = notificationRepository
                .findByRecipientIdAndReadFalse(recipientId)
                .stream()
                .map(notificationMapper::toResponse)
                .toList();

        log.debug("Found {} unread notifications for userId={}", unreadNotifications.size(), recipientId);
        return unreadNotifications;
    }
}
