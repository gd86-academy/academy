package com.example.academy.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.example.academy.vo.Employee;

@Mapper
public interface JinMapper {
	
	Integer insertEmployee(Employee employee);
}
