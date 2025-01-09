package com.example.academy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.academy.dto.ReservationListDTO;
import com.example.academy.service.CalendarService;
import com.example.academy.service.ReservationService;
import com.example.academy.vo.Calendar;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class ReservationController {
	@Autowired ReservationService reservationService;
	@Autowired CalendarService calendarService;
	
	@GetMapping("/reservationList")
	public String reservationList(Model model) {
		List<ReservationListDTO> reservationList = reservationService.getReservationList();
		model.addAttribute("reservationList",reservationList);
		List<Calendar> calendar = calendarService.getReservationCalendar();
		model.addAttribute("calendar",calendar);
		log.debug("reservationList : " + reservationList);
		log.debug("calendar : " + calendar);
		return "reservationList";
	}
}
