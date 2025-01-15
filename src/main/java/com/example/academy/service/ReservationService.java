package com.example.academy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.academy.dto.AddReservationDTO;
import com.example.academy.dto.ReservationEmployeeDTO;
import com.example.academy.dto.ReservationListDTO;
import com.example.academy.mapper.ReservationMapper;
import com.example.academy.vo.Employee;

import lombok.extern.slf4j.Slf4j;


@Service
@Transactional
@Slf4j
public class ReservationService {
	@Autowired ReservationMapper reservationMapper;
	
	// 박시현 : 예약 취소
	public Integer removeReservation(Integer reservationNo) {
		return reservationMapper.deleteReservation(reservationNo);
	}
	
	// 박시현 : 예약 수정
	public Integer modifyReservation(ReservationListDTO reservationListDTO) {
		return reservationMapper.updateReservation(reservationListDTO);
	}
	
	// 박시현 : 예약번호별 상세정보
	public ReservationListDTO getReservationOne(Integer reservationNo) {
		return reservationMapper.selectReservationOne(reservationNo);
	}
	
	// 박시현 : 예약 신청 - 사원 검색
	public List<Employee> getReservationByEmployee(String searchEmployee) {
		return reservationMapper.selectReservationByEmployee(searchEmployee);
	}
	
	// 박시현 : 예약 신청
	public Integer insertReservation(AddReservationDTO addReservationDTO) {
		// 1. 예약 정보 삽입
        int row = reservationMapper.insertReservation(addReservationDTO);
        if (row > 0) {
            Integer reservationNo = addReservationDTO.getReservationNo(); // 생성된 예약 번호
            
            // 2. 예약 참여자 삽입
            for (ReservationEmployeeDTO employee : addReservationDTO.getReservationEmployees()) {
                employee.setReservationNo(reservationNo);
                reservationMapper.insertReservationByEmployee(employee);
            }
        }
        return row;
	}
	
	// 박시현 : 회의실 목록 출력
	public List<ReservationListDTO> getReservationList() {
		List<ReservationListDTO> reservationList = reservationMapper.selectReservationList();
        
        // 회의 참여자 추가
        for (ReservationListDTO reservation : reservationList) {
            List<ReservationEmployeeDTO> employees = reservationMapper.selectReservationEmployees(reservation.getReservationNo());
            reservation.setReservationEmployees(employees);
        }
        
        return reservationList;
	}
}
