package com.example.academy.restcontroller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.academy.dto.AnnualLeaveListDTO;
import com.example.academy.service.AnnualLeaveService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class AnnualLeaveRestController {
	@Autowired AnnualLeaveService annualLeaveService;
	
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
