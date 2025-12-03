package com.example.financetracker.service;

import org.springframework.stereotype.Service;

@Service
public class WebSocketNotificationService {
/*
    private final SimpMessagingTemplate messagingTemplate;

    public WebSocketNotificationService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void sendInvite(Message message, Long targetUserId) {
        String time = new SimpleDateFormat("HH:mm").format(new Date());
        OutputMessage outputMessage = new OutputMessage(
                message.getFrom(),
                message.getText(),
                time
        );

        messagingTemplate.convertAndSendToUser(
                String.valueOf(targetUserId),    // INTERNAL WebSocket user identifier
                "/queue/invite",
                outputMessage
        );
    }

    */
}
