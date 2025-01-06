package com.example.academy.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.example.academy.dto.EmployeeModifyGetDTO;
import com.example.academy.vo.Files;

@Mapper
public interface FilesMapper {
	
	// 진수우 : 개인정보수정 기존파일명출력.
	EmployeeModifyGetDTO selectEmployeeModifyFile(Integer employeeNo);
	
	// 진수우 : 파일 저장.
	Integer insertFile(Files files);
}
