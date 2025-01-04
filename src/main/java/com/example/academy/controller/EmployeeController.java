package com.example.academy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.academy.dto.EmployeeAddDTO;
import com.example.academy.service.EmployeeService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class EmployeeController {
	@Autowired EmployeeService employeeService;
	
	// 진수우 : 주소록 상세페이지, 마이페이지.
	@GetMapping("/employeeOne")
	public String employeeOne(Model model, Integer employeeNo) {
		model.addAttribute("employeeNo", employeeNo);
		return "employeeOne";
	}
	
	// 진수우 : 주소록 리스트 페이지.
	@GetMapping("/employeeList")
	public String employeeList(Model model) {
		return "employeeList";
	}
	
	// 진수우 : 사원 등록 로직.
	@PostMapping("/addEmployee")
	public String addEmployee(Model model, EmployeeAddDTO employAddDTO) {
		//model.addAttribute("employAddDTO", employAddDTO);
		employeeService.addEmployee(employAddDTO);
		return "test";
	}
}
