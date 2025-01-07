package com.example.academy.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.example.academy.dto.AuthDTO;
import com.example.academy.dto.PasswordModifyDTO;
import com.example.academy.vo.Employee;

@Mapper
public interface AuthMapper {
	
	// 진수우 : 사원 비밀번호 수정.
	Integer updateEmployeePw(PasswordModifyDTO passwordModifyDTO);
	
	// 진수우 : 비밀번호 수정 시 현재 비밀번호 조회.
	String selectEmployeeNowPw(PasswordModifyDTO passwordModifyDTO);
	
    // 진수우 : 시큐리티 로그인 시 사원 데이터베이스 조회.
    AuthDTO findByUsername(String username);
}
