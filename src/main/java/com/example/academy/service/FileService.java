package com.example.academy.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.academy.mapper.FileMapper;

@Service
@Transactional
public class FileService {
	@Autowired FileMapper fileMapper;
	
	
}
