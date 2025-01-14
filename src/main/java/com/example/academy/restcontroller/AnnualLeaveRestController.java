package com.example.academy.restcontroller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.academy.dto.AnnualLeaveListDTO;
import com.example.academy.service.AnnualLeaveService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class AnnualLeaveRestController {
	@Autowired AnnualLeaveService annualLeaveService;
	
	@GetMapping("/restapi/annualLeaveCount/employee={employeeNo}")
	public List<Double> annualLeaveCount(@PathVariable Integer employeeNo) {
	    List<Double> annualLeaveCountList = annualLeaveService.getAnnualLeaveCountByMonth(employeeNo);
	    return annualLeaveCountList;  // List<Double> 그대로 반환
	}
	
	// 최근 6개월 월별 연차 개수 조회
	@GetMapping("/restapi/annualLeaveCountByMonth/employee={employeeNo}")
	public List<Object[]> annualLeaveCountList(@PathVariable Integer employeeNo) {
		List<Double> annualLeaveCountList = annualLeaveService.getAnnualLeaveCountByMonth(employeeNo);
		List<Object[]> result = new ArrayList<>();
		for(Double count : annualLeaveCountList) {
			result.add(new Object[] { count }); // Double 값을 Object 배열로 래핑
		}
		return result;
	}
	
	// 월별 연차리스트 조회
	@GetMapping("/restapi/annualLeaveList")
	public List<Object[]> annualLeaveList(String month) {
		log.debug("month --------> "+ month);
		List<AnnualLeaveListDTO> annualLeavesList = annualLeaveService.getAnnualLeaveList(month);
		List<Object[]> result = new ArrayList<>();
		for(AnnualLeaveListDTO annualLeave : annualLeavesList) {
			result.add(annualLeave.toArray());
		}
		return result;
	}
}
