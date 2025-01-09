package com.example.academy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.academy.mapper.CalendarMapper;
import com.example.academy.vo.Calendar;

@Service
@Transactional
public class CalendarService {
	@Autowired CalendarMapper calendarMapper;
	
	// 박시현 : 회의실예약 캘랜더 리스트 출력.
	public List<Calendar> getReservationCalendar() {
		return calendarMapper.selectReservationCalendar();
	}
	
	// 진수우 : 캘랜더 리스트 출력.
	public List<Calendar> getCalendar(Integer imployeeNo) {
		return calendarMapper.selectCalendar(imployeeNo);
	}
}
