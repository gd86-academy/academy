package com.example.academy.restcontroller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.example.academy.dto.BoardListDTO;
import com.example.academy.service.BoardService;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class BoardRestController {
	@Autowired BoardService boardService;
	
	@GetMapping("/restapi/boardList")
	public List<Object[]> boardList() {
		List<BoardListDTO> boardsList = boardService.getBoardList();
		List<Object[]> result = new ArrayList<>();
		for(BoardListDTO boardList : boardsList) {
			result.add(boardList.toArray());
		}
		return result;
	}
}
