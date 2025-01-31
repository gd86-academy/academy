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
	
	public void updateUseYn(String fromUserName, String toUserName) {
	    // use_yn을 0으로 업데이트하는 쿼리 실행
		chattingMapper.updateUseYn(fromUserName, toUserName);
	}
	
	// 읽지 않은 메시지 개수 조회
    public int countUnreadMessages(String fromUserName, String toUserName) {
        return chattingMapper.countUnreadMessages(fromUserName, toUserName);
    }
	
	public void sendMessage(chattingMessageDTO message) {
		chattingMapper.insertMessage(message);
	}
	
	public List<chattingMessageDTO> getMessages(String fromUserName, String toUserName){
		return chattingMapper.getMessages(fromUserName,toUserName);
	}

}
