package com.example.academy.dto;

import lombok.Data;

@Data
public class AttendanceApprovalListDTO {

	private Integer attendanceApprovalNo;	// 신청번호
	private String attendanceApprovalTitle;	// 신청제목
	private String attendanceApprovalTypeCode;	// 신청종류코드
	private String attendanceApprovalType;	// 신청종류	
    private Integer employeeNo;				// 신청자
    private String attendanceApprovalStatusCode;	// 결재상태코드
    private String attendanceApprovalStatus;	// 결재상태
    private String createDate;
    private String updateDate;
	
    // 데이터를 배열로 반환하는 매서드
    public Object[] toArray() {
    	return new Object[] {
    			this.attendanceApprovalNo
    			, this.attendanceApprovalTitle
    			, this.attendanceApprovalType
    			, this.employeeNo
    			, this.attendanceApprovalStatus
    	};
    }
}
