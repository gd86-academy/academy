package com.example.academy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.academy.dto.ClassroomListDTO;
import com.example.academy.dto.EmployeeListDTO;
import com.example.academy.service.ClassroomService;
import com.example.academy.service.EmployeeService;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class ClassroomController {
	@Autowired ClassroomService classroomService;
	@Autowired EmployeeService employeeService;
	
	// 박시현 : 강의실 삭제
	@GetMapping("/removeClassroom")
	public String removeClassroom(@RequestParam Integer classroomNo) {
		int row = classroomService.removeClassroom(classroomNo);
		if(row == 0) { // 삭제 실패시
			return "classroomList";
		}
		return "redirect:/classroomList";
	}

	// 박시현 : 강의실 수정
	/*
	@GetMapping("/modifyClassroom")
	public String modifyClassroom(Model model
									, @RequestParam Integer classroomNo
									, @RequestParam String classroomName
									, @RequestParam Integer classroomManager
									, @RequestParam Integer classroomCapacity) {
		
	    ClassroomListDTO classroomListDTO = new ClassroomListDTO();
	    classroomListDTO.setClassroomNo(classroomNo);
	    classroomListDTO.setClassroomName(classroomName);
	    classroomListDTO.setClassroomManager(classroomManager);
	    classroomListDTO.setClassroomCapacity(classroomCapacity);
	    
		int row = classroomService.modifyClassroom(classroomListDTO);
	    if (row == 0) {
	        // 수정 실패 시 처리 로직
	        return "classroomList";
	    }
		return "redirect:/classroomList";
	}
	*/
	// 박시현 : 강의실 등록
	@PostMapping("/addClassroom")
	public String addClassroom(Model model, ClassroomListDTO classroomListDTO) {
		classroomService.addClassroom(classroomListDTO);
		return "redirect:/classroomList";
	}
	
	// 박시현 : 강의실 목록 조회
	@GetMapping("/classroomList")
	public String classroomList(Model model, EmployeeListDTO EmployeeListDTO) {
		// 강의실 리스트 조회 - addClassroom 모달창에서 담당자를 조회하기 위해
		List<EmployeeListDTO> classroom = employeeService.getEmployeeList();
		model.addAttribute("classroom",classroom);
		List<ClassroomListDTO> modifyClassroom = classroomService.getClassroomList();
		model.addAttribute("modifyClassroom",modifyClassroom);
		log.debug("classroom : " + classroom);
		return "classroomList";
	}

}
