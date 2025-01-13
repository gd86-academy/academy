package com.example.academy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.academy.dto.LectureApprovalGetBeginTimeDTO;
import com.example.academy.mapper.LectureApprovalMapper;
import com.example.academy.vo.Common;

@Service
@Transactional
public class LectureApprovalService {
	@Autowired LectureApprovalMapper lectureApprovalMapper;
	
	// 진수우 : 진수우 : 시작시간 선택 시 가능한 시간만 출력
	public List<Common> getLectureApprovalGetBeginTime(LectureApprovalGetBeginTimeDTO lectureApprovalGetBeginTimeDTO) {
		return lectureApprovalMapper.selectLectureApprovalGetBeginTime(lectureApprovalGetBeginTimeDTO);
	}
}
