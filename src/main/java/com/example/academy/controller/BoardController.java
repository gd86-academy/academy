package com.example.academy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.example.academy.service.BoardService;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;

@Slf4j
@Controller
public class BoardController {
	@Autowired BoardService boardService;
	
	// 공지사항 추가
	@GetMapping("/addBoard")
	public String addBoard() {
		return "addBoard";
	}
	
	// 상세공지사항 조회
	@GetMapping("/boardOne")
	public String boardOne() {
		return "boardOne";
	}
	
	// 공지사항 리스트 조회
	@GetMapping("/boardList")
	public String boardList() {
		return "boardList";
	}
	
}
