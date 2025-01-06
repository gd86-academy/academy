package com.example.academy.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.academy.dto.BoardListDTO;

@Mapper
public interface BoardMapper {
	
	// 공지사항 리스트 조회
	List<BoardListDTO> selectBoardList();
	
}
