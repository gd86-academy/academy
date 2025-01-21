package com.example.academy.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.academy.dto.CalendarReservationListDTO;
import com.example.academy.mapper.CalendarMapper;
import com.example.academy.vo.Calendar;

import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@Slf4j
public class CalendarService {
	@Autowired CalendarMapper calendarMapper;
	
	// 진수우 : 마이페이지에서 캘랜더 리스트 출력.
	public List<Calendar> getCalendar(Integer employeeNo) {
		// 모든 스케줄을 담을 리스트.
		List<Calendar> scheduleList = new ArrayList<>();
		
		// 회의실 예약 스케줄 조회.
		List<CalendarReservationListDTO> reservationList = calendarMapper.selectReservationList(employeeNo);
		
		// 회의실 예약 색상정보 set.
		for (CalendarReservationListDTO reservation : reservationList) {
			Calendar calendar = new Calendar();
			calendar.setCalendarTitle(reservation.getReservationTitle()); // 타이틀.
			calendar.setCalendarDescription(reservation.getReservationContent()); // 상세정보.
			calendar.setCalendarDate(reservation.getReservationDate());
			calendar.setCalendarStart(reservation.getBeginTimeName()); // 시작시간.
			calendar.setCalendarEnd(reservation.getEndTimeName()); // 종료시간.
			calendar.setCalendarClassName("primary"); // 카테고리.
			scheduleList.add(calendar); // 리스트에 추가.
		}
		log.debug("스케쥴 : " + scheduleList);
		return scheduleList;
	}
}
