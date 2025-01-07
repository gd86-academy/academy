package com.example.academy.security;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.academy.dto.AuthDTO;
import com.example.academy.vo.Employee;
import com.example.academy.vo.User;

public class CustomUserDetails implements UserDetails {

    private AuthDTO employee;

    public CustomUserDetails(AuthDTO employee) {
        this.employee = employee;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        Collection<GrantedAuthority> collection = new ArrayList<>();

        collection.add(new GrantedAuthority() {

            @Override
            public String getAuthority() {
            	return "ROLE_" + employee.getEmployeeRole(); // 권한명 앞에 ROLE_ 접두사를 추가해야 필터체인 정상작동.
            }
        });
        return collection;
    }
    
    // 프로필사진 이름 정보
    public String getUserPhotoFileName() {
        return employee.getPhotoFileName();
    }
    
    // 프로필사진 확장자 정보
    public String getUserPhotoFileExt() {
        return employee.getPhotoFileExt();
    }
    // 이메일 정보
    public String getUserMail() {
        return employee.getEmployeeMail();
    }
    
    // 이름 정보
    public String getUserRealName() {
        return employee.getEmployeeName();
    }
    
    // 권한 정보
    public String getUserrole() {
        return employee.getEmployeeRole();
    }
    
    // 비밀번호 정보
    @Override
    public String getPassword() {
        return employee.getEmployeePw();
    }

    // 사원번호 정보
    @Override
    public String getUsername() {
    	return employee.getEmployeeNo().toString();
    }
    
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}