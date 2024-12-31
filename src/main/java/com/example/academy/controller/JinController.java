package com.example.academy.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class JinController {
	@GetMapping("/all/management")
	public String management() {
		return "management";
	}
	
}
