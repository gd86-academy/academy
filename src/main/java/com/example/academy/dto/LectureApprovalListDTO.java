package com.example.academy.dto;

import lombok.Data;

@Data
public class LectureApprovalListDTO {

	private Integer lectureApprovalNo;		// PK
    private Integer lecturer;          		// FK
    private String lectureApprovalTitle;            
    private String lectureApprovalContent;            
    private String lectureName;   
    private String lectureContent;
    private Integer classroomNo;     		// FK
    private String lectureBeginDate;         
    private String lectureEndDate;        
    private String lectureApprovalStatus;  	// FK        
    private Integer lectureApprovalStep;           
    private String createDate;        
    private String updateDate;
	
    // 데이터를 배열로 반환하는 매서드
    public Object[] toArray() {
    	return new Object[] {
    			this.lectureApprovalNo
    			, this.lecturer
    			, this.lectureApprovalTitle
    			, this.lectureApprovalContent
    			, this.lectureName
    			, this.lectureContent
    			, this.classroomNo
    			, this.lectureBeginDate
    			, this.lectureEndDate
    			, this.lectureApprovalStatus
    			, this.lectureApprovalStep
    			, this.createDate
    			, this.updateDate
    	};
    }
}
