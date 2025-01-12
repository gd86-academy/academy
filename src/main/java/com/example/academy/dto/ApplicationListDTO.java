package com.example.academy.dto;

import lombok.Data;

@Data
public class ApplicationListDTO {

	private Integer attendanceApprovalNo;
    private Integer employeeNo;
    private String attendanceApprovalTitle;
    private String attendanceApprovalContent;
    private String attendanceApprovalBeginDate;
    private String attendanceApprovalEndDate;
    private String attendanceApprovalType;
    private Integer attendanceApprovalStep;
    private String attendanceApprovalStatus;
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
    			, this.lectureApprovalNo
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
    	};
    }
}
