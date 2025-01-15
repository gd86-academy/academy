package com.example.academy.dto;

import lombok.Data;

@Data
public class LectureApprovalEmployeeListDTO {
	private String approvalEmployee;
	private Integer lectureApprovalNo;
	private String approver;
	private Integer approverNo;
	private Integer approvalLevel;
}
