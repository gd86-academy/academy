package com.example.academy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.academy.dto.LectureOneDTO;
import com.example.academy.dto.LectureOneTimeListDTO;
import com.example.academy.security.CustomUserDetails;
import com.example.academy.service.CommonService;
import com.example.academy.service.LectureService;
import com.example.academy.vo.Common;


@Controller
public class LectureApprovalController {
	@Autowired LectureService lectureService;
	@Autowired CommonService commonService;
	
	@GetMapping("/addLectureApproval")
	public String addAttendanceApproval(Model model) {
		// 스프링시큐리티에서 계정정보 가져오기.
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		// 로그인 상태일 때만 model에 정보담기.
	    if (authentication != null && authentication.isAuthenticated() && !(authentication instanceof AnonymousAuthenticationToken)) {
	        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
	        model.addAttribute("userNo", Integer.parseInt(userDetails.getUsername()));
	        model.addAttribute("userName", userDetails.getUserRealName());
	        model.addAttribute("userMail", userDetails.getUserMail());
	        model.addAttribute("userRole", userDetails.getUserRole());
	        model.addAttribute("userPhotoFileName", userDetails.getUserPhotoFileName());
	        model.addAttribute("userPhotoFileExt", userDetails.getUserPhotoFileExt());
	    }
	    
	 // 3) 강의 요일 조회(셀렉박스)
	 		List<Common> commonWeekday = commonService.getWeekday();
	 		model.addAttribute("commonWeekday", commonWeekday);
	 		
	 		
	 		// 3) 강의 시간 조회(셀렉박스)
	 		List<Common> commonTime = commonService.getTime();
	 		model.addAttribute("commonTime", commonTime);
	 		
	    
	 
		
		return "addLectureApproval";
	}
	
}
