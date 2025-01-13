package com.example.academy.dto;

import lombok.Data;

@Data
public class LectureApprovalListDTO {

	private Integer lectureApprovalNo;		// PK 신청번호
	private String lectureApprovalTitle;    // 신청제목   
    private Integer lecturer;          		// FK	신청자
    private String lectureApprovalStatus;  	// FK   결재상태       
    private String createDate;        
    private String updateDate;
	
    // 데이터를 배열로 반환하는 매서드
    public Object[] toArray() {
    	return new Object[] {
    			this.lectureApprovalNo
    			, this.lectureApprovalTitle
    			, this.lecturer
    			, this.lectureApprovalStatus
    			, this.createDate
    			, this.updateDate
    	};
    }
}
