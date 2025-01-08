package com.example.academy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.academy.dto.MeetingRoomAddDTO;
import com.example.academy.dto.MeetingRoomListDTO;
import com.example.academy.service.MeetingRoomService;

@Controller
public class MeetingRoomController {
	
	@Autowired
	public MeetingRoomService meetingroomservice;
	
	
	// 회의실 삭제
	@GetMapping("/deleteMeetingRoom")
	public String deleteMeetingRoom(@RequestParam Integer meetingroomNo) {
		
		System.out.println("삭제 요청 받은 회의실 번호: " + meetingroomNo);
	    int row = meetingroomservice.deleteMeetingRoom(meetingroomNo);
	    if (row == 0) {
	        return "meetingRoom"; // 삭제 실패 시 현재 페이지 유지
	    }
	    return "redirect:/meetingRoomList"; // 삭제 성공 시 회의실 목록 페이지로 리다이렉트
	}

	
	
	//하상우) 회의실 수정
	@PostMapping("/modifyMeetingRoom")
	public String modifyMeetingRoom(MeetingRoomListDTO modifyMeetingRoom, Model model) {
		int row = meetingroomservice.modifyMeetingRoom(modifyMeetingRoom);
		
		return "redirect:/meetingRoom";
	}
	
	// 하상우) 회의실 추가
	 @PostMapping("/addMeetingRoom")
	    public String addMeetingRoom(MeetingRoomAddDTO meetingroomaddDTO, Model model) {
	        int row = meetingroomservice.addMeetingRoom(meetingroomaddDTO);
	        if (row == 0) {
	            return "meetingRoom";
	        }
	        return "redirect:/meetingRoomList";
	    }
	
	
	// 하상우 ) 회의실 목록 조회
	@GetMapping("/meetingRoomList")
	public String meetingRoomList(Model model) {
			
		return "meetingRoom";
	}

}
