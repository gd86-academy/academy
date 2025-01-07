package com.example.academy.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.academy.dto.ClassroomListDTO;

@Mapper
public interface ClassroomMapper {
	// 박시현 : 강의실 등록 
	Integer insertClassroom(ClassroomListDTO classroomListDTO);
	
	// 박시현 : 강의실리스트 출력
	List<ClassroomListDTO> selectClassroomList();
}
