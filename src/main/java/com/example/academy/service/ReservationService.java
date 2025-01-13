package com.example.academy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.academy.dto.AddReservationDTO;
import com.example.academy.dto.ReservationListDTO;
import com.example.academy.mapper.ReservationMapper;
import com.example.academy.vo.Employee;
import com.example.academy.vo.ReservationEmployee;


@Service
@Transactional
public class ReservationService {
	@Autowired ReservationMapper reservationMapper;
	
	// 박시현 : 예약 신청 - 사원 검색
	public List<Employee> getReservationByEmployee(String searchEmployee) {
		return reservationMapper.selectReservationByEmployee(searchEmployee);
	}
	
	// 박시현 : 예약 신청
	public Integer insertReservation(AddReservationDTO addReservationDTO) {
	    // 예약 신청 데이터 추가
	    int reservationRow = reservationMapper.insertReservation(addReservationDTO);
	    
	    // 여러 명의 예약자 데이터 추가
	    int employeeRow = 0;
	    for (ReservationEmployee employee : addReservationDTO.getReservationEmployees()) {
	        employeeRow += reservationMapper.insertReservationByEmployee(employee);
	    }
	    
	    // 모든 작업이 성공적으로 완료되었는지 확인
	    if (reservationRow > 0 && employeeRow == addReservationDTO.getReservationEmployees().size()) {
	        return 1;  // 성공적으로 추가됨
	    } else {
	        return 0;  // 실패
	    }
	}
	
	// 박시현 : 회의실 목록 출력
	public List<ReservationListDTO> getReservationList() {
		List<ReservationListDTO> reservationList = reservationMapper.selectReservationList();
        
        // 예약 참여자 추가
        for (ReservationListDTO reservation : reservationList) {
            List<ReservationEmployee> employees = reservationMapper.getReservationEmployees(reservation.getReservationNo());
            reservation.setReservationEmployees(employees);
        }
        
        return reservationList;
	}
}
