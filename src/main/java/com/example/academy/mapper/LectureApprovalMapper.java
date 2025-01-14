package com.example.academy.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.example.academy.dto.ApprovalAddDTO;
import com.example.academy.dto.LectureApprovalAddDTO;
import com.example.academy.dto.LectureApprovalEmployeeListDTO;
import com.example.academy.dto.LectureApprovalGetBeginTimeDTO;
import com.example.academy.dto.LectureApprovalOneDTO;
import com.example.academy.dto.LectureApprovalWeekdayListDTO;
import com.example.academy.vo.Common;
import com.example.academy.vo.Files;
import com.example.academy.vo.LectureApproval;
import com.example.academy.vo.LectureWeekday;

@Mapper
public interface LectureApprovalMapper {
	
	// 진수우 : 강의결재 상세페이지에서 결재자 출력
	List<LectureApprovalEmployeeListDTO> selectLectureApprovalEmployee(Integer lectureApprovalNo);
	
	// 진수우 : 강의결재 상세페이지에서 파일 출력
	List<Files> selectLectureApprovalFile(Integer lectureApprovalNo);
	
	// 진수우 : 강의결재 상세페이지에서 강의시간 출력
	List<LectureApprovalWeekdayListDTO> selectLectureApprovalWeekday(Integer lectureApprovalNo);
	
	// 진수우 : 강의결재 상세페이지에서 강의정보 출력
	LectureApprovalOneDTO selectLectureApprovalOne(Integer lectureApprovalNo);
	
	// 진수우 : 강의결재신청 시 강의결재/파일 연결테이블에 해당정보 저장
	Integer insertLectureApprovalFile(Map<String,Integer> resultMap);
	
	// 진수우 : 강의결재신청 시 결재자테이블에 해당정보 저장
	Integer insertApprovalEmployee(ApprovalAddDTO approvalAddDTO);
	
	// 진수우 : 강의결재신청 시  강의결재테이블에 해당정보 저장
	Integer insertLectureApproval(LectureApprovalAddDTO lectureApprovalAddDTO);
	
	// 진수우 : 강의결재신청 시 강의시간/강의 연결테이블에 해당정보 저장
	Integer insertLectureApprovalLectureWeekday(Map<String,Integer> resultMap);
	
	// 진수우 : 강의결재신청 시 강의시간테이블에 해당정보 저장
	Integer insertLectureWeekday(LectureWeekday lectureWeekday);
	
	// 진수우 : 시작시간 선택 시 가능한 시간만 출력
	List<Common> selectLectureApprovalGetBeginTime(LectureApprovalGetBeginTimeDTO lectureApprovalGetBeginTimeDTO);
}
