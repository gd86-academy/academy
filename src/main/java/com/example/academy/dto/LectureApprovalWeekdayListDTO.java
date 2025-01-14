package com.example.academy.dto;

import lombok.Data;

@Data
public class LectureApprovalWeekdayListDTO {
	private Integer lectureWeekdayNo;
	private String weekday;
	private String beginTime;
	private String endTime;
}
