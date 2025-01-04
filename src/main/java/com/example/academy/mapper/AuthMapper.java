package com.example.academy.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.example.academy.vo.User;

@Mapper
public interface AuthMapper {
    
    Integer insertUser(User user);
    
    // Check if a username exists
    boolean existsByUsername(String username);

    // Find user by username
    User findByUsername(String username);
}
