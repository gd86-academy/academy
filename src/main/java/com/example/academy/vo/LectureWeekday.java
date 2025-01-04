package com.example.academy.vo;

import lombok.Data;

@Data
public class LectureWeekday {
	
	private Integer lectureWeekdayNo;
	private Integer lectureNo;
	private String weekdayCode;
	private String beginTimeCode;
	private String endTimeCode;
	private String createDate;
	private String updateDate;
	
}