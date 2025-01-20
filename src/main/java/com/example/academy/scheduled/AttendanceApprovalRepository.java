package com.example.academy.scheduled;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AttendanceApprovalRepository extends JpaRepository<AttendanceApproval, Integer> {

	@Query("SELECT a.attendanceApprovalType "	
	     + "FROM AttendanceApproval a "
	     + "WHERE a.employeeNo = :employeeNo "
	     + "AND a.attendanceApprovalBegindate <= :today "
	     + "AND a.attendanceApprovalEnddate >= :today "
	     + "AND a.attendanceApprovalStatus = :status")
	String findApprovedAttendanceRequest(Integer employeeNo, LocalDate today, String status);
	
}