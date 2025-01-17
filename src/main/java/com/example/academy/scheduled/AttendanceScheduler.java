package com.example.academy.scheduled;

import java.time.DayOfWeek;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;

import com.example.academy.service.AttendanceService;

public class AttendanceScheduler {
	
	@Autowired AttendanceService attendanceService; 
	
	// 매일 00시 00분에 실행
    @Scheduled(cron = "0 48 23 * * ?")// cron 표현식: 매일 00시 00분
    public void generateAttendanceData() {
        // 오늘 날짜를 구함
        LocalDate today = LocalDate.now();
        
        // isWeekday(today) - 토요일(6)과 일요일(7)을 제외한 평일에만 실행
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

    // 근태 데이터 생성 로직
    private void createAttendanceData() {
        // 근태 데이터 생성 로직을 여기에 작성
        System.out.println("근태 데이터 생성 중...");
        
        // 예: 데이터베이스에 데이터 삽입 등
        attendanceService.generateDailyAttendance();
    }
}
