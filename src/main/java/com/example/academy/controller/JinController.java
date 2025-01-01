package com.example.academy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.academy.service.JinService;
import com.example.academy.vo.Employee;


@Controller
public class JinController {
	@Autowired JinService jinservice;
	
	@GetMapping("/employeeList")
	public String employeeList(Model model) {
		List<Employee> employeeList = jinservice.getEmployeeList();
		model.addAttribute("employeeList", employeeList);
		return "employeeList";
	}
	
	@GetMapping("/all/management")
	public String management() {
		return "management";
	}
	
	@GetMapping("/main")
	public String main() {
		return "main";
	}
	
}
