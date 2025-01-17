package com.example.academy.scheduled;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Attendance {
	
	@Id // 이 필드는 해당 엔티티의 기본 키(PK)임을 나타냅니다.
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본 키 생성을 데이터베이스에 위임. 보통 AUTO_INCREMENT와 함께 사용
	@Column(name = "attendance_no")
	private Integer attendanceNo;
	
	@Column(name = "aemployee_no")
    private Integer employeeNo;
	
	@Column(name = "attendance_date")
    private LocalDate attendanceDate;
	
	@Column(name = "checkin_time")
    private LocalDateTime checkinTime;  // NULL 허용
	
	@Column(name = "checkout_time")
    private LocalDateTime checkoutTime;  // NULL 허용
	
	@Column(name = "attendance_status")
    private String attendanceStatus;
	
	@Column(name = "attendance_content")
    private String attendanceContent;  // NULL 허용
    
	@Column(name = "create_date", insertable = false, updatable = false) // 해당 컬럼은 INSERT나 UPDATE 시에 값이 자동으로 설정되며, 수동으로 변경할 수 없다는 설정
    private LocalDateTime createDate;

    @Column(name = "update_date", insertable = false, updatable = false) // 해당 컬럼은 INSERT나 UPDATE 시에 값이 자동으로 설정되며, 수동으로 변경할 수 없다는 설정
    private LocalDateTime updateDate;
}
