package com.example.academy.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.example.academy.dto.HolidayDTO;
import com.example.academy.vo.Holiday;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@Slf4j
public class HolidayService {

	private static final String SERVICE_KEY = "dltOlihXKKAMDhrqN9bMdGaoOov8YYzQAwEIMEgT2iT3PkeSY1N2TlV1oCaj3Zl8r0Fb1s5jkurXMoOqMqtyQ%3D%3D";
    private static final String API_URL = "http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo";
    
	public List<Holiday> getHolidayList(String year) {
	    RestTemplate restTemplate = new RestTemplate();
	    String requestUrl = API_URL + "?serviceKey=" + SERVICE_KEY + "&solYear=" + year;
	    
	    ObjectMapper objectMapper = new ObjectMapper();
	    List<Holiday> holidayList = new ArrayList<>();
	    
	    try {
	        // API에서 JSON 문자열 받아오기
	        String jsonResponse = restTemplate.getForObject(requestUrl, String.class);

	        // JSON 파싱
	        JsonNode root = objectMapper.readTree(jsonResponse);
	        JsonNode holidaysNode = root.get("holidays");

	        // JSON을 HolidayDTO 배열로 변환
	        HolidayDTO[] holidayDTOs = objectMapper.treeToValue(holidaysNode, HolidayDTO[].class);

	        // DTO 리스트를 Holiday 리스트로 변환
	        holidayList = Arrays.stream(holidayDTOs)
	                .filter(dto -> "Y".equals(dto.getIsHoliday())) // 휴일만 필터링
	                .map(dto -> new Holiday(dto.getDate())) // 날짜만 VO로 변환
	                .collect(Collectors.toList());

	    } catch (JsonProcessingException e) {
	        e.printStackTrace(); // JSON 처리 오류 로깅
	    } catch (RestClientException e) {
	        e.printStackTrace(); // API 호출 오류 로깅
	    }

	    return holidayList; // 변환된 리스트 반환
	}
}
