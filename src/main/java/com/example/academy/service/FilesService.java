package com.example.academy.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.academy.mapper.FilesMapper;

@Service
@Transactional
public class FilesService {
	@Autowired FilesMapper filesMapper;
	
	
}
