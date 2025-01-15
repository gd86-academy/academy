package com.example.academy.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.academy.security.CustomUserDetails;
import com.example.academy.service.AnnualLeaveService;

@Controller
public class AnnualLeaveController {
	@Autowired AnnualLeaveService annualLeaveService;
	
	// 연차 리스트 폼
	@GetMapping("/annualLeaveList")
	public String annualLeaveList(Model model) {
		
		// 스프링시큐리티에서 계정정보 가져오기.
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		// 로그인 상태일 때만 model에 정보담기.
	    if (authentication != null && authentication.isAuthenticated() && !(authentication instanceof AnonymousAuthenticationToken)) {
	        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
	    
	        // 현재 시각을 가져와서 "yyyy-MM" 형식으로 포맷팅
	        String currentMonth = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM"));
	        
	        // 이번 달 연차 개수 조회
	        Double annualLeaveCount = annualLeaveService.getAnnualLeaveCount(Integer.parseInt(userDetails.getUsername()));     
	        
	        // 최근 6개월 간 연차 사용 갯수 총합
	        List<Double> annualLeaveCountList = annualLeaveService.getAnnualLeaveCountByMonth(Integer.parseInt(userDetails.getUsername()));
	        
	        // 모델에 추가	        
	        model.addAttribute("annualLeaveCountList", annualLeaveCountList); // 최근 6개월 간 연차 사용 갯수 총합
	        model.addAttribute("count", annualLeaveCount); // 이번 달 연차 사용 개수
	        model.addAttribute("employeeNo", Integer.parseInt(userDetails.getUsername()));
	        model.addAttribute("userName", userDetails.getUserRealName());
	        model.addAttribute("userMail", userDetails.getUserMail());
	        model.addAttribute("userPhotoFileName", userDetails.getUserPhotoFileName());
	        model.addAttribute("userPhotoFileExt", userDetails.getUserPhotoFileExt());
	        model.addAttribute("currentMonth", currentMonth);
	    }
		
	    
	    
		return "annualLeaveList";
	}
}
