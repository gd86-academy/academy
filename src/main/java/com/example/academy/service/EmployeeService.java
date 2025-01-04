package com.example.academy.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.academy.dto.EmployeeAddDTO;
import com.example.academy.dto.EmployeeListDTO;
import com.example.academy.mapper.EmployeeMapper;

@Service
@Transactional
public class EmployeeService {
	@Autowired EmployeeMapper employeeMapper;
	
	// 진수우 : 사원 추가.
	public void addEmployee(EmployeeAddDTO employeeAddDTO) {
		// 사원정보 데이터베이스에 삽입.
		employeeMapper.insertEmployee(employeeAddDTO);
		
		// 주소정보 데이터베이스에 삽입.
		
		
		// 파일정보 데이터베이스에 삽입.
		
		// 서버에 물리적 파일 저장.
		
		
	}
		
		
	
	// 진수우 : 사원 리스트 출력.
	public List<EmployeeListDTO> getEmployeeList() {
		return employeeMapper.selectEmployeeList();
	}
	
	// 진수우 : 사원 인원수 조회.
	public Integer countEmployee() {
		return employeeMapper.countEmployee();
	}
}
