package com.example.academy.dto;

import lombok.Data;

@Data
public class LectureOneDTO {
	private Integer lectureNo;	// 강의번호
	private Integer lecturer;	// 강사번호
	private String employeeName; // 강사이름
	
	private String lectureName;		// 강의명
	private String lectureContent;	// 강의상세설명
	
	private String lectureBeginDate;	// 개강일
	private String lectureEndDate;		// 종강일
	
	
	private Integer classroomNo;		// 강의실번호 
	private String classroomName;		// 강의실이름 	
	
	private String weekdayCode;		// 요일코드
	private String beginTimeCode;	// 시작시간코드
	private String endTimeCode;		// 종료시간코드
		
	private String weekday;		// 요일
	private String beginTime;	// 시작시간
	private String endTime;		// 종료시간
	
	private String createDate;
	private String updateDate;	
	
}
