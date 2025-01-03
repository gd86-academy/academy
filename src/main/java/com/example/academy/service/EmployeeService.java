package com.example.academy.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.academy.dto.EmployeeList;
import com.example.academy.mapper.EmployeeMapper;

@Service
@Transactional
public class EmployeeService {
	@Autowired EmployeeMapper employeeMapper;
	
	public List<EmployeeList> getEmployeeList() {
		return employeeMapper.selectEmployeeList();
	}
	
	public Integer countEmployee() {
		return employeeMapper.countEmployee();
	}
}
