package com.example.academy.restcontroller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.academy.dto.ClassroomListDTO;
import com.example.academy.service.ClassroomService;

@RestController
public class ClassroomRestController {
	@Autowired ClassroomService classroomService;
	
	// 박시현 : 강의실목록 출력
	@GetMapping("/restapi/classroomList")
    public List<Object[]> classroomList() {
        List<ClassroomListDTO> classroom = classroomService.getClassroomList();
        List<Object[]> result = new ArrayList<>();
        for (ClassroomListDTO classroomList : classroom) {
            result.add(classroomList.toArray()); 
        }
        return result;
    }
}
