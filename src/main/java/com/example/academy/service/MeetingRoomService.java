package com.example.academy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.academy.dto.MeetingRoomListDTO;
import com.example.academy.mapper.MeetingRoomMapper;


@Service
@Transactional
public class MeetingRoomService {
	
	@Autowired
	
	public MeetingRoomMapper meetingRoomMapper;
	
	public List<MeetingRoomListDTO> getMeetingRoomList(){
		return meetingRoomMapper.getMeetingRoomList();
	}

}
