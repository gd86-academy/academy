package com.example.academy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.academy.dto.ClassroomListDTO;
import com.example.academy.mapper.ClassroomMapper;

@Service
public class ClassroomService {
	@Autowired ClassroomMapper classroomMapper;
	
	public List<ClassroomListDTO> getClassroomList() {
		return classroomMapper.selectClassroomList();
	}
}
