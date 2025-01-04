package com.example.academy.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.example.academy.vo.Files;

@Mapper
public interface FilesMapper {
	
	// 진수우 : 파일 저장.
	Integer insertFile(Files files);
}
