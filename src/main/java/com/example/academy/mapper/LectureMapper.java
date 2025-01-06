package com.example.academy.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.academy.dto.LectureListDTO;
import com.example.academy.vo.Lecture;

@Mapper
public interface LectureMapper {
	
	// 김혜린 : 강의리스트 출력
	List<LectureListDTO> selectLectureList();

}
