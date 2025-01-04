package com.example.academy.vo;

import lombok.Data;

@Data
public class Attendance {

	private Integer attendanceNo;
	private Integer employeeNo;
	private String attendanceCheckIn;
	private String attendanceCheckOut;
	private String attendanceStatus;
	private String attendanceContent;
	private String attendanceDate;
	private String createDate;
	private String updateDate;
	
}
