package com.example.academy.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.example.academy.dto.AttendanceApprovalAddDTO;

@Mapper
public interface AttendanceApprovalFileMapper {
	
	// 김혜린 : 근태신청서 파일추가
	Integer insertAttendanceApprovalFile(AttendanceApprovalAddDTO attendanceApprovalAddDTO);
	

}
