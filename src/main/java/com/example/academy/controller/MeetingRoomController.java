package com.example.academy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.academy.service.MeetingRoomService;
import com.example.academy.vo.MeetingRoom;

@Controller
public class MeetingRoomController {
	
	
	// 하상우 ) 회의실 목록 조회
	@GetMapping("/meetingRoomList")
	public String meetingRoomList(Model model) {
			
		return "meetingRoom";
	}

}
