package com.example.academy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.academy.mapper.chatRoomMapper;
import com.example.academy.vo.chatMessage;
import com.example.academy.vo.chatRoom;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@Transactional
public class ChatService {

	@Autowired
	private chatRoomMapper chatRoomMapper;

	public List<chatRoom> findAllRooms() {
		return chatRoomMapper.findAllRooms();
	} // DB에서 모든 채팅방 정보를 조회하는 역할

	public chatRoom findRoomById(String roomId) {
		return chatRoomMapper.findRoomById(roomId);
	} // roomId를 파라미터로 받아 chatRoomMapper의 findRoomById메서드를 호출
	  /* 
	   * 1. 사용자가 특정 채팅방을 조회할 때, findRoomById(roomId) 메서드를 호출
	   * 2. SQL쿼리가 chatroom 테이블에서 해당 roomId의 정보를 검색
	   * 3. 최종적으로 서비스 계층에서 호출한 컨트롤러에게 해당 채팅방 정보를 제공
	   */
	
	// 채팅방 생성
	public Integer createChatRoom(String name, int memberId) {
	    chatRoom newRoom = new chatRoom();
	    newRoom.setRoomName(name);
	    newRoom.setRoomMemberId(memberId);

	    Integer result = chatRoomMapper.addChatRoom(newRoom);

	    if (result > 0) {
	        chatRoomMapper.addRoomMember(newRoom); // 생성자 추가
	        plusUserCnt(String.valueOf(newRoom.getRoomId())); // 사용자 수 증가
	    }

	    return result;
	}

	// 사용자 추가 메서드
	public void addUserToRoom(int roomId, int employeeNo) {
	    chatRoomMapper.addUserToRoom(String.valueOf(roomId), employeeNo);
	    plusUserCnt(String.valueOf(roomId));
	}


	public void plusUserCnt(String roomId) {
		chatRoomMapper.plusUserCnt(roomId);
	}

	public void minusUserCnt(String roomId) {
		chatRoomMapper.minusUserCnt(roomId);
	}

	public String addUser(String roomId, String userName) {
		return userName;
	}

	// 채팅방 내 사용자 이름의 중복 여부를 확인하고, 중복이 있을 경우 고유한 이름을 생성하는 기능을 수행한다.
	// 클라이언트가 특정 사용자 이름으로 방에 참여하려고 할 때 메서드를 호출
	public String isDuplicateName(String roomId, String username) {
		List<String> members = chatRoomMapper.getRoomMembers(roomId); // 특정 roomId에 속한 사용자 목록을 가져옴.
		String tmp = username;
		int count = 1;
		while (members.contains(tmp)) {
			tmp = username + (count++);
		}
		return tmp;
	} 

	public void delUser(String roomId, String userUUID) {
		chatRoomMapper.minusUserCnt(roomId);

	}

	// 특정 채팅방(roomId)에서 특정 직원(employeeNo)의 이름을 조회하는 기능을 수행한다.
	public String getUserName(String roomId, String employeeNo) {
		return chatRoomMapper.getUserNameByEmployeeNo(roomId, employeeNo);
	}

	public List<String> getUserList(String roomId) {
		return chatRoomMapper.getRoomMembers(roomId);
	}

	// 채팅방 삭제
	public int deleteRoom(String roomId) {
		return chatRoomMapper.deleteRoom(roomId);
	}

	public int chatModifyRoom(String roomId, String roomName) {
		return chatRoomMapper.chatModifyRoom(roomId, roomName);
	}

	// 특정 직원 이름(employeeName)이 employee테이블에 존재하는지 여부를 확인하는 기능
	public boolean isValidEmployeeName(String employeeName) {
		return chatRoomMapper.isValidEmployeeName(employeeName) > 0;
	}

	
	// 특정 employeeName을 받아 해당 직원이 특정roomId에 참여할 수 있도록 처리하는 것
	public String joinChatRoom(String roomId, String employeeName) {

		if (!isValidEmployeeName(employeeName)) {
			return null;
		} // 직원이 DB에 존재하는 지 확인

		Integer employeeNo = chatRoomMapper.getEmployeeNoByName(employeeName); // 직원의 고유번호(employee_no)조회

		if (isUserAlreadyInRoom(roomId, employeeNo)) {
			return null;
		} // 직원이 해당 채팅방에 이미 참석했는지 확인

		chatRoomMapper.addUserToRoom(roomId, employeeNo); // roommember테이블에 참여 기록 추가

		return employeeName;
	}

	// 직원이름을 받아서 DB에 직원번호를 조회해서 반환
	public Integer getEmployeeNoByName(String employeeName) {
		return chatRoomMapper.getEmployeeNoByName(employeeName);
	}

	// 특정 사용자가 지정된 채팅방에 이미 속해 있는지 확인하는 역할
	public boolean isUserAlreadyInRoom(String roomId, Integer employeeNo) {
		return chatRoomMapper.isUserInRoom2(roomId, employeeNo) > 0;
	}

	// 채팅 메시지를 특정 채팅방에 저장하는 기능을 제공
	public void saveChatMessage(String roomId, String employeeName, String content) {
		Integer employeeNo = getEmployeeNoByName(employeeName); // 직원 번호를 조회
		if (employeeNo != null) {
			chatRoomMapper.insertChatMessage(roomId, employeeNo, content); // null이 아니면 메시지를 DB에 저장
		} else {
			throw new RuntimeException("Employee not found: " + employeeName);
		}
	}

	// 특정 채팅방의 메시지 기록을 조회하는 기능
	public List<chatMessage> getChatHistory(String roomId) {
		return chatRoomMapper.getChatHistory(roomId);
	}

	public void leaveRoom(String roomId, String username) {
		Integer employeeNo = chatRoomMapper.getEmployeeNoByName(username);
		if (employeeNo != null) {
			chatRoomMapper.removeUserFromRoom(roomId, employeeNo); // 해당 사용자가 특정 채팅방에서 제거되도록 한다.
			minusUserCnt(roomId); // 사용자 수 감소
		} else {
			throw new RuntimeException("Employee not found: " + username);
		}
	}
	
	

}
