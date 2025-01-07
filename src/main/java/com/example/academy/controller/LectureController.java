package com.example.academy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.academy.dto.LectureOneDTO;
import com.example.academy.service.LectureService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class LectureController {
	@Autowired LectureService lectureService;
	
	
	// 김혜린 : 강의 상세페이지
	@GetMapping("/lectureOne")
	public String lectureOne(Model model, Integer lectureNo) {
		LectureOneDTO lectureOne = lectureService.getLectureOne(lectureNo);
		model.addAttribute("lectureOne", lectureOne);
		
		return "lectureOne";
	}
	
	
	// 김혜린 : 강의 리스트 출력
	@GetMapping("/lectureList")
	public String lectureList(Model model) {
		return "lectureList";		
	}

}
