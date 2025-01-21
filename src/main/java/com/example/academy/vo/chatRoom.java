package com.example.academy.vo;

import java.util.HashMap;

import lombok.Data;

@Data
public class chatRoom {
	private int roomId;
	private String roomName;
	private int roomMemberId;
	private String createDate;
	private int userCount;
	
	private HashMap<String, String> userlist = new HashMap<String, String>();
}
