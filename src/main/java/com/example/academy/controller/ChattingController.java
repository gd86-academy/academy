package com.example.academy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.academy.dto.chattingMessageDTO;
import com.example.academy.security.CustomUserDetails;
import com.example.academy.service.ChatService;
import com.example.academy.service.ChattingService;


@RestController
public class ChattingController {
	
	@Autowired
	
	private ChattingService chattingService;
	
	
	@PostMapping("/chat/updateUseYn")
	public ResponseEntity<String> updateUseYn(@RequestParam String fromUserName, @RequestParam String toUserName) {
		chattingService.updateUseYn(fromUserName, toUserName);
	    return ResponseEntity.ok("Updated successfully");
	}
	
	@GetMapping("/chat/unreadCount")
	public ResponseEntity<Integer> getUnreadMessageCount(
	        @RequestParam String fromUserName, 
	        @RequestParam String toUserName) {

	    int unreadCount = chattingService.countUnreadMessages(fromUserName, toUserName);
	    return ResponseEntity.ok(unreadCount);
	}
	
	
	// 로그인한 사용자의 직원정보 가져오기
	@GetMapping("/chat/fromUserId")
	public String fromUserId(Model model) {
	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    String userName = "";
	    
	    if (authentication != null && authentication.isAuthenticated() && !(authentication instanceof AnonymousAuthenticationToken)) {
	        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
	     userName = userDetails.getUserRealName(); // Logged-in user's ID  
	    }

	    return userName;
	}
	
	@PostMapping("/chat/send")
	public ResponseEntity<?> sendMessage(@RequestBody chattingMessageDTO message){
		
		chattingService.sendMessage(message);
		return ResponseEntity.ok().build();
	}
	
	@GetMapping("/chat/messages")
	public List<chattingMessageDTO> getMessages(@RequestParam String fromUserName, 
	                                            @RequestParam String toUserName) {
	    
	    return chattingService.getMessages(fromUserName, toUserName);
	}

    

}
