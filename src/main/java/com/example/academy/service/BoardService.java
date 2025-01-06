package com.example.academy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.academy.dto.BoardListDTO;
import com.example.academy.mapper.BoardMapper;

@Service
@Transactional
public class BoardService {
	@Autowired BoardMapper boardMapper;
	
	// 공지사항 리스트 조회
	public List<BoardListDTO> getBoardList() {
		List<BoardListDTO> boardList = boardMapper.selectBoardList();
		for(BoardListDTO board : boardList) {
			board.setUpdateDate(board.getUpdateDate().substring(0, 10));
		}
		
		return boardList;
	}
	
}
