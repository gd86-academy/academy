package com.example.academy.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class ApplicationController {
	
	@GetMapping("")
	public String getMethodName() {
		return new String();
	}
	
	
}
