package com.example.academy.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example.academy.service.ChatService;
import com.example.academy.vo.chatRoom;

import lombok.extern.slf4j.Slf4j;



@Controller
@Slf4j
public class ChatRoomController {

    
    @Autowired
    private ChatService chatService;

    // 채팅방 목록 페이지 이동
    @GetMapping("/") // 루트 URL 접근 시 호출됨
    public String goChatRoom(Model model) {
        try {
            model.addAttribute("list", chatService.findAllRooms()); // 모든 채팅방 정보를 조회해 list 모델에 추가
        } catch (Exception e) {
            
            model.addAttribute("error", "Mapper is not initialized!"); // 예외 발생 메시지
        }
        return "chat"; // chat 뷰로 이동
    }

    // 채팅방 생성
    @PostMapping("/chat/createroom") // 채팅방 생성 요청 처리
    public String createRoom(@RequestParam String name, @RequestParam int memberId, RedirectAttributes rttr) {
        
    	Integer roomId = chatService.createChatRoom(name, memberId);
    	
        //chatService.createChatRoom(name,memberId); // 채팅방 생성 로직 호출
    	
        return "redirect:/"; 
    }

    // 채팅방 상세 조회
    @GetMapping("/chat/room") // 특정 채팅방 정보를 조회
    public String roomDetail(Model model, @RequestParam String roomId) { // @RequestParam String roomId : 요청 URL에서 roomId 값을 가져옴
        chatRoom room = chatService.findRoomById(roomId); // 채팅방을 찾고 모델에 추가
        if (room != null) {
            model.addAttribute("room", room);
        } else {
            model.addAttribute("error", "Room not found"); // 존재하지 않으면 "Room not found"
        }
        return "chatroom";
    }
    
   
    // 채팅방 수정 기능
    @PostMapping("/chat/modifyRoom")
    public String modifyRoom(@RequestParam String roomId, @RequestParam String roomName, RedirectAttributes rttr) {
        int row = chatService.chatModifyRoom(roomId, roomName);
        
        if (row > 0) {
            rttr.addFlashAttribute("message", "채팅방이 성공적으로 수정되었습니다.");
        } else {
            rttr.addFlashAttribute("error", "채팅방 수정에 실패했습니다.");
        }
        
        return "redirect:/chat/room?roomId=" + roomId;
    }
    
    
    // 채팅방 수정 페이지 이동
    @GetMapping("/chat/modifyRoom")
    public String showModifyRoomForm(@RequestParam String roomId, Model model) {
        chatRoom room = chatService.findRoomById(roomId);
        if (room != null) {
            model.addAttribute("room", room);
            return "modifyChatRoom"; 
        } else {
            return "redirect:/"; 
        }
    }
    
    // 사용자 접속 검증
    @PostMapping("/chat/connect") // 클라이언트가 채팅방 접속 전에 사용자 검증을 요청할 때 사용
    @ResponseBody
    public ResponseEntity<?> validateAndConnect(@RequestParam String username) {
        if (!chatService.isValidEmployeeName(username)) { // 주어진 username이 유효한 사용자 이름인지 검증하는 서비스 메서드 호출
            return ResponseEntity.status(HttpStatus.FORBIDDEN) // false반환 시, HTTP 상태 코드 403을 반환하고 오류 메시지를 전달
                    .body("Invalid username. Access denied.");
        }
        return ResponseEntity.ok("Valid username. Access granted."); // username이 유효한 경우, HTTP 상태 코드 200와 함께 성공 메시지를 응답
        // 클라이언트는 이 응답을 받아 정상적으로 채팅방에 입장할 수 있음
    }
    
    // 채팅방 입장 처리
    @PostMapping("/chat/enter") // 클라이언트가 채팅방에 입장하려는 요청을 보낼 때 이 엔드포인트가 호출됨
    public String enterUser(@RequestParam String roomId, @RequestParam String userName, RedirectAttributes rttr) { // RedirectAttributes rttr : 리다이렉트 시 , 속성을 임시 저장하여 전달할 수 있는 객체. 이를 통해 새로운 페이지에서 메시지나 데이터를 유지할 수 있음
    
        String uniqueName = chatService.isDuplicateName(roomId, userName); // 사용자가 입력한 닉네임이 방 안에서 중복되는지 확인, 중복된 경우, 새로운 유니크한 닉네임을 생성하여 반환 (John -> John(1));
      
        String userUUID = chatService.addUser(roomId, uniqueName); // 사용자를 해당 채팅방의 사용자 목록에 추가. userUUID는 서버에서 해당 사용자를 식별할 고유ID

        rttr.addFlashAttribute("userUUID", userUUID);
        rttr.addFlashAttribute("userName", uniqueName); 
        return "redirect:/chat/room?roomId=" + roomId;  // 채팅방 상세 페이지로 리다이렉트
    }
    /*
     * 1. 클라이언트가 roomId와 userName을 제출하면, 중복 여부를 확인한 후 고유 닉네임을 생성
     * 2. 사용자 정보를 채팅방에 추가하고, userUUID와 userName을 플래시 속성으로 저장
     * 3. 채팅방 상세 페이지로 리다이렉트하며, 이후 화면에서 해당 정보를 표시 가능
     * 4. 중복이름처리, 사용자 추가, 플래시 속성 관리 등이 주요 역할
     */

    // 채팅방 퇴장 처리
    @PostMapping("/chat/exit")  // 사용자가 채팅방에서 나갈 때 호출되는 엔드포인트
    public String exitUser(@RequestParam String roomId, @RequestParam String userUUID, RedirectAttributes rttr) {
      
    	chatService.delUser(roomId, userUUID); // 특정 채팅방에서 해당 사용자(식별자: userUUID)를 제거
    	// 채팅방의 사용자 목록에서 제거됨
    	// 1. roomId에 해당하는 채팅방 검색.
    	// 2. userUUID를 통해 사용자를 찾고 제거.
    	// 3. 방의 사용자 수 감소 처리 및 필요한 경우 알림 전송.
        return "redirect:/chat/room?roomId=" + roomId;  
        // 작업 완료 후, 해당 채팅방 페이지로 리다이렉트
        // 리다이렉트 후, 방 목록을 다시 불러오고 변경된 인원 수를 반영 가능
        // 클라이언트 관점에서 새로고침 없이 방 상태를 업데이트하려면, 웹소켓과 같은 실시간 알림이 필요
    }

    // 채팅방 삭제 처리
    @PostMapping("/chat/leave")  // 채팅방 삭제 요청을 처리하는 역할
    public String leaveRoom(@RequestParam String roomId, RedirectAttributes rttr) {
        
        int row = chatService.deleteRoom(roomId); // 서비스 계층을 호출하여 roomId에 해당하는 채팅방을 삭제 
        
        if (row > 0) {
            rttr.addFlashAttribute("message", "채팅방이 성공적으로 삭제되었습니다.");
        } else {
            rttr.addFlashAttribute("error", "채팅방 삭제에 실패했습니다.");
        }
        
        return "redirect:/";  
    }
    
    // 채팅방 참여 처리(AJAX)
    @PostMapping("/chat/join") // 클라이언트가 채팅방에 참가하려는 요청을 처리
    @ResponseBody
    public ResponseEntity<?> joinChat(@RequestParam String roomId, @RequestParam String username) {
        String result = chatService.joinChatRoom(roomId, username); // 서비스 계층을 호출하여 사용자가 특정 채팅방에 참가 가능한지 확인 및 처리

        if (result == null) {
            return ResponseEntity.badRequest().body("{\"error\": \"Invalid employee name or already in room.\"}");
        } // 응답상태 코드 400반환
        /*
         * 1. 참가 실패 원인 : 1. 존재하지 않은 사용자명. 2. 이미 채팅방에 참가한 사용자
         */

        // 성공 시
        Map<String, String> response = new HashMap<>(); // 응답 데이터를 Map<string, string> 객체에 저장
        response.put("userName", result); // userName키에 고유 사용자 이름(result)추가 
        return ResponseEntity.ok(response); // 응답 상태 코드 200ok와 함께 JSON 응답 반환.
    }
    // ResponseEntity<?> : HTTP 응답 상태 코드와 데이터를 함께 전달하는 데 사용.
    
}
