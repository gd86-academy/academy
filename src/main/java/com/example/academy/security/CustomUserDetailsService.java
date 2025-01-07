package com.example.academy.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.academy.dto.AuthDTO;
import com.example.academy.mapper.AuthMapper;
import com.example.academy.vo.Employee;
import com.example.academy.vo.User;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private AuthMapper authMapper;


    @Override
    public UserDetails loadUserByUsername(String employeeNo) throws UsernameNotFoundException {

    	AuthDTO emploayee = authMapper.findByUsername(employeeNo);

        if (emploayee != null) {
            return new CustomUserDetails(emploayee);
        }

        return null;
    }
}