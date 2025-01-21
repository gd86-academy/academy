package com.example.academy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.academy.dto.ChatDTO;
import com.example.academy.service.ChatService;
import com.example.academy.vo.chatMessage;





@Controller
public class ChatController {
    @Autowired
    private SimpMessageSendingOperations messagingTemplate; 
    //WebSocket을 통해 메시지를 전송하기 위한 객체, convertAndSend()메서드를 사용해 특정 대상에게 메시지를 전송함

    @Autowired
    private ChatService chatService; 

    // 사용자 입장 처리
    @MessageMapping("/chat/enterUser")  // 클라이언트가 /chat/enterUser 경로로 WebSocket 메시지를 보낼 때 호출됨
    public void enterUser(@Payload ChatDTO chat, SimpMessageHeaderAccessor headerAccessor) {
    // 	@Payload ChatDTO chat : WebSocket메시지에서 chatDTO데이터를 가져옴
    	chatService.plusUserCnt(chat.getRoomId()); 
        String userUUID = chatService.addUser(chat.getRoomId(), chat.getSender());
        

        headerAccessor.getSessionAttributes().put("userUUID", userUUID);
        headerAccessor.getSessionAttributes().put("roomId", chat.getRoomId());
        // WebSocket세션에 사용자 UUID와 채팅방 ID 저장
       
        
        chat.setType(ChatDTO.MessageType.ENTER);
        chat.setMessage(chat.getSender() + "님이 입장하셨습니다."); 
        // 메시지 타입을 ENTER로 설정한 후, convertAndSend()를 통해 /sub/chat/room/{roomId}채널로 입장 메시지를 전송
        messagingTemplate.convertAndSend("/sub/chat/room/" + chat.getRoomId(), chat);
        /*
         * 작동 흐름 : 1. 사용자가 채팅방에 입장 요청을 보냄
         * 			2. 사용자가 채팅방에 추가되고 인원수가 증가함
         * 			3. 입장 메시지를 모든 클라이언트에게 전송
         */
    }
    
    // 메시지 전송 처리
    @MessageMapping("/chat/sendMessage") // /chat/sendMessage 경로에서 메시지 전송 요청을 받음
    public void sendMessage(@Payload ChatDTO chat) {
        chat.setType(ChatDTO.MessageType.TALK); // 메시지 타입을 TALK로 설정
        chatService.saveChatMessage(chat.getRoomId(), chat.getSender(), chat.getMessage());
        // 메시지를 저장
        messagingTemplate.convertAndSend("/sub/chat/room/" + chat.getRoomId(), chat);
        // 모든 구독자에게 메시지를 전송
    }
    
    // 채팅 기록 조회
    @GetMapping("/chat/history")
    @ResponseBody
    public List<chatMessage> getChatHistory(@RequestParam String roomId) {
        return chatService.getChatHistory(roomId); // 해당 채팅방의 이전 채팅 메시지를 조회하여 반환
    }

    // 사용자 퇴장 처리
    @MessageMapping("/chat/leaveUser") // /chat/leaveUser 경로에서 퇴장 메시지 처리
    public void leaveUser(@Payload ChatDTO chat, SimpMessageHeaderAccessor headerAccessor) {
        String roomId = chat.getRoomId();
        String username = chat.getSender();
        
        chatService.leaveRoom(roomId, username); // 사용자 목록에서 삭제
        
        chat.setType(ChatDTO.MessageType.LEAVE); // 메시지 타입을 LEAVE로 설정하고 퇴장 메시지를 생성
        chat.setMessage(username + " 님이 나가셨습니다.");
        messagingTemplate.convertAndSend("/sub/chat/room/" + roomId, chat); // 모든 구독자에게 퇴장 알림을 전송
    }
    
    /*
     * 개선할 수 있는 부분:

        예외 처리 추가 (사용자가 존재하지 않을 경우 대응).
		성능 최적화를 위해 메시지 저장 시 비동기 처리 고려.
		보안 강화를 위해 사용자 검증 로직 추가.
     */

}
