package com.example.academy.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.academy.dto.MeetingRoomListDTO;


@Mapper
public interface MeetingRoomMapper {
	
	List<MeetingRoomListDTO> getMeetingRoomList();

}
