package com.example.academy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.academy.mapper.EmployeeMapper;
import com.example.academy.vo.Employee;

@Service
@Transactional
public class EmployeeService {
	@Autowired EmployeeMapper employeeMapper;
	
	public List<Employee>getEmployeeList() {
		return employeeMapper.selectEmployeeList();
	}
}
