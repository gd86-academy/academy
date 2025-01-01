package com.example.academy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.academy.mapper.JinMapper;
import com.example.academy.vo.Employee;

@Service
@Transactional
public class JinService {
	@Autowired JinMapper jinMapper;
	
	public List<Employee>getEmployeeList() {
		return jinMapper.selectEmployeeList();
	}
}
