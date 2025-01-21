package com.example.academy.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

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
	
	// 오늘 퇴근 활성화 확인
	public Integer getSelectCheckout(AttendanceDTO attendanceDTO) {
		return attendanceMapper.selectCheckout(attendanceDTO);
	}
	
	// 오늘 출근 활성화 확인
	public Integer getSelectCheckin(AttendanceDTO attendanceDTO) {
		return attendanceMapper.selectCheckin(attendanceDTO);
	}
	
	// 퇴근 버튼 클릭시 수정
	public Integer modifyCheckOut(AttendanceDTO attendanceDTO) {
		log.debug("attendanceDTO ----->" + attendanceDTO);
		
		Integer row = attendanceMapper.updateCheckout(attendanceDTO);
		log.debug("퇴근 ----> " + row);		
						
		String approvalContent = attendanceApprovalMapper.selectContentByDay(attendanceDTO);
		log.debug("신청서 근태 유형 ----> " + approvalContent);
	    
		// AttendanceDTO 객체에서 출퇴근 시간 가져오기
		AttendanceDTO checkTime = attendanceMapper.selectCheckTime(attendanceDTO);
		
		// 출근 시간 및 퇴근 시간 추출
		String checkIn = checkTime.getAttendanceCheckIn(); // 2015-11-11 11:11:11
		String checkOut = checkTime.getAttendanceCheckOut();
		
		// 시간을 LocalTime으로 변환 (시간만 필요하므로 split을 사용하여 시간 부분만 추출)
		LocalTime checkInTime = LocalTime.parse(checkIn.split(" ")[1]); // 11::11:11
		LocalTime checkOutTime = LocalTime.parse(checkOut.split(" ")[1]);
		
		// 시간 로그 출력
		log.debug("출근 시간 확인 ----> " + checkInTime);
		log.debug("퇴근 시간 확인 ----> " + checkOutTime);
		
		LocalTime nineAM = LocalTime.of(9, 0);   // 09:00:00
		LocalTime noon = LocalTime.of(13, 0); // "13:00:00"
		LocalTime twoPM = LocalTime.of(14, 0);   // 14:00:00
		LocalTime evening = LocalTime.of(18, 0); // "18:00:00"
		
		// 출퇴근 시간에 따라 지각/조퇴 활성화 및 근무 유형 변경
		if(approvalContent == null) { // 근무유형이 NULL일 때
			if((checkInTime.isBefore(nineAM) || checkInTime.equals(nineAM)) 
					&& (checkOutTime.isAfter(evening) || checkOutTime.equals(evening))) { // 09:00 >= 출근시간 && 퇴근시간 >= 18:00 -> 정상출근
					attendanceDTO.setAttendanceContent("CT010"); // CT010 = 정상출근 
					attendanceMapper.updateContent(attendanceDTO); // 근태유형 정상출근으로 변경
			} else if(checkInTime.isAfter(nineAM)
					&& (checkOutTime.isAfter(evening) || checkOutTime.equals(evening))) { // 09:00 < 출근시간 && 퇴근시간 >= 18:00 -> 지각
					attendanceMapper.updateLate(attendanceDTO); // 지각 활성화
			} else if((checkInTime.isBefore(nineAM) || checkInTime.equals(nineAM)) // 09:00 >= 출근시간 && 퇴근시간 < 18:00 -> 조퇴 
					&& checkOutTime.isBefore(evening)) { 
					attendanceMapper.updateEarlyLeave(attendanceDTO); // 조퇴 활성화
			} else { // 9 < 출근시간 && 퇴근시간 < 18
					attendanceMapper.updateLate(attendanceDTO); // 지각 활성화
					attendanceMapper.updateEarlyLeave(attendanceDTO); // 조퇴 활성화
			}
		} else if(approvalContent.equals("CT003")) { // 근태유형 == '오전반차'
			if((checkInTime.isBefore(twoPM) || checkInTime.equals(twoPM)) 
					&& (checkOutTime.isAfter(evening) || checkOutTime.equals(evening))) { // 근태유형 == '오전반차' && 14:00 >= 출근시간 && 퇴근시간 >= 18:00 -> 오전반차
					attendanceDTO.setAttendanceContent("CT010"); // CT010 = 정상출근 
					attendanceMapper.updateContent(attendanceDTO); // 근태유형 정상출근으로 변경
			} else if(checkInTime.isAfter(twoPM)
					&& (checkOutTime.isAfter(evening) || checkOutTime.equals(evening))) { // 근태유형 == '오전반차' && 14:00 < 출근시간 && 퇴근시간 >= 18:00 -> (오전반차)지각 CT006 
					attendanceMapper.updateLate(attendanceDTO); // 지각 활성화
			} else if((checkInTime.isBefore(twoPM) || checkInTime.equals(twoPM)) //근태유형 == '오전반차' && 14:00 >= 출근시간 && 퇴근시간 < 18:00 -> (오전반차)조퇴 CT005
					&& checkOutTime.isBefore(evening)) { 
					attendanceMapper.updateEarlyLeave(attendanceDTO); // 조퇴 활성화
			} else { // 14 < 출근시간 && 퇴근시간 < 18
					attendanceMapper.updateLate(attendanceDTO); // 지각 활성화
					attendanceMapper.updateEarlyLeave(attendanceDTO); // 조퇴 활성화
			}
		} else if(approvalContent.equals("CT004")) {	// 근태유형 == '오후반차'
			if((checkInTime.isBefore(nineAM) || checkInTime.equals(nineAM)) 
					&& (checkOutTime.isAfter(noon) || checkOutTime.equals(noon))) { // 09:00 >= 출근시간 && 퇴근시간 >= 13:00 -> 오후반차 CT004'
					attendanceDTO.setAttendanceContent("CT010"); // CT010 = 정상출근 
					attendanceMapper.updateContent(attendanceDTO); // 근태유형 정상출근으로 변경
			} else if(checkInTime.isAfter(nineAM)
					&& (checkOutTime.isAfter(noon) || checkOutTime.equals(noon))) { // 09:00 < 출근시간 && 퇴근시간 >= 13:00 -> (오후반차)지각
					attendanceMapper.updateLate(attendanceDTO); // 지각 활성화
			} else if((checkInTime.isBefore(nineAM) || checkInTime.equals(nineAM)) // 09:00 >= 출근시간 && 퇴근시간 < 13:00 -> (오후반차)조퇴
					&& checkOutTime.isBefore(noon)) {
					attendanceMapper.updateEarlyLeave(attendanceDTO); // 조퇴 활성화
 			} else { // 9 < 출근시간 && 퇴근시간 < 13
	 				attendanceMapper.updateLate(attendanceDTO); // 지각 활성화
					attendanceMapper.updateEarlyLeave(attendanceDTO); // 조퇴 활성화
 			}
		} else  { // 근무유형이 NULL이 아니거나 다른 근무 유형일때
			if((checkInTime.isBefore(nineAM) || checkInTime.equals(nineAM)) 
					&& (checkOutTime.isAfter(evening) || checkOutTime.equals(evening))) { // 09:00 >= 출근시간 && 퇴근시간 >= 18:00 -> 정상출근
					attendanceDTO.setAttendanceContent("CT010"); // CT010 = 정상출근 
					attendanceMapper.updateContent(attendanceDTO); // 근태유형 정상출근으로 변경
			} else if(checkInTime.isAfter(nineAM)
					&& (checkOutTime.isAfter(evening) || checkOutTime.equals(evening))) { // 09:00 < 출근시간 && 퇴근시간 >= 18:00 -> 지각
					attendanceMapper.updateLate(attendanceDTO); // 지각 활성화
			} else if((checkInTime.isBefore(nineAM) || checkInTime.equals(nineAM)) // 09:00 >= 출근시간 && 퇴근시간 < 18:00 -> 조퇴 
					&& checkOutTime.isBefore(evening)) { 
					attendanceMapper.updateEarlyLeave(attendanceDTO); // 조퇴 활성화
			} else { // 9 < 출근시간 && 퇴근시간 < 18
	 				attendanceMapper.updateLate(attendanceDTO); // 지각 활성화
					attendanceMapper.updateEarlyLeave(attendanceDTO); // 조퇴 활성화
			}
		}	
		return 1;
	}
	
	// 출근 버튼 클릭시 수정
	public Integer modifyCheckin(AttendanceDTO attendanceDTO) {
		
		String content = attendanceApprovalMapper.selectContentByDay(attendanceDTO);
		log.debug("근태 유형 ----> " + content);
		String currentDate = attendanceDTO.getCurrentDate(); // 현재 날짜 2025-01-20
		log.debug("현재 날짜 ---->" + currentDate);
		
		return attendanceMapper.updateCheckin(attendanceDTO);
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
	    attendance.setAttendanceLate(0);
	    attendance.setAttendanceEarlyLeave(0);
	    
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
