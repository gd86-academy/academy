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
	    // 예약 정보 추가 (reservation 테이블에 데이터 추가)
	    Integer row = reservationMapper.insertReservation(addReservationDTO);
	    
	    // 참여자 데이터 추가
	    if (row > 0) {
	        Integer reservationNo = addReservationDTO.getReservationNo(); // 새로 생성된 예약 번호
	        
	        // 예약 참여자들 추가 (reservation_employee 테이블에 데이터 추가)
	        int employeeRow = 0;
	        for (ReservationEmployeeDTO employee : addReservationDTO.getReservationEmployees()) {
	            employee.setReservationNo(reservationNo);  // 각 참여자에 예약 번호 설정
	            employeeRow += reservationMapper.insertReservationByEmployee(employee);  // 참여자 데이터 추가
	        }
	        
	        // 4. 모든 작업이 성공적으로 완료되었는지 확인
	        if (employeeRow == addReservationDTO.getReservationEmployees().size()) {
	            return 1;  // 성공
	        } else {
	            return 0;  // 실패 
	        }
	    } else {
	        return 0;  // 예약 신청 데이터 추가 실패
	    }
	}
	
	// 박시현 : 회의실 목록 출력
	public List<ReservationListDTO> getReservationList() {
		List<ReservationListDTO> reservationList = reservationMapper.selectReservationList();
        
        // 회의 참여자 추가
        for (ReservationListDTO reservation : reservationList) {
            List<ReservationEmployeeDTO> employees = reservationMapper.getReservationEmployees(reservation.getReservationNo());
            reservation.setReservationEmployees(employees);
        }
        
        return reservationList;
	}
}
