package com.example.academy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.academy.dto.AddReservationDTO;
import com.example.academy.dto.MeetingRoomListDTO;
import com.example.academy.security.CustomUserDetails;
import com.example.academy.service.CalendarService;
import com.example.academy.service.CommonService;
import com.example.academy.service.MeetingRoomService;
import com.example.academy.service.ReservationService;
import com.example.academy.vo.Common;
import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class ReservationController {
	@Autowired ReservationService reservationService;
	@Autowired CalendarService calendarService;
	@Autowired CommonService commonService;
	@Autowired MeetingRoomService meetingroomService;
	
	// 박시현 : 예약 취소
	@GetMapping("/removeReservation")
	public String removeReservation(@RequestParam Integer reservationNo) {
		Integer row = reservationService.removeReservation(reservationNo);
		if(row == 0) {
			return "/reservationList";
		}
		return "redirect:/reservationList";
	}
	
	// 박시현 : 예약 신청
	@PostMapping("/addReservation")
	public String addReservation(@ModelAttribute AddReservationDTO addReservationDTO) {
		// 예약 신청
		int row = reservationService.insertReservation(addReservationDTO);
		// 예약 참여자 테이블에 데이터 추가
		if(row == 0) {
			return "addReservation";
		}
		return "redirect:/reservationList";
	}
	
	// 박시현 : 예약 신청
	@GetMapping("/addReservation")
	public String addReservation(Model model) {
		// 스프링시큐리티에서 계정정보 가져오기.
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		// 시간 조회
		List<Common> time = commonService.getTime(); 
		model.addAttribute("time",time);
		
		// 회의실 조회
		List<MeetingRoomListDTO> meetingroom = meetingroomService.getMeetingRoomList(); 
		model.addAttribute("meetingroom",meetingroom);
		
		// 로그인 상태일 때만 model에 정보담기.
	    if (authentication != null && authentication.isAuthenticated() && !(authentication instanceof AnonymousAuthenticationToken)) {
	        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
	    
	        model.addAttribute("reservationPerson", Integer.parseInt(userDetails.getUsername()));
	        model.addAttribute("userName", userDetails.getUserRealName());
	    }
	    return "addReservation"; 
	}
	
	// 박시현 : 예약 리스트
	@GetMapping("/reservationList")
	public String reservationList(Model model) {
		return "reservationList";
	}
}
