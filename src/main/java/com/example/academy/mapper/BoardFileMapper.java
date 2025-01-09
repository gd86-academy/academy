package com.example.academy.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.academy.dto.BoardFileDTO;
import com.example.academy.vo.BoardFile;

@Mapper
public interface BoardFileMapper {

	// boardNo에 해당하는 게시판 파일 리스트 조회
	List<BoardFileDTO> selectBoardFileList(Integer boardNo);
	
	// 게시판파일 추가
	Integer insertBoardFile(BoardFile boardFile);
	
}
