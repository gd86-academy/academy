package com.example.academy.restcontroller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.example.academy.dto.AttendanceApprovalListDTO;
import com.example.academy.service.AttendanceApprovalService;

import org.springframework.web.bind.annotation.GetMapping;


@RestController
public class AttendanceApprovalRestController {
	@Autowired AttendanceApprovalService attendanceApprovalService;
	
	// 근태신청서리스트 조회
	@GetMapping("/restapi/attendanceApprovalList")
	public List<Object[]> attendanceApprovalList(Integer employeeno) {
		List<AttendanceApprovalListDTO> attendanceApprovalsList = attendanceApprovalService.getAttendanceApprovalLis(employeeno);
		List<Object[]> result = new ArrayList<>();
		for(AttendanceApprovalListDTO attendanceApprovalList : attendanceApprovalsList) {
			result.add(attendanceApprovalList.toArray());
		}	
		return result;
	}	
}