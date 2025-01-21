package com.example.academy.scheduled;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface AttendanceRepository extends JpaRepository<Attendance, Integer> {
	
	// 근태유형이 병가, 오전반차, 오후반차일 시 근태유형만 변경
	@Modifying
    @Transactional
    @Query("UPDATE Attendance a SET a.attendanceContent = :approvalType "
         + "WHERE a.employeeNo = :employeeNo AND a.attendanceDate = :today")
    void updateAttendanceByApproval1(@Param("approvalType") String approvalType  // Optional을 풀어서 값만 전달
    	    								, @Param("employeeNo") Integer employeeNo
    	    								, @Param("today") LocalDate today);
	
	// 근태유형이 NULL이 아니거나 값이 있으면 근태유형, 출근, 퇴근 시간 변경 
	@Modifying
	@Transactional
	@Query("UPDATE Attendance a SET a.attendanceContent = :approvalType, "
			+ "a.checkinTime = :todayStartTime,"
			+ "a.checkoutTime = :todayEndTime "
			+ "WHERE a.employeeNo = :employeeNo AND a.attendanceDate = :today")
	void updateAttendanceByApproval2(@Param("approvalType") String approvalType  // Optional을 풀어서 값만 전달
			, @Param("todayStartTime") LocalDateTime todayStartTime
			, @Param("todayEndTime") LocalDateTime todayEndTime
			, @Param("employeeNo") Integer employeeNo
			, @Param("today") LocalDate today);
	
	@Query("SELECT a FROM Attendance a "
			+ "WHERE a.employeeNo = :employeeNo " 
				+ "AND a.attendanceDate = :attendanceDate " 
				+ "AND a.checkinTime IS NULL " 
				+ "AND a.checkoutTime IS NULL " 
				+ "AND a.attendanceContent IS NULL")
	    Attendance findAttendanceByEmployeeAndDate(@Param("employeeNo") Integer employeeNo,
	                                               @Param("attendanceDate") LocalDate attendanceDate);
	
}
