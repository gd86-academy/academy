package com.example.academy.dto;

import lombok.Data;

@Data
public class BoardDTO {
	
	private Integer boardNo;
	private String boardTitie;
	private String boardContent;
	private Integer createEmployeeNo;
	private Integer updateEmployeeNo;
	private Integer boardCount;
	private String createDate;
	private String updateDate;
	private String fileName;
	private String fileExt;
	
}
