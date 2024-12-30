package com.example.academy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.academy.service.JinService;
import com.example.academy.vo.Employee;


@Controller
public class JinController {
	private final JinService employeeService;
	
	@Autowired 
	JinController(JinService employeeService) {
		this.employeeService = employeeService;
	}
	
	@GetMapping("/all/employeeAdd")
	public String employeeAdd() {
		return "employeeAdd";
	}
	
	@PostMapping("/joinProc")
	public String employeeAdd(Employee employee) {
		return "redirect:/academy/login";
	}
	
	@GetMapping("/test")
	public String test() {
		return "test";
	}
	
}
