package com.example.academy.dto;

import java.util.List;

import com.example.academy.vo.ReservationEmployee;

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
	private List<ReservationEmployee> reservationEmployees;
	
	// 회의실 명
	private String meetingroomName;
	
	// 데이터를 배열로 반환
	public Object[] toArray() {
		return new Object[] {
			this.reservationNo
			, this.meetingroomNo
			, this.beginTimeCode
			, this.endTimeCode 
			, this.reservationDate
			, this.reservationPerson
			, this.reservationTitle
			, this.reservationContent
		};
	}
	
}
