package com.example.academy.vo;

import lombok.Data;

@Data
public class Calendar {
	private Integer calendarNo;
	private Integer employeeNo;
	private Integer reservationNo;
	private Integer lectureNo;
    private String calendarTitle;
    private String calendarStart;
    private String calendarEnd;
    private String calendarDate;
    private String calendarClassName;
    private String calendarDescription;
    private String createDate;
    private String updateDate;
    
}