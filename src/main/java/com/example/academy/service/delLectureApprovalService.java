package com.example.academy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.academy.dto.LectureApprovalListDTO;
import com.example.academy.mapper.delLectureApprovalMapper;

// 추후 LectureApprovalService 합치고 삭제
@Service
@Transactional
public class delLectureApprovalService {
	@Autowired delLectureApprovalMapper ddelLectureApprovalMapper;
	
	// 김혜린 : 결재 완료 목록 - 강의신청서 리스트 조회
	public List<LectureApprovalListDTO> getCompleteLectureApprovalList(Integer employeeNo){
		return ddelLectureApprovalMapper.selectCompleteLectureApprovalList(employeeNo);
	}
	
	// 김혜린 : 결재 대기 목록 - 강의신청서 리스트 조회
	public List<LectureApprovalListDTO> getWaitLectureApprovalList(Integer employeeNo){
		return ddelLectureApprovalMapper.selectWaitLectureApprovalList(employeeNo);
	}
	
	// 김혜린 : 나의 신청목록 - 강의신청서 리스트 조회
	public List<LectureApprovalListDTO> getLectureApprovalList(Integer employeeNo){
		return ddelLectureApprovalMapper.selectLectureApprovalList(employeeNo);
	}
		
}
