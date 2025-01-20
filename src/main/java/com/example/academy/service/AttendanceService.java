package com.example.academy.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.hibernate.grammars.hql.HqlParser.CurrentTimeFunctionContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.academy.dto.AttendanceContentDTO;
import com.example.academy.dto.AttendanceDTO;
import com.example.academy.dto.AttendanceListDTO;
import com.example.academy.mapper.AttendanceApprovalMapper;
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
	@Autowired AttendanceApprovalMapper attendanceApprovalMapper;
	
	// 출근 버튼 클릭시 수정
	public Integer modifyCheckin(AttendanceDTO attendanceDTO) {
		
		String content = attendanceApprovalMapper.selectContentByDay(attendanceDTO);
		log.debug("근태 유형 ----> " + content);
		String currentTimeString = attendanceDTO.getCurrentDateTime(); // 현재시각 2025-01-20 11:11:11
		log.debug("현재 시각 ---->" + currentTimeString);
		
		// DateTimeFormatter를 사용하여 "yyyy-MM-dd HH:mm:ss" 형식으로 파싱
	    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		
		if(content.equals("CT003")) { // 오전 반차
			LocalDateTime currentTime1 = LocalDateTime.parse(currentTimeString, formatter); // LocalDateTime으로 파싱
			LocalDateTime targetTime1 = currentTime1.toLocalDate().atTime(14, 0); // 오늘 날짜의 14:00 (2시)
			if(currentTime1.isBefore(targetTime1) || currentTime1.isEqual(targetTime1)) { // 현재 시각이 14시 이전이거나 14시일 때
				Integer row1 = attendanceMapper.updateCheckin(attendanceDTO); // 정시 출근
				log.debug("오전 반차 정시 출근 ---->" +row1);
			} else if(currentTime1.isAfter(targetTime1)) { // 현재 시각이 14시 이후일 때
				Integer row2 = attendanceMapper.updateCheckinByTardy(attendanceDTO); // 지각 출근
				log.debug("오전 반차 지각 ---->" +row2);
			} 
		} else {
			LocalDateTime currentTime2 = LocalDateTime.parse(currentTimeString, formatter); // LocalDateTime으로 파싱
			LocalDateTime targetTime2 = currentTime2.toLocalDate().atTime(9, 0); // 오늘 날짜의 09:00 (09시)
			if(currentTime2.isBefore(targetTime2) || currentTime2.isEqual(targetTime2)) {
				Integer row3 = attendanceMapper.updateCheckin(attendanceDTO); // 정시 출근
				log.debug("정시 출근 ---->" +row3);
			} else if(currentTime2.isAfter(targetTime2)) {
				Integer row4 = attendanceMapper.updateCheckinByTardy(attendanceDTO); // 지각 출근
				log.debug("지각 ---->" +row4);
			}
		}
		
		return 1;
	}
	
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
		
		this.attendanceRepository = attendanceRepository;
		this.employeeRepository = employeeRepository;
	}
	
	@Transactional(rollbackFor = Exception.class)
	public void generateDailyAttendance() {
		
		// 오늘 날짜를 구함
		LocalDate today = LocalDate.now();
		
		// 모든 사원 목록 조회
		List<Employee> employeeList = employeeRepository.findAll();
		
		// 각 직원에 대해 근태 데이터 생성
        for (Employee employee : employeeList) {
        	log.debug("직원번호 {}에 대한 근태 데이터 생성 시작", employee.getEmployeeNo());
            
        	createAttendanceForEmployee(employee, today);  // 직원별 근태 데이터 생성
            log.debug("직원번호 {}에 대한 근태 데이터 생성 완료", employee.getEmployeeNo());
        }
	}
	
	// 직원별 근태 데이터 생성 메서드
	private void createAttendanceForEmployee(Employee employee, LocalDate today) {
		// Attendance 객체 생성
	    Attendance attendance = new Attendance();
	    attendance.setEmployeeNo(employee.getEmployeeNo());  // 사원 정보 설정
	    attendance.setAttendanceDate(today);  // 날짜 설정
	    attendance.setAttendanceStatus("ST001");  // 기본 근태 상태

	    // checkin, checkout, attendanceContent는 NULL로 설정
	    attendance.setCheckinTime(null);  // NULL
	    attendance.setCheckoutTime(null);  // NULL
	    attendance.setAttendanceContent(null);  // NULL

	    try {
            // 데이터 저장
            attendanceRepository.save(attendance);  
            log.info("근태 데이터가 성공적으로 저장되었습니다. 직원번호: {}", employee.getEmployeeNo());
        } catch (Exception e) {
            // 예외가 발생한 경우
        	log.error("근태 데이터 저장 중 오류 발생. 직원번호: {}", employee.getEmployeeNo(), e);
        }
	}
}
