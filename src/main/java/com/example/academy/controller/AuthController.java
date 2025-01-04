package com.example.academy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.academy.security.CustomUserDetails;
import com.example.academy.service.AuthService;
import com.example.academy.vo.User;

@Controller
public class AuthController {
	@Autowired private AuthService authService;
	
	@GetMapping("/main")
	public String main() {
		return "main";
	}
	
	@GetMapping("/home")
    public String home(Model model) {
		
		// 스프링시큐리티에서 계정정보 가져오기.
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		// 로그인 상태일 때만 model에 정보담기.
	    if (authentication != null && authentication.isAuthenticated() && !(authentication instanceof AnonymousAuthenticationToken)) {
	        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
	        
	        model.addAttribute("password", userDetails.getPassword());
	        model.addAttribute("username", userDetails.getUsername());
	        model.addAttribute("role", userDetails.getUserrole());
	    }
        return "home";
    }
	
	@GetMapping("/login")
    public String loginP() {
        return "login";
    }  
}
