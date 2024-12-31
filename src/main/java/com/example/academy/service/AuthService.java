package com.example.academy.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.academy.mapper.AuthMapper;
import com.example.academy.vo.User;

@Service
@Transactional
public class AuthService {
	@Autowired private AuthMapper authMapper;
    @Autowired private BCryptPasswordEncoder bCryptPasswordEncoder;

    public void joinProcess(User user) {

    	user.setUsername(user.getUsername());
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setRole("management");

        authMapper.insertUser(user);
    }
}
