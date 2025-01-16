package com.example.academy.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.academy.dto.AttendanceApprovalAddDTO;
import com.example.academy.dto.AttendanceApprovalListDTO;
import com.example.academy.dto.AttendanceApprovalModifyDTO;
import com.example.academy.dto.AttendanceApprovalOneDTO;

@Mapper
public interface AttendanceApprovalMapper {
	
	// 김혜린 : 근태신청서 수정
	Integer updateAttendanceApproval(AttendanceApprovalModifyDTO attendanceApprovalModifyDTO);
	
	// 김혜린 : 근태신청서 상세페이지
	AttendanceApprovalOneDTO selectAttendanceApprovalOne(Integer attendanceApprovalNo);
	
	// 김혜린 : 근태신청서 신청(추가)
	Integer insertAttendanceApproval(AttendanceApprovalAddDTO attendanceApprovalAddDTO);
	
	// 김혜린 : 결재 대기 목록 - 근태신청서 리스트 조회
	List<AttendanceApprovalListDTO> selectWaitAttendanceAprrovalList(Integer employeeNo);
	
	// 김혜린 : 나의 신청 목록 - 근태신청서 리스트 조회
	List<AttendanceApprovalListDTO> selectAttendanceAprrovalList(Integer employeeNo);
}
