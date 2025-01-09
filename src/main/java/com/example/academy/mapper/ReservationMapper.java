package com.example.academy.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.academy.dto.ReservationListDTO;

@Mapper
public interface ReservationMapper {
	
	// 박시현) 회의실예약 목록 조회
	List<ReservationListDTO> selectReservationList();
}
