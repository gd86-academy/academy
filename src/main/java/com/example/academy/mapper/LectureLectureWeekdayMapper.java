package com.example.academy.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LectureLectureWeekdayMapper {
	
	// 김혜린 : 강의 삭제(강의-강의시간 삭제)
	Integer deleteLectureLectureWeekday(Integer lectureNo);

}
