package com.example.academy.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.academy.vo.chatMessage;
import com.example.academy.vo.chatRoom;


@Mapper
public interface chatRoomMapper {

	Integer addChatRoom(chatRoom chatRoom);

	Integer addRoomMember(chatRoom chatRoom);

	List<chatRoom> findAllRooms();

	chatRoom findRoomById(String roomId);

	Integer deleteRoom(String roomId);

	Integer chatModifyRoom(@Param("roomId") String roomId, @Param("roomName") String roomName);

	String addMember(String username);

	String getUserNameByEmployeeNo(@Param("roomId") String roomId, @Param("employeeNo") String employeeNo);

	int plusUserCnt(String roomId);

	int minusUserCnt(String roomId);

	List<String> getRoomMembers(String roomId);

	int isValidEmployeeName(String employeeName);

	Integer getEmployeeNoByName(@Param("employeeName") String employeeName);

	int isUserInRoom2(@Param("roomId") String roomId, @Param("employeeNo") int employeeNo);

	void addUserToRoom(@Param("roomId") String roomId, @Param("employeeNo") int employeeNo);

	void insertChatMessage(@Param("roomId") String roomId, @Param("employeeNo") int employeeNo,
			@Param("content") String content);

	List<chatMessage> getChatHistory(@Param("roomId") String roomId);

	void removeUserFromRoom(@Param("roomId") String roomId, @Param("employeeNo") int employeeNo);
	
	
	
}
