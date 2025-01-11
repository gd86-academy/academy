package com.example.academy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.academy.dto.AttendanceApprovalListDTO;
import com.example.academy.mapper.AttendanceApprovalMapper;

@Service
@Transactional
public class AttendanceApprovalService {
	@Autowired AttendanceApprovalMapper attendanceApprovalMapper;
	
	// 근태신청서리스트 조회
	public List<AttendanceApprovalListDTO> getAttendanceApprovalLis(Integer employeeNo) {
		return attendanceApprovalMapper.selectAttendanceAprrovalList(employeeNo);
	}
}
