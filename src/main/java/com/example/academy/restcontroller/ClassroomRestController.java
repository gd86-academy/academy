package com.example.academy.restcontroller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.academy.dto.ClassroomListDTO;
import com.example.academy.service.ClassroomService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class ClassroomRestController {
	@Autowired ClassroomService classroomService;
	
	// 박시현 : 강의실목록 출력
	@GetMapping("/restapi/classroomList")
    public ResponseEntity<?> classroomList() {
        List<ClassroomListDTO> classroom = classroomService.getClassroomList();

        // 데이터가 없을 경우 204 No Content 응답
        if (classroom == null || classroom.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        // 데이터 변환
        List<Object[]> result = new ArrayList<>();
        for (ClassroomListDTO classroomList : classroom) {
            if (classroomList != null) {
                result.add(classroomList.toArray());
            }
        }

        // 성공적으로 데이터 반환 (200 OK)
        return ResponseEntity.ok(result);
    }
}
