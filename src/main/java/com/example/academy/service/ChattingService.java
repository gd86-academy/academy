package com.example.academy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.academy.dto.chattingMessageDTO;
import com.example.academy.mapper.ChattingMapper;

@Service
@Transactional
public class ChattingService {
	
	@Autowired
	private ChattingMapper chattingMapper;
	
	public void sendMessage(chattingMessageDTO message) {
		chattingMapper.insertMessage(message);
	}
	
	public List<chattingMessageDTO> getMessages(String fromUserName, String toUserName){
		return chattingMapper.getMessages(fromUserName,toUserName);
	}

}
