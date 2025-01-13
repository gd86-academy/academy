package com.example.academy.restcontroller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.academy.dto.AttendanceApprovalListDTO;
import com.example.academy.service.AttendanceApprovalService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class ApplicationRestController {
	@Autowired AttendanceApprovalService attendanceApprovalService;
	
	// 김혜린 : 근태신청서 리스트
	@GetMapping("/restapi/attendanceApprovalList")
	public List<Object[]> attendanceApprovalList(Integer employeeNo) {
		List<AttendanceApprovalListDTO> AttendanceApprovalList = attendanceApprovalService.getAttendanceApprovalList(employeeNo);
		List<Object[]> result = new ArrayList<>();
		log.debug("employeeNo: " +employeeNo);
		for(AttendanceApprovalListDTO list : AttendanceApprovalList) {
			result.add(list.toArray());	// AttendanceApproval 객체를 배열로 반환
		}
		
		return result;
	}
	
	// 강의신청서 목록
	
}
