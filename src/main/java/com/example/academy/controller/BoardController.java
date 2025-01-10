package com.example.academy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import com.example.academy.dto.BoardDTO;
import com.example.academy.dto.BoardFileDTO;
import com.example.academy.security.CustomUserDetails;
import com.example.academy.service.BoardFileService;
import com.example.academy.service.BoardService;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Slf4j
@Controller
public class BoardController {
	@Autowired BoardService boardService;
	@Autowired BoardFileService boardFileService;
	
	@GetMapping("/sample")
	public String sample() {
		return "sample";
	}
	
	// 공지사항yn 수정
	@GetMapping("/deleteBoard")
	public String modifyBoardYN(Integer boardNo) {
		
		Integer updateRow = boardService.updateBoardYN(boardNo);
		log.debug("updateRow --------------------> " + updateRow);
		
		return "boardList";
	}
	
	// 공지사항 수정
	@PostMapping("/modifyBoard")
	public String modifyBoard(@ModelAttribute BoardDTO boardDTO) {
		
		log.debug("---------------------------------------" + boardDTO);
		
		boardService.updateBoard(boardDTO);
		
		return "redirect:/boardOne?boardNo=" + boardDTO.getBoardNo();
	}
	
	// 공지사항 수정 폼 호출
 	@GetMapping("/modifyBoard")
	public String modifyBoard(Model model, Integer boardNo) {
		
 		log.debug("boardNo -------> " + boardNo);
 		
 		// 스프링시큐리티에서 계정정보 가져오기.
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		// 로그인 상태일 때만 model에 정보담기.
	    if (authentication != null && authentication.isAuthenticated() && !(authentication instanceof AnonymousAuthenticationToken)) {
	        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
	    
	        model.addAttribute("employeeNo", Integer.parseInt(userDetails.getUsername()));
	        model.addAttribute("userName", userDetails.getUserRealName());
	        model.addAttribute("userMail", userDetails.getUserMail());
	        model.addAttribute("userPhotoFileName", userDetails.getUserPhotoFileName());
	        model.addAttribute("userPhotoFileExt", userDetails.getUserPhotoFileExt());
	    }
 		
		// 상세 공지사항 정보 조회
		BoardDTO boardOne = boardService.boardOne(boardNo);
		List<BoardFileDTO> boardFileList = boardFileService.getBoardFileList(boardNo);
		
		// 모델에 정보 담기
		model.addAttribute("boardOne", boardOne);
		model.addAttribute("boardFileList", boardFileList);
		
		return "modifyBoard";
	}
	
	// 공지사항 추가
	@PostMapping("/addBoard")
	public String addBoard(@ModelAttribute BoardDTO boardDTO) {
		
		log.debug("---------------------------------------" + boardDTO);
		
		boardService.addBoard(boardDTO);
		
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
	        model.addAttribute("userName", userDetails.getUserRealName());
	        model.addAttribute("userMail", userDetails.getUserMail());
	        model.addAttribute("userPhotoFileName", userDetails.getUserPhotoFileName());
	        model.addAttribute("userPhotoFileExt", userDetails.getUserPhotoFileExt());
	    }
	 
		return "addBoard";
	}
	
	// 상세 공지사항 조회
	@GetMapping("/boardOne")
	public String boardOne(Model model, Integer boardNo) {
		
		// 스프링시큐리티에서 계정정보 가져오기.
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		// 로그인 상태일 때만 model에 정보담기.
	    if (authentication != null && authentication.isAuthenticated() && !(authentication instanceof AnonymousAuthenticationToken)) {
	        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
	        model.addAttribute("userNo", userDetails.getUsername());
	        model.addAttribute("userName", userDetails.getUserRealName());
	        model.addAttribute("userPhotoFileName", userDetails.getUserPhotoFileName());
	        model.addAttribute("userPhotoFileExt", userDetails.getUserPhotoFileExt());
	        model.addAttribute("userDepartment", userDetails.getUserDepartment());
	        log.debug("userDepartment ---->"  + userDetails.getUserDepartment());
	    }
	    
		// boardNo에 해당하는 상세 공지사항 정보 조회
		BoardDTO boardOne = boardService.boardOne(boardNo);
		log.debug("boardOne ----> " + boardOne);
		
		// boardNo에 해당하는 공지사항의 파일 리스트 조회
		List<BoardFileDTO> boardFileList = boardFileService.getBoardFileList(boardNo); 		
		log.debug("boardFileList ----> " + boardFileList);
		
		// 모델에 정보 담기
		model.addAttribute("boardOne", boardOne);
		model.addAttribute("boardFileList", boardFileList);
		
		return "boardOne";
	}
	
	// 공지사항 리스트 조회
	@GetMapping("/boardList")
	public String boardList(Model model) {
		
		// 스프링시큐리티에서 계정정보 가져오기.
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		// 로그인 상태일 때만 model에 정보담기.
	    if (authentication != null && authentication.isAuthenticated() && !(authentication instanceof AnonymousAuthenticationToken)) {
	        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
	    
	        model.addAttribute("employeeNo", Integer.parseInt(userDetails.getUsername()));
	        model.addAttribute("userName", userDetails.getUserRealName());
	        model.addAttribute("userMail", userDetails.getUserMail());
	        model.addAttribute("userPhotoFileName", userDetails.getUserPhotoFileName());
	        model.addAttribute("userPhotoFileExt", userDetails.getUserPhotoFileExt());
	    }
		
		return "boardList";
	}
	
}
