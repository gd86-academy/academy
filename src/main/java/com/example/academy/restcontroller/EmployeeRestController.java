package com.example.academy.restcontroller;

import org.springframework.web.bind.annotation.RestController;

import com.example.academy.dto.EmployeeList;
import com.example.academy.service.EmployeeService;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
public class EmployeeRestController {
	@Autowired EmployeeService employeeService;
	
	@GetMapping("/restapi/employeeList")
	public List<Object[]> employeeList() {
		List<EmployeeList> employeesList = employeeService.getEmployeeList();
		List<Object[]> result = new ArrayList<>();
		for (EmployeeList employeeList : employeesList) {
            result.add(employeeList.toArray()); // Employee 객체를 배열로 변환
        }
		return result;
	}
	
}
