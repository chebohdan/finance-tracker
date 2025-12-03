package com.example.financetracker.repo;

import com.example.financetracker.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification,Long> {
    List<Notification> findByRecipientIdAndReadFalse(Long userId);
}
