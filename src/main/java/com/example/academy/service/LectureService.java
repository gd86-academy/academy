package com.example.academy.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.academy.dto.LectureListDTO;
import com.example.academy.dto.LectureModifyDTO;
import com.example.academy.dto.LectureOneDTO;
import com.example.academy.dto.LectureOneTimeListDTO;
import com.example.academy.mapper.LectureLectureWeekdayMapper;
import com.example.academy.mapper.LectureMapper;
import com.example.academy.mapper.LectureWeekdayMapper;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@Transactional
public class LectureService {
	@Autowired LectureMapper lectureMapper;
	@Autowired LectureWeekdayMapper lectureWeekdayMapper;
	@Autowired LectureLectureWeekdayMapper lectureLectureWeekdayMapper;
	
	// 김혜린 : 강의 삭제
	public void removeLecture(Integer lectureNo) {
		// 1) 강의-강의시간 데이터 삭제
		lectureLectureWeekdayMapper.deleteLectureLectureWeekday(lectureNo);
		// 2) 강의 삭제
		lectureMapper.deleteLecture(lectureNo);
	}	
	
	// 김혜린 : 강의 수정
	public void modifyLecture(LectureModifyDTO lectureModifyDTO, List<String> list) {
		
		int index=0;
		List<LectureOneTimeListDTO> timeList = new ArrayList<>();
		
		for(int i=0; i<list.size()/4; i++) {
			LectureOneTimeListDTO time = new LectureOneTimeListDTO();	//객체
			time.setLectureWeekdayNo(Integer.parseInt(list.get(index)));
			index++;
			time.setWeekdayCode(list.get(index));
			index++;
			time.setBeginTimeCode(list.get(index));
			index++;
			time.setEndTimeCode(list.get(index));
			index++;
			timeList.add(time);
		}
		log.debug("timeList" +timeList);
		
		// 강의 요일, 시간 수정
		for (LectureOneTimeListDTO lectureOneTimeListDTO : timeList) {
			lectureWeekdayMapper.updateLectureWeekday(lectureOneTimeListDTO);
		}
		
		// 강의날짜(개강/종강일), 강의명, 강의내용 수정
		lectureMapper.updateLecture(lectureModifyDTO);
		
		
	}
	
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
