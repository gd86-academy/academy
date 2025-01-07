package com.example.academy.dto;

import lombok.Data;

@Data
public class MeetingRoomListDTO {
	
	private Integer meetingroomNo;
	private String meetingroomName;
	private Integer meetingroomManager;
	private Integer meetingroomCapacity;
	private String createDate;
	private String updateDate;
	
	// 데이터를 배열로 변환
	public Object[] toArray() {
		return new Object[] {
				this.meetingroomNo,
				this.meetingroomName,
				this.meetingroomManager,
				this.meetingroomCapacity,
				this.createDate,
				this.updateDate
		};
	}

}
