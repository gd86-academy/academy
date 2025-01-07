package com.example.academy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.academy.dto.LectureOneDTO;
import com.example.academy.dto.LectureOneTimeListDTO;
import com.example.academy.service.LectureService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class LectureController {
	@Autowired LectureService lectureService;
	
	// 김혜린 : 수정 페이지
	@GetMapping("/modifyLecture")
	public String modifyLecture(Model model, Integer lectureNo) {
		
		return "modifyLecture";
	}
	
	// 김혜린 : 강의 상세페이지
	@GetMapping("/lectureOne")
	public String lectureOne(Model model, Integer lectureNo) {
		// 강의 상세정보 출력
		LectureOneDTO lecture = lectureService.getLectureOne(lectureNo);
		model.addAttribute("lecture", lecture);
		log.debug("강의상세정보 : " + lecture);	//디버깅
		// 강의 시간 리스트 출력
		List<LectureOneTimeListDTO> timeList = lectureService.getLectureOneTimeList(lectureNo);
		model.addAttribute("timeList", timeList);
		log.debug("강의시간정보 리스트 : " + timeList);	//디버깅
		
		return "lectureOne";
	}
	
	
	// 김혜린 : 강의 리스트 출력
	@GetMapping("/lectureList")
	public String lectureList(Model model) {
		return "lectureList";		
	}

}
