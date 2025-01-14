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
	
	public List<Double> getAnnualLeaveCountByMonth(Integer employeeNo) {
		return annualLeaveMapper.annualLeaveCountByMonth(employeeNo);
	}
	
	public Double getAnnualLeaveCount(Integer employeeNo) {
		return annualLeaveMapper.annualLeaveCount(employeeNo);
	}
	
	// 월별 연차리스트 조회
	public List<AnnualLeaveListDTO> getAnnualLeaveList(String month) {
		List<AnnualLeaveListDTO> annualLeaveList = annualLeaveMapper.selectAnnualLeave(month);
		for(AnnualLeaveListDTO annualLeave : annualLeaveList) {
			annualLeave.setCreateDate(annualLeave.getCreateDate().substring(0,10));
			annualLeave.setUpdateDate(annualLeave.getUpdateDate().substring(0,10));
		}
		return annualLeaveList;
	}
	
}
