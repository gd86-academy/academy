package com.example.academy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.academy.dto.EmployeeList;
import com.example.academy.service.EmployeeService;
import com.example.academy.vo.Address;

@Controller
public class EmployeeController {
	@Autowired EmployeeService employeeService;
	
	// 주소록 상세페이지, 마이페이지.
	@GetMapping("/employeeOne")
	public String employeeOne(Model model, Integer employeeNo) {
		model.addAttribute("employeeNo", employeeNo);
		return "employeeOne";
	}
	
	// 주소록 리스트 페이지.
	@GetMapping("/employeeList")
	public String employeeList(Model model) {
		return "employeeList";
	}
	
	// 사원 등록 로직.
	@PostMapping("/addEmployee")
	public String addEmployee(Model model, EmployeeList employee, Address address) {
		model.addAttribute("employee", employee);
		model.addAttribute("address", address);
		return "test";
	}
}
