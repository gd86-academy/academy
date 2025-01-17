package com.example.academy.service;

import java.lang.System.Logger;
import java.time.LocalDate;
import java.util.List;

import org.mybatis.logging.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.academy.dto.AttendanceContentDTO;
import com.example.academy.dto.AttendanceListDTO;
import com.example.academy.mapper.AttendanceMapper;
import com.example.academy.scheduled.Attendance;
import com.example.academy.scheduled.AttendanceRepository;
import com.example.academy.scheduled.Employee;
import com.example.academy.scheduled.EmployeeRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
public class AttendanceService {
	@Autowired AttendanceMapper attendanceMapper;
	
	// 최근 6개월 월별 근무시간 총합 조회
	public List<Integer> getAttendanceTotalWorkTime(Integer employeeNo) {
		return attendanceMapper.selectWorkTimeByMonth(employeeNo);
	}
	
	// 당일 월 지각, 조퇴, 결근 횟수 조회
	public AttendanceContentDTO getAttendanceContent(Integer employeeNo) {
		return attendanceMapper.selectAttendanceContent(employeeNo);
	}
	
	// 출근 관리 리스트 조회
	public List<AttendanceListDTO> getAttendanceList(AttendanceListDTO attendanceListDTO) {
		return attendanceMapper.selectAttendanceList(attendanceListDTO);
	}
	
	private final EmployeeRepository employeeRepository;
	
	private final AttendanceRepository attendanceRepository;
	
	// -----------------------------------------------------------------------------------Scheduler
	
	// 생성자 주입
	public AttendanceService(AttendanceRepository attendanceRepository, EmployeeRepository employeeRepository) {
		
		private static final Logger logger = LoggerFactory.getLogger(AttendanceService.class);
		
		this.attendanceRepository = attendanceRepository;
		this.employeeRepository = employeeRepository;
	}
	
	public void generateDailyAttendance() {
		
		// 오늘 날짜를 구함
		LocalDate today = LocalDate.now();
		
		// 모든 사원 목록 조회
		List<Employee> employeeList = employeeRepository.findAll();
		
		for (Employee employee : employeeList) {
	        createAttendanceForEmployee(employee, today);  // 직원별 근태 데이터 생성
	    }
	}
	
	// 직원별 근태 데이터 생성 메서드
	private void createAttendanceForEmployee(Employee employee, LocalDate today) {
	    Attendance attendance = new Attendance();
	    attendance.setEmployeeNo(employee.getEmployeeNo());  // 사원 정보 설정
	    attendance.setAttendanceDate(today);  // 날짜 설정
	    attendance.setAttendanceStatus("출근전");  // 기본 근태 상태

	    // checkin, checkout, attendanceContent는 NULL로 설정
	    attendance.setCheckinTime(null);  // NULL
	    attendance.setCheckoutTime(null);  // NULL
	    attendance.setAttendanceContent(null);  // NULL

	    attendanceRepository.save(attendance);  // 근태 데이터 저장
	}
}
