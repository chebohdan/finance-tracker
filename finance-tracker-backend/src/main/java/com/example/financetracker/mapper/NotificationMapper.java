package com.example.financetracker.mapper;

import com.example.financetracker.dto.NotificationResponse;
import com.example.financetracker.model.Notification;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses={UserMapper.class})
public interface NotificationMapper {
    NotificationResponse toResponse(Notification notification);
}
