package com.example.academy.scheduled;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Employee {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // PK 자동 생성
    @Column(name = "employee_no")
    private Integer employeeNo;  // 사원번호
    
    @Column(nullable = false)  // 비어있으면 안 되는 필드
    private String employeePw;  // 사원 비밀번호
    
    @Column(nullable = false)
    private String employeeName;  // 사원 이름
    
    private String employeeGender;  // 성별
    
    private String employeeBirth;  // 생년월일
    
    private Integer addressNo;  // 주소 번호
    
    private String employeePhone;  // 전화번호
    
    private String employeeDepartment;  // 부서
    
    private String employeePosition;  // 직급
    
    private String employeeRole;  // 직무 역할
    
    private Integer photoFileNo;  // 사진 파일 번호
    
    private Integer stampFileNo;  // 도장 파일 번호
    
    private String employeeMail;  // 이메일
    
    private String employeeDate;  // 입사일
    
    @Column(nullable = false, updatable = false)
    private LocalDateTime createDate;  // 생성일 (자동 생성되게 할 것)
    
    @Column(nullable = false)
    private LocalDateTime updateDate;  // 수정일 (업데이트될 때마다 갱신)

}