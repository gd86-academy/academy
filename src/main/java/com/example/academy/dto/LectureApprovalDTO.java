package com.example.academy.dto;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.academy.vo.LectureWeekday;

import lombok.Data;

@Data
public class LectureApprovalDTO {
	private Integer lecture; // 강사번호
    private String lectureBeginDate; // 개강일
    private String lectureEndDate; // 종강일
    private String classroomNo; // 강의실번호
    private String lectureName; // 강의명
    private String lectureContent; // 강의내용

    // 강의시간 정보
    private List<LectureWeekday> lectureWeekday;

    // 강의결재 정보
    private String lectureApprovalTitle; // 결재제목
    private String lectureApprovalContent; // 결재내용
    
    private List<String> approval;

    // 결재 파일
    private List<MultipartFile> lectureApprovalFile; // 파일
}
