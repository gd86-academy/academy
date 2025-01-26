package com.example.academy.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class chattingMessageDTO {
	
	private Long id;
    private String fromUserName;
    private String toUserName;
    private String content;
    private LocalDateTime create_date;

}
