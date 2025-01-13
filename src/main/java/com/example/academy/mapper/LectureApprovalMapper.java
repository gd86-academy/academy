package com.example.academy.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.academy.dto.LectureApprovalGetBeginTimeDTO;
import com.example.academy.vo.Common;

@Mapper
public interface LectureApprovalMapper {
	
	// 진수우 : 진수우 : 시작시간 선택 시 가능한 시간만 출력
	List<Common> selectLectureApprovalGetBeginTime(LectureApprovalGetBeginTimeDTO lectureApprovalGetBeginTimeDTO);
}
