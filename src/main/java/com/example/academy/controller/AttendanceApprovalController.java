package com.example.academy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.academy.dto.AttendanceApprovalAddDTO;
import com.example.academy.dto.AttendanceApprovalModifyDTO;
import com.example.academy.dto.AttendanceApprovalOneDTO;
import com.example.academy.security.CustomUserDetails;
import com.example.academy.service.ApprovalEmployeeService;
import com.example.academy.service.AttendanceApprovalFileService;
import com.example.academy.service.AttendanceApprovalService;
import com.example.academy.vo.Files;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class AttendanceApprovalController {
	@Autowired AttendanceApprovalService attendanceApprovalService;
	@Autowired ApprovalEmployeeService approvalEmployeeService;
	@Autowired AttendanceApprovalFileService attendanceApprovalFileService;
	
	// 김혜린 : 근태 신청서 승인 시
	@PostMapping("/agreeAttendanceApproval")
	public String agreeAttendanceApproval(Model model, AttendanceApprovalOneDTO attendanceApprovalOneDTO) {
		
		log.debug("승인전 데이터 확인 : " + attendanceApprovalOneDTO);	//디버깅
		attendanceApprovalService.agreeAttendanceApproval(attendanceApprovalOneDTO);
		
		return "redirect:/completeApprovalList";
	}
	
	// 김혜린 : 근태 신청서 반려 시
	@PostMapping("/rejectAttendanceApproval")
	public String rejectAttendanceApproval(Model model, AttendanceApprovalOneDTO attendanceApprovalOneDTO) {
	    
		log.debug("반려전 데이터 확인 : " + attendanceApprovalOneDTO);	//디버깅
	    attendanceApprovalService.rejectAttendanceApproval(attendanceApprovalOneDTO);
	   
		return "redirect:/completeApprovalList";
	}
	
	// 김혜린 : 근태 신청서 삭제
	@GetMapping("/removeAttendanceApproval")
	@ResponseBody // AJAX 요청에 적합한 응답 처리
	public String removeAttendanceApproval(Integer attendanceApprovalNo) {
		attendanceApprovalService.removeAttendanceApproval(attendanceApprovalNo);
		
		return "applicationList";
	}
	
	// 김혜린 : 근태 신청서 수정페이지 GET
	@GetMapping("/modifyAttendanceApproval")
	public String modifyAttendanceApproval(Model model, Integer attendanceApprovalNo) {
		// 원래 정보 불러오기
		// 1) 근태신청서 테이블 정보
		AttendanceApprovalOneDTO attendanceApproval = attendanceApprovalService.getAttendanceApprovalOne(attendanceApprovalNo);
		model.addAttribute("attendanceApproval", attendanceApproval);
		// 근태신청서 현재 결재단계
		model.addAttribute("step",attendanceApproval.getAttendanceApprovalStep());
		
		log.debug("근태신청서 상세 : " + attendanceApproval);	//디버깅
		log.debug("==============attendanceApprovalNo2 : " + attendanceApprovalNo);	//디버깅
		// 2) 결재자 목록
		List<AttendanceApprovalOneDTO> approvers  = approvalEmployeeService.getAttendanceApproverList(attendanceApprovalNo);
		model.addAttribute("approvers", approvers);
		log.debug("결재자 목록 : " + approvers);	//디버깅
		// 3) 파일 목록
		List<Files> files = attendanceApprovalFileService.getAttendanceApprovalFileList(attendanceApprovalNo);
		model.addAttribute("files", files);
		log.debug("파일 목록 : " + files);	//디버깅
		
		return "modifyAttendanceApproval";
	}
	
	// 김혜린 : 근태 신청서 수정페이지 POST
	@PostMapping("/modifyAttendanceApproval")
	public String modifyAttendanceApproval(AttendanceApprovalModifyDTO attendanceApprovalModifyDTO) {
		log.debug("+~+~+~+~+attendanceApprovalModifyDTO 목록 : " + attendanceApprovalModifyDTO);	//디버깅
		attendanceApprovalService.modifyAttendanceApproval(attendanceApprovalModifyDTO);
		
		return "redirect:/attendanceApprovalOne?attendanceApprovalNo=" + attendanceApprovalModifyDTO.getAttendanceApprovalNo();
	}
	
	
	// 김혜린 : 근태 신청서 상세페이지 - 나의 신청 목록
	@GetMapping("/attendanceApprovalOne")
	public String attenddanceApprovalOne(Model model, Integer attendanceApprovalNo) {
		
		log.debug("==============attendanceApprovalNo1 : " + attendanceApprovalNo);	//디버깅
		// 1) 근태신청서 테이블 상세
		AttendanceApprovalOneDTO attendanceApproval = attendanceApprovalService.getAttendanceApprovalOne(attendanceApprovalNo);
		model.addAttribute("attendanceApproval", attendanceApproval);
		// 근태신청서 현재 결재단계
		model.addAttribute("step",attendanceApproval.getAttendanceApprovalStep());
		log.debug("근태신청서 상세 : " + attendanceApproval);	//디버깅
		log.debug("==============attendanceApprovalNo2 : " + attendanceApprovalNo);	//디버깅
		// 2) 결재자 목록
		List<AttendanceApprovalOneDTO> approvers  = approvalEmployeeService.getAttendanceApproverList(attendanceApprovalNo);
		model.addAttribute("approvers", approvers);
		log.debug("결재자 목록 : " + approvers);	//디버깅
		// 3) 파일 목록
		List<Files> files = attendanceApprovalFileService.getAttendanceApprovalFileList(attendanceApprovalNo);
		model.addAttribute("files", files);
		log.debug("파일 목록 : " + files);	//디버깅
		
		return "attendanceApprovalOne";
	}
	// 김혜린 : 결재대기 근태 신청서 상세페이지 - 결재 대기 목록
	@GetMapping("/waitAttendanceApprovalOne")
	public String waitAttendanceApprovalOne(Model model, Integer attendanceApprovalNo) {
		// 스프링시큐리티에서 계정정보 가져오기.
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		// 로그인 상태일 때만 model에 정보담기.
	    if (authentication != null && authentication.isAuthenticated() && !(authentication instanceof AnonymousAuthenticationToken)) {
	        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
	        model.addAttribute("userNo", Integer.parseInt(userDetails.getUsername()));
	        model.addAttribute("userName", userDetails.getUserRealName());
	        model.addAttribute("userMail", userDetails.getUserMail());
	        model.addAttribute("userRole", userDetails.getUserRole());
	        model.addAttribute("userPhotoFileName", userDetails.getUserPhotoFileName());
	        model.addAttribute("userPhotoFileExt", userDetails.getUserPhotoFileExt());
	    }
		
		log.debug("==============attendanceApprovalNo1 : " + attendanceApprovalNo);	//디버깅
		// 1) 근태신청서 테이블 상세
		AttendanceApprovalOneDTO attendanceApproval = attendanceApprovalService.getAttendanceApprovalOne(attendanceApprovalNo);
		model.addAttribute("attendanceApproval", attendanceApproval);
		// 근태신청서 현재 결재단계
		model.addAttribute("step",attendanceApproval.getAttendanceApprovalStep());
		log.debug("근태신청서 상세 : " + attendanceApproval);	//디버깅
		log.debug("==============attendanceApprovalNo2 : " + attendanceApprovalNo);	//디버깅
		// 2) 결재자 목록
		List<AttendanceApprovalOneDTO> approvers  = approvalEmployeeService.getAttendanceApproverList(attendanceApprovalNo);
		model.addAttribute("approvers", approvers);
		log.debug("결재자 목록 : " + approvers);	//디버깅
		// 3) 파일 목록
		List<Files> files = attendanceApprovalFileService.getAttendanceApprovalFileList(attendanceApprovalNo);
		model.addAttribute("files", files);
		log.debug("파일 목록 : " + files);	//디버깅
		
		return "waitAttendanceApprovalOne";
	}
	
	// 김혜린 : 근태 신청
	@GetMapping("/addAttendanceApproval")
	public String addAttendanceApproval(Model model) {
		// 스프링시큐리티에서 계정정보 가져오기.
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		// 로그인 상태일 때만 model에 정보담기.
	    if (authentication != null && authentication.isAuthenticated() && !(authentication instanceof AnonymousAuthenticationToken)) {
	        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
	        model.addAttribute("userNo", Integer.parseInt(userDetails.getUsername()));
	        model.addAttribute("userName", userDetails.getUserRealName());
	        model.addAttribute("userMail", userDetails.getUserMail());
	        model.addAttribute("userRole", userDetails.getUserRole());
	        model.addAttribute("userPhotoFileName", userDetails.getUserPhotoFileName());
	        model.addAttribute("userPhotoFileExt", userDetails.getUserPhotoFileExt());
	    }
	    
		
		return "addAttendanceApproval";		
	}
	
	// 김혜린 : 근태신청
	@PostMapping("/addAttendanceApproval")
	public String addAttendanceApproval(AttendanceApprovalAddDTO attendanceApprovalAddDTO) {
		log.debug("============attendanceApprovalAddDTO========" + attendanceApprovalAddDTO);
		attendanceApprovalService.addAttendanceApproval(attendanceApprovalAddDTO);
		
		
		return "redirect:/applicationList";
	}
	
	

}
