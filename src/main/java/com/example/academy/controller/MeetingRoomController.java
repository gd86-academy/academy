package com.example.academy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.academy.dto.MeetingRoomAddDTO;
import com.example.academy.service.MeetingRoomService;

@Controller
public class MeetingRoomController {
	
	@Autowired
	public MeetingRoomService meetingroomservice;
	
	
	// 회의실 삭제
	@GetMapping("/deleteMeetingRoom")
	public String deleteMeetingRoom(@RequestParam Integer meetingroomNo) {
		
		
	    int row = meetingroomservice.deleteMeetingRoom(meetingroomNo);
	    if (row == 0) {
	        return "meetingRoom"; // 삭제 실패 시 현재 페이지 유지
	    }
	    return "redirect:/meetingRoomList"; // 삭제 성공 시 회의실 목록 페이지로 리다이렉트
	}

	
	
//	@GetMapping("/modifyMeetingRoom")
//    public ResponseEntity<MeetingRoomAddDTO> getMeetingRoom(@RequestParam Integer meetingroomNo) {
//        MeetingRoomAddDTO meetingRoom = meetingroomservice.getMeetingRoomNo(meetingroomNo);
//        if (meetingRoom != null) {
//            return ResponseEntity.ok(meetingRoom);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }
//
//    @PostMapping("/modifyMeetingRoom")
//    public ResponseEntity<String> modifyMeetingRoom(@ModelAttribute MeetingRoomAddDTO modifyMeetingRoom) {
//        int row = meetingroomservice.modifyMeetingRoom(modifyMeetingRoom);
//        if (row > 0) {
//            return ResponseEntity.ok("Success");
//        } else {
//            return ResponseEntity.badRequest().body("Failed to modify meeting room");
//        }
//    }
	
	
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
