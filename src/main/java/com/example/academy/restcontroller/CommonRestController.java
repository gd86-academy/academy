package com.example.academy.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.example.academy.service.CommonService;
import com.example.academy.vo.Common;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class CommonRestController {
	@Autowired CommonService commonService;
	
	// 진수우 : 시간목록 출력.
	@GetMapping("/restapi/getTime")
	public List<Common> getTime() {
		return commonService.getTime();
	}
	
	// 진수우 : 요일목록 출력.
	@GetMapping("/restapi/getWeekday")
	public List<Common> getWeekday() {
		return commonService.getWeekday();
	}
	
	// 진수우 : 시간목록 출력.
	@GetMapping("/restapi/getDepartment")
	public List<Common> getDepartment() {
		return commonService.getDepartmentCategory();
	}
	
}
