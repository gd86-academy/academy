package com.example.academy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.academy.dto.LectureModifyDTO;
import com.example.academy.dto.LectureOneDTO;
import com.example.academy.dto.LectureOneTimeListDTO;
import com.example.academy.service.CommonService;
import com.example.academy.service.LectureService;
import com.example.academy.vo.Common;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class LectureController {
	@Autowired LectureService lectureService;
	@Autowired CommonService commonService;
	
	// 김혜린 : 강의 삭제
	@GetMapping("/removeLecture")
	public String removeLecture(Integer lectureNo) {
		lectureService.removeLecture(lectureNo);
		
		return "redirect:/lectureList";
	}
	
	// 김혜린 : 강의 수정페이지
	@GetMapping("/modifyLecture")
	public String modifyLecture(Model model, Integer lectureNo) {
		// 강의 기존정보 불러오기 
		// 1) 강의 상세정보 출력
		LectureOneDTO lecture = lectureService.getLectureOne(lectureNo);
		model.addAttribute("lecture", lecture);
		log.debug("강의상세정보 : " + lecture);	//디버깅
		// 2) 강의 시간 리스트 출력
		List<LectureOneTimeListDTO> timeList = lectureService.getLectureOneTimeList(lectureNo);
		model.addAttribute("timeList", timeList);
		log.debug("강의시간정보 리스트 : " + timeList);	//디버깅
		
		// 3) 강의 요일 조회(셀렉박스)
		List<Common> commonWeekday = commonService.getWeekday();
		model.addAttribute("commonWeekday", commonWeekday);
		log.debug("----요일 리스트 : " + commonWeekday);	//디버깅
		
		// 3) 강의 시간 조회(셀렉박스)
		List<Common> commonTime = commonService.getTime();
		model.addAttribute("commonTime", commonTime);
		log.debug("----시간 리스트 : " + commonTime);	//디버깅
		
		return "modifyLecture";
	}
	// 김혜린 : 강의 수정페이지
	@PostMapping("/modifyLecture")
	public String modifyLecture(LectureModifyDTO lectureModifyDTO, @RequestParam(value="timeList", required = false) List<String> list) {
		log.debug("----------lectureModifyDTO : " + lectureModifyDTO);	//디버깅
		log.debug("----------list : " + list);	//디버깅
		//	강의 수정 
		lectureService.modifyLecture(lectureModifyDTO, list);
		
		return "redirect:/lectureOne?lectureNo=" + lectureModifyDTO.getLectureNo();
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
