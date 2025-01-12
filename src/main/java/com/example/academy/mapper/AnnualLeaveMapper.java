package com.example.academy.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.academy.dto.AnnualLeaveListDTO;

@Mapper
public interface AnnualLeaveMapper {

	// 월별 연차리스트 조회
	List<AnnualLeaveListDTO> selectAnnualLeave(String month);
	
}
