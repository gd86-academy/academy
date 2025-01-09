package com.example.academy.dto;

import lombok.Data;

@Data
public class ReservationListDTO {
	private Integer reservationNo;
	private Integer meetingroomNo; // meetingroom
	private String beginTimeCode;  // common
	private String endTimeCode; // common
	private String reservationDate;
	private Integer reservationPerson; // 예약자
	private String reservationTitle;
	private String reservationContent;
	private String createDate;
	private String updateDate;
	
	// 예약참여자
	private Integer employeeNo; 
	
	// 회의실 명
	private String meetingroomName;
	
}
