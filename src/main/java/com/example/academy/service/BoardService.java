package com.example.academy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.academy.mapper.BoardMapper;
import com.example.academy.vo.Board;

@Service
@Transactional
public class BoardService {
	@Autowired BoardMapper boardMapper;
	
	// 공지사항 리스트 조회
	public List<Board> getBoardList() {
		return boardMapper.selectBoardList();
	}
	
}
