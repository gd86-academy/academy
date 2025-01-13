package com.example.academy.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.academy.dto.AddReservationDTO;
import com.example.academy.dto.ReservationListDTO;
import com.example.academy.vo.Employee;
import com.example.academy.vo.ReservationEmployee;

@Mapper
public interface ReservationMapper {
	// 박시현 : 예약시 참여자 추가
	Integer insertReservationByEmployee(ReservationEmployee reservationEmployee);
	
	// 박시현 : 사원검색 - 예약신청시 참여인원에서 필요
	List<Employee> selectReservationByEmployee(String searchEmployee); 
	
	// 박시현 : 회의실 예약 신청 
	Integer insertReservation(AddReservationDTO addReservationListDTO);
	
	List<ReservationEmployee> getReservationEmployees(Integer reservationNo);
	
	// 박시현 : 회의실예약 목록 조회
	List<ReservationListDTO> selectReservationList();
}
