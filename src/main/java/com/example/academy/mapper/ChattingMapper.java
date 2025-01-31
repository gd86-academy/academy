package com.example.academy.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.academy.dto.chattingMessageDTO;

@Mapper
public interface ChattingMapper {
	
	void updateUseYn(@Param("fromUserName") String fromUserName, @Param("toUserName") String toUserName);
	
	// 읽지 않은 메시지 개수 조회
    int countUnreadMessages(@Param("fromUserName") String fromUserName, 
                            @Param("toUserName") String toUserName);
	
	void insertMessage(chattingMessageDTO message);
	
	List<chattingMessageDTO> getMessages(@Param("fromUserName") String fromUserName, 
            @Param("toUserName") String toUserName);
}
