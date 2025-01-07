package com.example.academy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.academy.dto.MeetingRoomAddDTO;
import com.example.academy.dto.MeetingRoomListDTO;
import com.example.academy.mapper.MeetingRoomMapper;


@Service
@Transactional
public class MeetingRoomService {
	
	@Autowired
	public MeetingRoomMapper meetingRoomMapper;
	
	//하상우) 회의실 수정
	public Integer modifyMeetingRoom(MeetingRoomListDTO modifymeetingroom) {
		return meetingRoomMapper.modifyMeetingRoom(modifymeetingroom);
	}
	
	
	// 하상우 ) 회의실 삭제
	public Integer deleteMeetingRoom(Integer meetingroomNo) {
		return meetingRoomMapper.deleteMeetingRoom(meetingroomNo);
	}
	
	// 하상우) 회의실 추가
	
	public Integer addMeetingRoom(MeetingRoomAddDTO meetingroomaddDTO) {
		return meetingRoomMapper.addMeetingRoom(meetingroomaddDTO);
	}
	
	
	// 하상우) 회의실 리스트
	public List<MeetingRoomListDTO> getMeetingRoomList(){
		return meetingRoomMapper.getMeetingRoomList();
	}

}
