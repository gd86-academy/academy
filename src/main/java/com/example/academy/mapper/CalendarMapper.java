package com.example.academy.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.academy.vo.Calendar;

@Mapper
public interface CalendarMapper {
	
	// 박시현 : 회의예약 캘린더 리스트 출력
	List<Calendar> selectReservationCalendar();
	
	// 진수우 : 캘랜더 리스트 출력.
	List<Calendar> selectCalendar(Integer employeeNo);
}
