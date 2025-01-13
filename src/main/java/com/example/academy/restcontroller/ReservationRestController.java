package com.example.academy.restcontroller;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.academy.dto.ReservationListDTO;
import com.example.academy.service.ReservationService;
import com.example.academy.vo.Employee;
import com.example.academy.vo.Reservation;

@RestController
public class ReservationRestController {
	@Autowired ReservationService reservationService;
	
	@GetMapping("/restapi/searchEmployee")
    public List<Employee> searchEmployee(@RequestParam String searchEmployee) {
        if (searchEmployee.isEmpty()) {
            return new ArrayList<>(); // 빈 값 처리
        }
        return reservationService.getReservationByEmployee(searchEmployee);
    }
	@GetMapping("/restapi/reservationList")
	public List<Object[]> reservationList() {
		List<ReservationListDTO> reservation = reservationService.getReservationList();
		List<Object[]> result = new ArrayList<>();
		for(ReservationListDTO reservationList : reservation) {
			result.add(reservationList.toArray());
		}
		return result;
	}
}
