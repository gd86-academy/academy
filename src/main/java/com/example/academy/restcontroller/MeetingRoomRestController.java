package com.example.academy.restcontroller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.academy.dto.MeetingRoomListDTO;
import com.example.academy.service.MeetingRoomService;

@RestController
public class MeetingRoomRestController {
	
	
@Autowired MeetingRoomService meetingroomservice;
	
	// 하상우 : 회의실목록 출력
	@GetMapping("/restapi/MeetingRoomList")
    public List<Object[]> classroomList() {
        List<MeetingRoomListDTO> meetingroom = meetingroomservice.getMeetingRoomList();
        List<Object[]> result = new ArrayList<>();
        for (MeetingRoomListDTO meetingRoomList : meetingroom) {
            result.add(meetingRoomList.toArray()); 
        }
        return result;
    }
}
