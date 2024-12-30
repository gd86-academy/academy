package com.example.academy.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class LoginController {
	
	@GetMapping("/login")
	public String login() {
		return "login";
	}
	
	@GetMapping("/management/home")
	public String managementHome() {
		return "management";
	}
	
	@GetMapping("/home")
	public String home() {
		return "home";
	}
}
