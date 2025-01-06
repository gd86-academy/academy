package com.example.academy.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.academy.vo.Common;

@Mapper
public interface CommonMapper {
	
	// 진수우 : 부서 카테고리 조회.
	List<Common> selectDepartmentCategory();
	
	// 진수우 : 직급 카테고리 조회.
	List<Common> selectPositionCategory();
	
	// 진수우 : 파일 카테고리 조회.
	List<Common> selectFileCategory();
}
