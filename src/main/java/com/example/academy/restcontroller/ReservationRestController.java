package com.example.academy.restcontroller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.academy.service.ReservationService;
import com.example.academy.vo.Employee;

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
}
