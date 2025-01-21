package com.example.academy.restcontroller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.academy.dto.AddReservationDTO;
import com.example.academy.dto.MeetingRoomListDTO;
import com.example.academy.dto.MeetingroomEmployeeDTO;
import com.example.academy.dto.ReservationEmployeeDTO;
import com.example.academy.dto.ReservationListDTO;
import com.example.academy.mapper.ReservationMapper;
import com.example.academy.security.CustomUserDetails;
import com.example.academy.service.ReservationService;
import com.example.academy.vo.Common;
import com.example.academy.vo.Employee;

import lombok.extern.slf4j.Slf4j;


@RestController
public class ReservationRestController {
	@Autowired ReservationService reservationService;
	
	// 박시현 : 예약 신청 시 가능한 종료시간 출력
	@PostMapping("/restapi/getReservationByEndTime")
	public List<Common> getReservationByEndTime(@RequestBody AddReservationDTO addReservationDTO) {
		System.out.println("쿼리 실행 전 MeetingRoomNo: " + addReservationDTO.getMeetingroomNo());
	    System.out.println("쿼리 실행 전 ReservationDate: " + addReservationDTO.getReservationDate());
		return reservationService.getReservationByEndTime(addReservationDTO);
	}
	
	// 박시현 : 예약 신청 시 가능한 시작시간 출력
	@PostMapping("/restapi/getReservationByBeginTime")
	public List<Common> getReservationByBeginTime(@RequestBody AddReservationDTO addReservationDTO) {
		System.out.println("쿼리 실행 전 MeetingRoomNo: " + addReservationDTO.getMeetingroomNo());
	    System.out.println("쿼리 실행 전 ReservationDate: " + addReservationDTO.getReservationDate());
		return reservationService.getReservationByBeginTime(addReservationDTO);
	}

	// 박시현 : 수정페이지 - 이미 등록되있던 예약 참여자 보여주기
	@GetMapping("/restapi/getReservationEmployeeOne") 
	public ResponseEntity<List<ReservationEmployeeDTO>> getReservationEmployeeOne( Integer reservationNo) {
		List<ReservationEmployeeDTO> employees = reservationService.getReservationEmployee(reservationNo);
        
        if (employees.isEmpty()) {
            return ResponseEntity.noContent().build(); 
        }
        
        return ResponseEntity.ok(employees);
	}
	
	// 박시현 : 수정페이지 접근권한 확인
	@GetMapping("/restapi/checkReservationPerson")
    public Map<String, Boolean> checkReservationPerson(@RequestParam Integer reservationNo) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Map<String, Boolean> response = new HashMap<>();
        response.put("hasPermission", false); // 기본값: 권한 없음

        if (authentication != null && authentication.isAuthenticated() && !(authentication instanceof AnonymousAuthenticationToken)) {
            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            int loggedInUserId = Integer.parseInt(userDetails.getUsername());

            ReservationListDTO reservation = reservationService.getReservationOne(reservationNo);

            if (reservation != null && reservation.getReservationPerson() == loggedInUserId) {
                response.put("hasPermission", true);
            }
        }
        return response;
    }
	
	// 박시현 : 사원검색
	@GetMapping("/restapi/searchEmployee")
    public List<Employee> searchEmployee(@RequestParam String searchEmployee) {
        if (searchEmployee.isEmpty()) {
            return new ArrayList<>(); // 빈 값 처리
        }
        return reservationService.getReservationByEmployee(searchEmployee);
    }
	
	// 박시현 : 예약 리스트
	@GetMapping("/restapi/reservationList")
	public List<Map<String, Object>> reservationList() {
	    List<ReservationListDTO> reservation = reservationService.getReservationList();
	    List<Map<String, Object>> result = new ArrayList<>();
	    
	    for (ReservationListDTO reservationList : reservation) {
	        Map<String, Object> event = new HashMap<>();
	        
	        event.put("reservationNo", reservationList.getReservationNo());
	        event.put("reservationPerson", reservationList.getReservationPerson());
	        event.put("reservationTitle", reservationList.getReservationTitle());
	        event.put("reservationDate", reservationList.getReservationDate());
	        event.put("beginTimeCode", reservationList.getBeginTimeCode());
	        event.put("endTimeCode", reservationList.getEndTimeCode());
	        event.put("reservationContent", reservationList.getReservationContent());
	        event.put("meetingroomName", reservationList.getMeetingroomName());
	        event.put("reservationEmployees", reservationList.getReservationEmployees());
	        
	        result.add(event);
	    }
	    
	    return result;
	}
}
