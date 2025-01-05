package com.example.academy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.academy.mapper.CommonMapper;
import com.example.academy.vo.Common;

@Service
@Transactional
public class CommonService {
	@Autowired CommonMapper commonMapper;

	// 진수우 : 부서 카테고리 조회.
	public List<Common> getDepartmentCategory() {
		return commonMapper.selectDepartmentCategory();
	}
	
	// 진수우 : 직급 카테고리 조회.
	public List<Common> getPositionCategory() {
		return commonMapper.selectPositionCategory();
	}
}
