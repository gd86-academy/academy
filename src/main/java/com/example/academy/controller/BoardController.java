package com.example.academy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import com.example.academy.dto.BoardDTO;
import com.example.academy.security.CustomUserDetails;
import com.example.academy.service.BoardService;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Slf4j
@Controller
public class BoardController {
	@Autowired BoardService boardService;
	
	// 공지사항 추가 실행
	@PostMapping("/addBoard")
	public String addBoard(BoardDTO boardDTO) {
		
		// log.debug("---------------------------------------" + boardDTO);
		
		//boardService.addBoard(boardDTO);
		
		return "redirect:/boardList";	
	}
	
	// 공지사항 추가 폼 호출
	@GetMapping("/addBoard")
	public String addBoard(Model model) {
		
		// 스프링시큐리티에서 계정정보 가져오기.
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		// 로그인 상태일 때만 model에 정보담기.
	    if (authentication != null && authentication.isAuthenticated() && !(authentication instanceof AnonymousAuthenticationToken)) {
	        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
	    
	        model.addAttribute("employeeNo", Integer.parseInt(userDetails.getUsername()));
	    }
	 
		return "addBoard";
	}
	
	// 상세 공지사항 조회
	@GetMapping("/boardOne")
	public String boardOne(Model model, Integer boardNo) {
	
		// 상세 공지사항 정보 조회
		BoardDTO boardOne = boardService.boardOne(boardNo);
		
		// 모델에 정보 담기
		model.addAttribute("boardOne", boardOne);
		
		return "boardOne";
	}
	
	// 공지사항 리스트 조회
	@GetMapping("/boardList")
	public String boardList() {
		return "boardList";
	}
	
}
