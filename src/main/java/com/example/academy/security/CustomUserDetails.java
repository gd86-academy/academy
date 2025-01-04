package com.example.academy.security;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.academy.vo.Employee;
import com.example.academy.vo.User;

public class CustomUserDetails implements UserDetails {

    private Employee employee;

    public CustomUserDetails(Employee employee) {
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

    public String getUserrole() {
        return employee.getEmployeeRole();
    }
    
    @Override
    public String getPassword() {
        return employee.getEmployeePw();
    }

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