package com.example.academy.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.academy.vo.Employee;

@Mapper
public interface EmployeeMapper {
	
	List<Employee> selectEmployeeList();
}
