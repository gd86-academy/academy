package com.example.academy.dto;

import java.util.HashMap;
import java.util.UUID;

import lombok.Data;

// 이 클래스는 채팅바으이 데이터를 캡슐화하여 관리한다.
// 1. 새로운 채팅방을 생성할 때  : create(roomName) 메서드 호출
// 2. 채팅방의 사용자 수를 관리할 때 : userCount필드
// 3. 채팅방에 참여 중인 사용자 정보 관리 : userlist 필드로 사용자 추가/삭제.

@Data
public class ChatRoom {
    private String roomId; // 채팅방 아이디
    private String roomName; // 채팅방 이름 
    private long userCount; // 채팅방 인원수

    private HashMap<String, String> userlist = new HashMap<String, String>();
    // 채팅방에 참여 중인 사용자 리스트를 관리한다.
    // 키 - 사용자 UUID(유일한 식별자) , 값 - 사용자 이름
    // 새로운 사용자가 들어오면 추가하고, 퇴장하면 삭제한다.
    
    public ChatRoom create(String roomName){ // 새로운 ChatRoom 객체를 생성하는 메서드이다.
    	// roomName을 입력받아 객체를 초기화하고, 고유 ID를 생성한다.
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.roomId = UUID.randomUUID().toString(); // roomId를 UUID를 사용하여 고유하게 생성
        chatRoom.roomName = roomName; // 입력받은 roomName으로 채팅방 이름 설정

        return chatRoom; // 완성된 ChatRoom 객체 반환
    }

}
