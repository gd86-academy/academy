package com.example.academy.vo;

import lombok.Data;

@Data
public class Calendar {
	private Integer calendarNo;
	private Integer employeeNo;
    private String calendarTitle;
    private String calendarStart;
    private String calendarEnd;
    private String calendarClassName;
    private String calendarDescription;
    private String createDate;
    private String updateDate;
    
}