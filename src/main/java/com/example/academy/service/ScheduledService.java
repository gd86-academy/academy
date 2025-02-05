package com.example.academy.service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.academy.dto.AttendanceDTO;
import com.example.academy.dto.EmployeeListDTO;
import com.example.academy.mapper.EmployeeMapper;
import com.example.academy.mapper.ScheduledMapper;
import com.example.academy.vo.Holiday;

import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@Slf4j
public class ScheduledService {

	@Autowired private ScheduledMapper scheduledMapper;
	@Autowired private EmployeeMapper employeeMapper;
	@Autowired private HolidayService holidayService;
	
	// 00시마다 모든 사원 근태 데이터 생성
	@Scheduled(cron = "0 25 00 * * ?")
	public void generateAttendanceData() {
		// 현재 시간정보를 가져옴.
		LocalDate today = LocalDate.now();
		String year = Integer.toString(today.getYear());
		
		// 공휴일 확인
		List<Holiday> holidays = holidayService.getHolidayList(year);
		
		boolean isHoliday = holidays.stream()
                					.anyMatch(holiday -> holiday.getDate().equals(today.toString())); // 공휴일 여부 체크
		log.debug("----------------------->" + holidays);
		log.debug("----------------------->" + isHoliday);
		
		if (isHoliday) {
			log.debug("오늘은 공휴일입니다. 근태 데이터 생성을 생략합니다.");
			return;  // 공휴일인 경우 데이터 생성을 중지
		} else {
			log.debug("오늘은 공휴일이 아닙니다.");
		}
		
		// 현재 시간정보가 주말이 아니라면,
		if (today.getDayOfWeek() != DayOfWeek.SATURDAY && today.getDayOfWeek() != DayOfWeek.SUNDAY) {
			
			
			log.debug("근태 데이터를 생성합니다.");
	        
			// 1. 모든 사원 조회
	        List<EmployeeListDTO> employees = employeeMapper.selectEmployeeList();
	        
	        // 2. 근태 데이터 생성
	        for(EmployeeListDTO employeeListDTO : employees) {
	        	scheduledMapper.insertAttendance(employeeListDTO.getEmployeeNo());
	        	String attendanceApprovalType = scheduledMapper.selectContent(employeeListDTO.getEmployeeNo());
	        	
	        	// DTO에 employeeNo,content 넣기
	        	AttendanceDTO attendance = new AttendanceDTO();
	        	attendance.setEmployeeNo(employeeListDTO.getEmployeeNo());
	        	attendance.setAttendanceContent(attendanceApprovalType);
	        	
	        	// 3. 근태 신청서가 승인된 경우, 근태유형에 따라 근태 정보 수정
	            if (attendanceApprovalType != null && (attendanceApprovalType.equals("CT003") || attendanceApprovalType.equals("CT004"))) { // 근태유형이 오전반차, 오후반차일 시 근태유형만 변경
	                scheduledMapper.updateAttendance(attendance);
	            } else if(attendanceApprovalType != null && !attendanceApprovalType.isEmpty()) { // 근태유형이 NULL이 아니거나 값이 있으면 근태유형, 출근, 퇴근 시간 변경 
	            	scheduledMapper.updateAttendanceByCheckTime(attendance);         
	            } else {	
	            	log.debug("사원 " + employeeListDTO.getEmployeeNo() + "의 승인된 근태 신청서가 없습니다.");
	            }
	        }
		}
	}
	
	// 11시 59분마다 출/퇴 시간이 NULL이고 근태유형이 NULL인 데이터는 근태유형 결석으로 변경
	@Scheduled(cron = "0 59 23 * * ?")
	public void attendanceByAbsence() {
		// 1. 모든 사원 조회
        List<EmployeeListDTO> employees = employeeMapper.selectEmployeeList();
        
        for (EmployeeListDTO employee : employees) {        	
        	// 출퇴근이 NULL이고 근무유형이 NULL인 근태만 조회
        	scheduledMapper.updateContentByAbsence(employee.getEmployeeNo());
        }
	}
}
