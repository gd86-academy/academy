package com.example.academy.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.academy.dto.CalendarReservationListDTO;

@Mapper
public interface CalendarMapper {
	
	// 진수우 : 마이페이지의 캘랜더에서 회의목록 조회.
	List<CalendarReservationListDTO> selectReservationList(Integer employeeNo);
}
