package com.example.financetracker.mapper;

import com.example.financetracker.dto.NotificationResponse;
import com.example.financetracker.model.Notification;
import java.time.LocalDateTime;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-03T10:58:38+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 19.0.2 (Amazon.com Inc.)"
)
@Component
public class NotificationMapperImpl implements NotificationMapper {

    @Override
    public NotificationResponse toResponse(Notification notification) {
        if ( notification == null ) {
            return null;
        }

        Long id = null;
        String message = null;
        boolean read = false;
        LocalDateTime createdAt = null;

        id = notification.getId();
        message = notification.getMessage();
        read = notification.isRead();
        createdAt = notification.getCreatedAt();

        Long senderId = null;
        Long recipientId = null;

        NotificationResponse notificationResponse = new NotificationResponse( id, senderId, recipientId, message, read, createdAt );

        return notificationResponse;
    }
}
