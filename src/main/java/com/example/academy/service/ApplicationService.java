package com.example.academy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.academy.dto.ApplicationListDTO;
import com.example.academy.mapper.ApplicationMapper;

@Service
@Transactional
public class ApplicationService {
	@Autowired ApplicationMapper applicationMapper;
	
	public List<ApplicationListDTO> getApplicationList(Integer employeeNo) {
		return applicationMapper.selectApplicationList(employeeNo);
	}
	
}