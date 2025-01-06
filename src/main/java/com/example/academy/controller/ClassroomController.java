package com.example.academy.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class ClassroomController {
	
	// 강의실 목록 조회
	@GetMapping("/classroomList")
	public String classroomList() {
		return "classroomList";
	}

}
