package com.example.academy.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.example.academy.vo.Employee;
import com.example.academy.vo.User;

@Mapper
public interface AuthMapper {
    
    // 진수우 : 시큐리티 로그인 시 사원 데이터베이스 조회.
    Employee findByUsername(String username);
}
