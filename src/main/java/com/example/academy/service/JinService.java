package com.example.academy.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.academy.mapper.JinMapper;
import com.example.academy.vo.Employee;

@Service
@Transactional
public class JinService {
	private final JinMapper employeeMapper;
	private final PasswordEncoder passwordEncoder;
	
	@Autowired
	JinService(JinMapper employeeMapper, PasswordEncoder passwordEncoder) {
		this.employeeMapper = employeeMapper;
		this.passwordEncoder = passwordEncoder;
	}
	
//	public void employeeAdd(Employee employee) {
//		// 비밀번호 암호화
//        employee.setEmployeePw(PasswordEncoder.encode(employee.getEmployeePw()));
//
//        // 사용자 정보 저장
//        employeeMapper.insertEmployee(employee);
//	}
}
