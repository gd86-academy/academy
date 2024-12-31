package com.example.academy.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.academy.mapper.AuthMapper;
import com.example.academy.vo.User;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private AuthMapper authMapper;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = authMapper.findByUsername(username);

        if (user != null) {

            return new CustomUserDetails(user);
        }

        return null;
    }
}