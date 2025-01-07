package com.example.academy.dto;


import lombok.Data;

@Data
public class MeetingRoomAddDTO {
	
	private Integer meetingroomNo;
	private String meetingroomName; 
    private Integer meetingroomManager; 
    private Integer meetingroomCapacity; 
	private String createDate;
	private String updateDate;

}
