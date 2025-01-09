package com.example.academy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.academy.dto.ReservationListDTO;
import com.example.academy.mapper.ReservationMapper;


@Service
@Transactional
public class ReservationService {
	@Autowired ReservationMapper reservationMapper;
	
	public List<ReservationListDTO> getReservationList() {
		return reservationMapper.selectReservationList();
	}
}
