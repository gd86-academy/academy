package com.example.academy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.academy.dto.AnnualLeaveListDTO;
import com.example.academy.mapper.AnnualLeaveMapper;

@Service
@Transactional
public class AnnualLeaveService {
	@Autowired AnnualLeaveMapper annualLeaveMapper;
	
	// 월별 연차리스트 조회
	public List<AnnualLeaveListDTO> getAnnualLeaveList(String month) {
		return annualLeaveMapper.selectAnnualLeave(month);
	}
	
}
