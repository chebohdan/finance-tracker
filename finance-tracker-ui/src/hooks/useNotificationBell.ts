import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import useAuth from "./useAuth";

export interface NotificationMessage {
  id: number;
  senderId: number;
  recipientId: number;
  message: string;
  read: boolean;
  createdAt: string;
}

export const useNotificationBell = (
  webSocketUrl: string,
  onNotification: (notification: NotificationMessage) => void
) => {
  const { userId } = useAuth();
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(webSocketUrl),
      reconnectDelay: 5000,
      heartbeatIncoming: 2000,
      heartbeatOutgoing: 2000,
      debug: () => {}, // disable logs
      onConnect: () => {
        client.subscribe(`/topic/user/${userId}`, (msg) => {
          if (msg.body) {
            try {
              const notification: NotificationMessage = JSON.parse(msg.body);
              onNotification(notification);
            } catch (err) {
              console.error("Failed to parse notification:", err);
            }
          }
        });
      },
      onStompError: (frame) => {
        console.error("STOMP error:", frame.headers["message"]);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, [webSocketUrl, userId, onNotification]);
};
