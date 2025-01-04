package com.example.academy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import com.example.academy.service.BoardService;
import com.example.academy.vo.Board;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;

@Slf4j
@Controller
public class BoardController {
	@Autowired BoardService boardService;
	
	// 공지사항 리스트 조회
	@GetMapping("/boardList")
	public String boardList(Model model) {
		
		List<Board> boardList = boardService.getBoardList();
		
		model.addAttribute("boardList", boardList);
		
		return "boardList";
	}
	
}
