package com.example.academy.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.example.academy.dto.EmployeeList;

@Mapper
public interface EmployeeMapper {
	
	// 사원조회.
	List<EmployeeList> selectEmployeeList();
	
	// 사원인원 수 조회.
	Integer countEmployee();
}
