package com.example.academy.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.academy.dto.AffiliationModifyDTO;
import com.example.academy.dto.EmployeeAddDTO;
import com.example.academy.dto.EmployeeListDTO;
import com.example.academy.dto.EmployeeOneDTO;

@Mapper
public interface EmployeeMapper {
	
	// 진수우 : 사원부서/직책수정.
	Integer updateAffiliation(AffiliationModifyDTO affiliationModifyDTO);
	
	// 진수우 : 사원상세조회.
	EmployeeOneDTO selectEmployeeOne(Integer employeeNo);
	
	// 진수우 : 사원추가.
	Integer insertEmployee(EmployeeAddDTO employeeAddDTO);
	
	// 진수우 : 사원리스트 출력.
	List<EmployeeListDTO> selectEmployeeList();
	
	// 진수우 : 사원인원 수 조회.
	Integer countEmployee();
}
