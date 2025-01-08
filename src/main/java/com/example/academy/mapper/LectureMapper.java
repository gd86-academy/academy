package com.example.academy.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.academy.dto.LectureListDTO;
import com.example.academy.dto.LectureModifyDTO;
import com.example.academy.dto.LectureOneDTO;
import com.example.academy.dto.LectureOneTimeListDTO;

@Mapper
public interface LectureMapper {
	
	// 김혜린 : 강의 수정(강의날짜(개강/종강일), 강의명, 강의내용)
	Integer updateLecture(LectureModifyDTO lectureModifyDTO);
	
	// 김혜린 : 강의 상세페이지 / 강의수정 기존정보불러오기 
	LectureOneDTO selectLectureOne(Integer lectureNo);
	
	// 김혜린 : 강의 상세페이지 / 강의수정 기존정보불러오기 - 강의 시간 리스트 출력
	List<LectureOneTimeListDTO> selectLectureOneTimeList(Integer lectureNo);
	
	// 김혜린 : 강의리스트 출력
	List<LectureListDTO> selectLectureList();

}
