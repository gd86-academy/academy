package com.example.academy.vo;

import lombok.Data;

@Data
public class chatMessage {
	
	private int id;
	private int roomId;
	private String employeeName;
	private String content;
	private String createDate;
	
	public enum MessageType{
        ENTER, TALK, LEAVE;
    }

}
