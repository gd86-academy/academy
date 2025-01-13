package com.example.academy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.academy.dto.ClassroomListDTO;
import com.example.academy.mapper.ClassroomMapper;

@Service
public class ClassroomService {
	@Autowired ClassroomMapper classroomMapper;
	
	// 박시현 : 강의실 삭제
	public Integer removeClassroom(Integer classroomNo) {
		return classroomMapper.deleteClassroom(classroomNo);
	}
	
	// 박시현 : 강의실번호 별 상세정보
	public ClassroomListDTO getClassroomOne(Integer classroomNo) {
		return classroomMapper.classroomOne(classroomNo);
	}
	
	// 박시현 : 강의실 수정
	public Integer modifyClassroom(ClassroomListDTO classroomListDTO) {
		return classroomMapper.updateClassroom(classroomListDTO);
	}
	
	// 박시현 : 강의실 등록
	public Integer addClassroom(ClassroomListDTO classroomListDTO) {
		return classroomMapper.insertClassroom(classroomListDTO);
	}
	
	// 박시현 : 강의실리스트 조회
	public List<ClassroomListDTO> getClassroomList() {
		List<ClassroomListDTO> result = classroomMapper.selectClassroomList();
		return result;
	}
}
