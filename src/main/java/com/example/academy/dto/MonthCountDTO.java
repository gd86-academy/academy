package com.example.academy.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class MonthCountDTO {
	
	private LocalDate approvalMonth;
	private Double count;
	
}
