package com.example.academy.scheduled;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class AttendanceApproval {

	@Id
	@Column(name = "attendance_approval_no")
	private Integer attendanceApprovalNo;  // primary key (가정)

	@Column(name = "employee_no")
	private Integer employeeNo;
	
	@Column(name = "attendance_approval_begindate")
	private LocalDate attendanceApprovalBegindate;
	
	@Column(name = "attendance_approval_Enddate")
	private LocalDate attendanceApprovalEnddate;
	
	@Column(name = "attendance_approval_status")
	private String attendanceApprovalStatus;
	
	@Column(name = "attendance_approval_type")
	private String attendanceApprovalType;
}
