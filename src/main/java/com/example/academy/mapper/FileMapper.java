package com.example.academy.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.example.academy.vo.File;

@Mapper
public interface FileMapper {
	
	// 진수우 : 파일 저장.
	Integer insertFile(File file);
}
