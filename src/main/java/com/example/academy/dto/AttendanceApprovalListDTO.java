package com.example.academy.dto;

import lombok.Data;

@Data
public class AttendanceApprovalListDTO {

	private Integer attendanceApprovalNo;
    private Integer employeeNo;
    private String attendanceApprovalTitle;
    private String attendanceApprovalContent;
    private String attendanceApprovalBeginDate;
    private String attendanceApprovalEndDate;
    private String attendanceApprovalType;
    private Integer attendanceApprovalStep;
    private String attendanceApprovalStatus;
    private String updateDate;
    private String createDate;
	
    // 데이터를 배열로 반환하는 매서드
    public Object[] toArray() {
    	return new Object[] {
    			this.attendanceApprovalNo
    			, this.employeeNo
    			, this.attendanceApprovalTitle
    			, this.attendanceApprovalContent
    			, this.attendanceApprovalBeginDate
    			, this.attendanceApprovalEndDate
    			, this.attendanceApprovalType
    			, this.attendanceApprovalStep
    			, this.attendanceApprovalStatus
    			, this.updateDate
    			, this.createDate
    	};
    }
}
