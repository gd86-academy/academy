package com.example.academy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.academy.dto.AttendanceContentDTO;
import com.example.academy.dto.PasswordModifyDTO;
import com.example.academy.security.CustomUserDetails;
import com.example.academy.service.AnnualLeaveService;
import com.example.academy.service.AttendanceService;
import com.example.academy.service.AuthService;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class AuthController {
	@Autowired AuthService authService;
	@Autowired AnnualLeaveService annualLeaveService;
	@Autowired AttendanceService attendanceService;
	
	// 진수우 : 사원 비밀번호 변경.
	@PostMapping("/modifyPassword")
	public String modifyPw(PasswordModifyDTO passwordModifyDTO) {
		Integer resultPw = authService.modifyPw(passwordModifyDTO);
		return "redirect:/employeeOne?employeeNo=" + passwordModifyDTO.getEmployeeNo() + "&resultPw=" + resultPw;
	}
	
	// 진수우 : 메인페이지 호출.
	@GetMapping("/main")
	public String main(Model model) {
		// 스프링시큐리티에서 계정정보 가져오기.
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		// 로그인 상태일 때만 model에 정보담기.
	    if (authentication != null && authentication.isAuthenticated() && !(authentication instanceof AnonymousAuthenticationToken)) {
	        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
	        
	        // 이번년도 연차 개수 조회
	        Double annualLeaveCount = annualLeaveService.getAnnualLeaveCount(Integer.parseInt(userDetails.getUsername()));
	        
	        // 당일 월 지각, 조퇴, 결근 횟수 조회
	        AttendanceContentDTO content = attendanceService.getAttendanceContent(Integer.parseInt(userDetails.getUsername()));
 
	        // 최근 6개월 월별 근무시간 총합 조회
	        List<Integer> totalWorkTime = attendanceService.getAttendanceTotalWorkTime(Integer.parseInt(userDetails.getUsername()));
	        
	        model.addAttribute("count", annualLeaveCount); // 이번 달 연차 사용 갯수
	        model.addAttribute("totalWorkTimeList", totalWorkTime); // 최근 6개월 월별 근무시간 총합 리스트
	        model.addAttribute("absence", content.getAbsence()); // 결근
	        model.addAttribute("earlyLeave", content.getEarlyLeave()); // 조퇴
	        model.addAttribute("tardy", content.getTardy()); // 지각
	        model.addAttribute("userNo", userDetails.getUsername());
	        model.addAttribute("userName", userDetails.getUserRealName());
	        model.addAttribute("userMail", userDetails.getUserMail());
	        model.addAttribute("userPhotoFileName", userDetails.getUserPhotoFileName());
	        model.addAttribute("userPhotoFileExt", userDetails.getUserPhotoFileExt());
	    }
		return "main";
	}
	
	// 진수우 : 스프링시큐리티 테스트 페이지 호출.
	@GetMapping("/home")
    public String home(Model model) {
		
		// 스프링시큐리티에서 계정정보 가져오기.
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		// 로그인 상태일 때만 model에 정보담기.
	    if (authentication != null && authentication.isAuthenticated() && !(authentication instanceof AnonymousAuthenticationToken)) {
	        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
	        
	        model.addAttribute("password", userDetails.getPassword());
	        model.addAttribute("username", userDetails.getUsername());
	        model.addAttribute("role", userDetails.getUserRole());
	    }
        return "home";
    }
	
	// 진수우 : 로그인페이지 호출.
	@GetMapping("/login")
    public String loginP() {
        return "login";
    }  
}
