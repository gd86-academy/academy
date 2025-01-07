package com.example.academy.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.example.academy.vo.BoardFile;

@Mapper
public interface BoardFileMapper {

	Integer insertBoardFile(BoardFile boardFile);
	
}
