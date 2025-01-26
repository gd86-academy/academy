package com.example.academy.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.academy.dto.chattingMessageDTO;

@Mapper
public interface ChattingMapper {
	
	void insertMessage(chattingMessageDTO message);
	
	List<chattingMessageDTO> getMessages(String fromUserName, String toUserName);

}
