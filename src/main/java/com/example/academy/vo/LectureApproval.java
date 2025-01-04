package com.example.academy.vo;

import lombok.Data;

@Data
public class LectureApproval {
	
	private Integer lectureApprovalNo;
    private Integer lecturer;          
    private String lectureApprovalTitle;            
    private String lectureApprovalContent;            
    private String lectureName;   
    private String lectureContent;
    private Integer classroomNo;     
    private String lectureBeginDate;         
    private String lectureEndDate;        
    private String lectureApprovalStatus;          
    private Integer lectureApprovalStep;          
    private String createDate;        
    private String updateDate;   

}