package com.example.academy.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemoMapper {
	
	// 진수우 : 메모삭제.
	Integer deleteMemo(Integer employeeNo);
	
}
