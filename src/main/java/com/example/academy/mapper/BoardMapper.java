package com.example.academy.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.academy.dto.BoardDTO;
import com.example.academy.dto.BoardListByMainDTO;
import com.example.academy.dto.BoardListDTO;

@Mapper
public interface BoardMapper {
	
	// 메인페이지에 최신 공지사항 3개 조회
	List<BoardListByMainDTO> selectBoardListByMain();
	
	// 공지사항 삭제 버튼 클릭 시 yn 수정
	Integer updateBoardYN(Integer boardNo);
	
	// 조회수 수정
	Integer updateBoardCount(Integer boardNo);
	
	// 공지사항 수정
	Integer updateBoard(BoardDTO boardDTO);
	
	// 공지사항 추가
	Integer insertBoard(BoardDTO boardDTO); 
	
	// 상세 공지사항 조회
	BoardDTO selectBoardOne(Integer boardNo);
	
	// 공지사항 리스트 조회
	List<BoardListDTO> selectBoardList();
	
}
