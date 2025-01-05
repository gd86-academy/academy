package com.example.academy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.academy.dto.EmployeeAddDTO;
import com.example.academy.dto.EmployeeOneDTO;
import com.example.academy.service.CommonService;
import com.example.academy.service.EmployeeService;
import com.example.academy.vo.Common;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class EmployeeController {
	@Autowired EmployeeService employeeService;
	@Autowired CommonService commonService;
	
	// 진수우 : 주소록 상세페이지, 마이페이지.
	@GetMapping("/employeeOne")
	public String employeeOne(Model model, Integer employeeNo) {
		// 데이터베이스에서 해당 사원 조회.
		EmployeeOneDTO employee = employeeService.getEmployeeOne(employeeNo);
		model.addAttribute("employee", employee);
		// 데이터베이스에서 부서 카테고리 조회.
		List<Common> commonDepartment = commonService.getDepartmentCategory();
		model.addAttribute("commonDepartment", commonDepartment);
		// 데이터베이스에서 직급 카테고리 조회.
		List<Common> commonPosition = commonService.getPositionCategory();
		model.addAttribute("commonPosition", commonPosition);
		return "employeeOne";
	}
	
	// 진수우 : 주소록 리스트 페이지.
	@GetMapping("/employeeList")
	public String employeeList(Model model) {
		// 데이터베이스에서 부서 카테고리 조회.
		List<Common> commonDepartment = commonService.getDepartmentCategory();
		model.addAttribute("commonDepartment", commonDepartment);
		// 데이터베이스에서 직급 카테고리 조회.
		List<Common> commonPosition = commonService.getPositionCategory();
		model.addAttribute("commonPosition", commonPosition);
		return "employeeList";
	}
	
	// 진수우 : 사원 등록 로직.
	@PostMapping("/addEmployee")
	public String addEmployee(Model model, EmployeeAddDTO employAddDTO) {
		employeeService.addEmployee(employAddDTO); // 데이터베이스에 사원 추가.
		return "redirect:/employeeList";
	}
}
