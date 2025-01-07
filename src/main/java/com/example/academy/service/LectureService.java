package com.example.academy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.academy.dto.LectureListDTO;
import com.example.academy.dto.LectureOneDTO;
import com.example.academy.dto.LectureOneTimeListDTO;
import com.example.academy.mapper.LectureMapper;

@Service
@Transactional
public class LectureService {
	@Autowired LectureMapper lectureMapper;
	
	
	// 김혜린 : 강의 상세페이지 / 강의수정 기존정보불러오기
	public LectureOneDTO getLectureOne(Integer lectureNo) {
		LectureOneDTO lectureOne = lectureMapper.selectLectureOne(lectureNo);
		
		return lectureOne;		
	}
	
	// 김혜린 : 강의 상세페이지 - 강의 시간 리스트 출력
	public List<LectureOneTimeListDTO> getLectureOneTimeList(Integer lectureNo) {
		List<LectureOneTimeListDTO> lectureOneTimeList = lectureMapper.selectLectureOneTimeList(lectureNo);
		
		return lectureOneTimeList;
	}
	
	// 김혜린 : 강의 리스트 출력
	public List<LectureListDTO> getLectureList() {
		List<LectureListDTO> lectureList = lectureMapper.selectLectureList();
		
		return lectureList;
	}


}
