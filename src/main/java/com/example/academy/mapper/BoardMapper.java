package com.example.academy.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.academy.dto.BoardDTO;
import com.example.academy.dto.BoardListDTO;

@Mapper
public interface BoardMapper {
	
	// 조회수 수정
	Integer updateBoardCount(Integer boardNo);
	
	// 공지사항 수정
	Integer updateBoard(BoardDTO boardDTO);
	
	// 공지사항 삭제
	Integer deleteBoard(Integer boardNo);
	
	// 공지사항 추가
	Integer insertBoard(BoardDTO boardDTO); 
	
	// 상세 공지사항 조회
	BoardDTO selectBoardOne(Integer boardNo);
	
	// 공지사항 리스트 조회
	List<BoardListDTO> selectBoardList();
	
}
