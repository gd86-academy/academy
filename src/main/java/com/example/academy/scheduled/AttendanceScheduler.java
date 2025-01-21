package com.example.academy.scheduled;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.example.academy.service.AttendanceService;

@Service
public class AttendanceScheduler {
	
	@Autowired EmployeeRepository employeeRepository;
	
	@Autowired AttendanceService attendanceService; 
	
	@Autowired AttendanceRepository attendanceRepository;
	
	@Autowired AttendanceApprovalRepository attendanceApprovalRepository;
	
	// 오늘 날짜를 구함
	LocalDate today = LocalDate.now();
	
	// 매일 00시 00분에 실행
    @Scheduled(cron = "0 58 21 * * ?")// cron 표현식: 매일 00시 00분
    public void generateAttendanceData() { 
        
    	//isWeekday(today) - 토요일(6)과 일요일(7)을 제외한 평일에만 실행
        if (isWeekday(today)) {
            // 근태 데이터 생성 로직을 여기에 추가
            createAttendanceData();
        } else {
            System.out.println("주말입니다. 근태 데이터 생성을 건너뜁니다.");
        }
    }

    // 평일인지 확인하는 메서드
    private boolean isWeekday(LocalDate date) {
        DayOfWeek dayOfWeek = date.getDayOfWeek();
        return dayOfWeek != DayOfWeek.SATURDAY && dayOfWeek != DayOfWeek.SUNDAY;
    }
    
    // 매일 11시 59분에 실행해서 출퇴근이 NULL이고 근무유형이 NULL인 데이터는 결석 처리 
    @Scheduled(cron = "0 02 21 * * ?")
    public void attendanceByAbsence() {
    	
    	// 1. 모든 사원 조회
        List<Employee> employees = employeeRepository.findAll();
    	
     	// 2. 각 사원에 대해 근태 조회 및 데이터 수정
        for (Employee employee : employees) {
        	
        	// 출퇴근이 NULL이고 근무유형이 NULL인 근태만 조회
        	Attendance attendance = attendanceRepository.findAttendanceByEmployeeAndDate(employee.getEmployeeNo(), today);
        
            if (attendance != null) {
                // 출퇴근이 NULL이고 근무유형이 NULL인 경우 결석 처리
                attendance.setAttendanceContent("CT007");
                attendanceRepository.save(attendance);
            }
        }
           
    }
    
    // 근태 데이터 생성 로직
    private void createAttendanceData() {
        // 근태 데이터 생성 로직을 여기에 작성
        System.out.println("근태 데이터 생성 중...");
        
        // 1. 근태 데이터 생성
        attendanceService.generateDailyAttendance(); // 이미 작성한 메서드 호출하여 데이터 생성
        
        // 2. 모든 사원 조회
        List<Employee> employees = employeeRepository.findAll();
        
        // 3. 각 사원에 대해 근태 신청서 조회 및 데이터 수정
        for (Employee employee : employees) {
            String attendanceApprovalType = findAttendanceApproval(today, employee.getEmployeeNo());
            	System.out.println("attendanceApprovalType---->"+ attendanceApprovalType);
            // 4. 근태 신청서가 승인된 경우, 근태 데이터를 수정
            if (attendanceApprovalType != null && (attendanceApprovalType.equals("CT003") || attendanceApprovalType.equals("CT004") || attendanceApprovalType.equals("CT001"))) { // 근태유형이 병가, 오전반차, 오후반차일 시 근태유형만 변경
                modifyAttendanceByApproval1(today, employee);
            } else if(attendanceApprovalType != null && !attendanceApprovalType.isEmpty()) { // 근태유형이 NULL이 아니거나 값이 있으면 근태유형, 출근, 퇴근 시간 변경 
            	modifyAttendanceByApproval2(today, employee);                
            } else {	
            	System.out.println("사원 " + employee.getEmployeeNo() + "의 승인된 근태 신청서가 없습니다.");
            }
        }
    }
    
    // 근태 신청서를 조회하는 메서드 (모든 사원에 대해 조회)
    private String findAttendanceApproval(LocalDate today, Integer employeeNo) {
    	String status = "AS003";
        // 근태 신청서를 조회하여 승인된 신청서 내용 반환
        return attendanceApprovalRepository.findApprovedAttendanceRequest(employeeNo, today, status);
    }
    
    // 근태유형이 병가, 오전반차, 오후반차일 시 근태유형만 변경
    private void modifyAttendanceByApproval1(LocalDate today, Employee employee) {
    	// 근태 승인 코드
    	String status = "AS003";
    	
    	// 근태 신청서에서 승인된 근태 유형을 조회
        String approvalType = attendanceApprovalRepository.findApprovedAttendanceRequest(employee.getEmployeeNo(), today, status);
    	
        System.out.println(" 근태 유형 : " + approvalType);
        Integer employeeNo = employee.getEmployeeNo();
        System.out.println(" 사원 번호 : " + employeeNo);
        System.out.println(" 오늘 날짜 : " + today);
        
        // 근태 데이터 수정
        attendanceRepository.updateAttendanceByApproval1(approvalType, employeeNo, today);
    }
    
    // 근태유형이 NULL이 아니거나 값이 있으면 근태유형, 출근, 퇴근 시간 변경 
    private void modifyAttendanceByApproval2(LocalDate today, Employee employee) {
    	// 근태 승인 코드
    	String status = "AS003";
    	
    	// 근태 신청서에서 승인된 근태 유형을 조회
    	String approvalType = attendanceApprovalRepository.findApprovedAttendanceRequest(employee.getEmployeeNo(), today, status);
    	
    	System.out.println(" 근태 유형 : " + approvalType);
    	Integer employeeNo = employee.getEmployeeNo();
    	System.out.println(" 사원 번호 : " + employeeNo);
    	System.out.println(" 오늘 날짜 : " + today);
    	
    	// 날짜와 시간을 '00:00:00'으로 정확히 설정 (현재 날짜의 '00:00:00')
    	LocalDateTime todayStartTime = today.atTime(0, 0, 0); // 정확히 '00:00:00' 시각으로 설정
    	LocalDateTime todayEndTime = today.atTime(0, 0, 0); // 정확히 '00:00:00' 시각으로 설정
    	
    	// 시간 확인
    	System.out.println(" 오늘 날짜 : " + todayEndTime);
    	
    	// 근태 데이터 수정
    	attendanceRepository.updateAttendanceByApproval2(approvalType, todayStartTime, todayEndTime, employeeNo, today);
    }
}
