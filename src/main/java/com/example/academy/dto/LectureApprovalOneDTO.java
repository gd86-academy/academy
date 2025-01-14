package com.example.academy.dto;

import lombok.Data;

@Data
public class LectureApprovalOneDTO {
	private Integer lectureApprovalNo;
	private Integer employeeNo;
	private String employeeName;
	private String lectureApprovalTitle;
	private String lectureApprovalContent;
	private String lectureName;
	private String lectureContent;
	private String classroomName;
	private String lectureBeginDate;
	private String lectureEndDate;
	private String lectureApprovalStatus;
	private Integer lectureApprovalStep;
	private String createDate;
	private String updateDate;
	private Integer useYn;
}
