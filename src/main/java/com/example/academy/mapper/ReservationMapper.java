package com.example.academy.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.academy.dto.AddReservationDTO;
import com.example.academy.dto.ReservationEmployeeDTO;
import com.example.academy.dto.ReservationListDTO;
import com.example.academy.vo.Employee;

@Mapper
public interface ReservationMapper {
	// 박시현 : 예약 취소
	Integer deleteReservation(Integer reservationNo);
	
	// 박시현 : 예약 참여자 삭제
	Integer deleteReservationEmployee(Integer employeeNo, Integer reservationNo);
	
	// 박시현 : 예약번호 별 상세정보
	ReservationListDTO selectReservationOne(Integer reservationNo);
	
	// 박시현 : 예약 수정
	Integer updateReservation(ReservationListDTO reservationListDTO);

	// 박시현 : 예약 참여자 수정
	Integer updateReservationEmployee(ReservationEmployeeDTO reservationEmployeeDTO);
	
	// 박시현 : 예약시 참여자 추가
	Integer insertReservationByEmployee(ReservationEmployeeDTO reservationEmployeeDTO);
	
	// 박시현 : 사원검색 - 예약신청시 참여인원에서 필요
	List<Employee> selectReservationByEmployee(String searchEmployee); 
	
	// 박시현 : 회의실 예약 신청 
	Integer insertReservation(AddReservationDTO addReservationListDTO);
	
	// 박시현 : 예약 참여자 조회
	List<ReservationEmployeeDTO> selectReservationEmployees(Integer reservationNo);
	
	// 박시현 : 회의실예약 목록 조회
	List<ReservationListDTO> selectReservationList();
}
