package com.example.academy.scheduled;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

	// 모든 직원 정보 조회
    List<Employee> findAll();

}
