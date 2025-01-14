package com.example.academy.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.example.academy.dto.AttendanceApprovalAddDTO;

@Mapper
public interface ApprovalEmployeeMapper {
	
	// 김혜린 : 근태신청서 결재자 추가
	Integer insertAttendanceApprovalEmployee(AttendanceApprovalAddDTO attendanceApprovalAddDTO); 
}
