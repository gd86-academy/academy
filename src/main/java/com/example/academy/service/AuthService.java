package com.example.academy.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.academy.dto.PasswordModifyDTO;
import com.example.academy.mapper.AuthMapper;

@Service
@Transactional
public class AuthService {
	@Autowired private BCryptPasswordEncoder bCryptPasswordEncoder;
	@Autowired AuthMapper authMapper;
	
	// 진수우 : 사원 비밀번호변경
	public Integer modifyPw(PasswordModifyDTO passwordModifyDTO) {
		// 입력받은 기존 비밀번호 암호화.
		passwordModifyDTO.setEmployeeNowPw(bCryptPasswordEncoder.encode(passwordModifyDTO.getEmployeeNowPw()));
		// 데이터베이스에서 기존 비밀번호가 일치하는지 확인.
		Integer nowPassword = authMapper.selectEmployeeNowPw(passwordModifyDTO.getEmployeeNowPw());
		// 입력한 비밀번호와 데이터베이스에 있는 비밀번호가 일치하다면,
		if (nowPassword == 1) {
			// 새 비밀번호와 새 비밀번호 확인에 입력한 값이 일치하다면,
			if(passwordModifyDTO.getEmployeeChangePw().equals(passwordModifyDTO.getEmployeeChangePwCheck())) {
				// 입력받은 새 비밀번호 암호화.
				passwordModifyDTO.setEmployeeChangePw(bCryptPasswordEncoder.encode(passwordModifyDTO.getEmployeeNowPw()));
				// 데이터베이스에서 사원 비밀번호 수정.
				authMapper.updateEmployeePw(passwordModifyDTO);
				return 1; // 비밀번호 수정 성공.
			}
			return 2; // 새 비밀번호와 새 비밀번호 확인에 입력한 값이 일치하지 않음.
		}
		return 3; // 기존 비밀번호가 일치하지 않음.
	}
}
