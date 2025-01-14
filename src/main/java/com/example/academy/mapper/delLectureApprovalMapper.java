package com.example.academy.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.academy.dto.LectureApprovalListDTO;

//추후 LectureApprovalMapper 합치고 삭제예정

@Mapper
public interface delLectureApprovalMapper {

	// 김혜린 : 결재 대기 목록 - 강의신청서 리스트 조회
	List<LectureApprovalListDTO> selectWaitLectureApprovalList(Integer employeeNo);
	
	// 김혜린 : 나의 신청 목록 - 강의신청서 리스트 조회
	List<LectureApprovalListDTO> selectLectureApprovalList(Integer employeeNo);
}
