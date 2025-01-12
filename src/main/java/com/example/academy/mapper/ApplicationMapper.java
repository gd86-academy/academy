package com.example.academy.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.academy.dto.ApplicationListDTO;

@Mapper
public interface ApplicationMapper {
	
	public List<ApplicationListDTO> selectApplicationList(Integer employeeNo);
	
}
