package com.example.academy.restcontroller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.academy.dto.ReservationListDTO;
import com.example.academy.service.ReservationService;
import com.example.academy.vo.Employee;


@RestController
public class ReservationRestController {
	@Autowired ReservationService reservationService;
	
	// 박시현 : 예약 수정
	@PostMapping("/modifyReservation")
	public ResponseEntity<String> modifyReservation(@ModelAttribute ReservationListDTO reservationListDTO) {
		int row = reservationService.modifyReservation(reservationListDTO);
        if (row > 0) {
            return ResponseEntity.ok("Success");
        } else {
            return ResponseEntity.badRequest().body("Failed to modify classroom");
        }
	}
	
	// 박시현 : 수정하기 전 input에 정보 출력
	@GetMapping("/modifyReservation")
	public ResponseEntity<ReservationListDTO> modifyReservation(@RequestParam Integer reservationNo) {
		ReservationListDTO reservation = reservationService.getReservationOne(reservationNo);
		if (reservation != null) {
            return ResponseEntity.ok(reservation);
        } else {
            return ResponseEntity.notFound().build();
        }
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
