package com.example.academy.dto;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class BoardDTO {
	
	private Integer boardNo;
	private String boardTitle;
	private String boardContent;
	private Integer createEmployeeNo;
	private Integer updateEmployeeNo;
	private Integer boardCount;
	private String createDate;
	private String updateDate;
	private Integer fileNo;
	private String fileName;
	private String fileExt;
	private String fileOrigin;
	private Long fileSize;
	private String fileType;
	private String fileCategory;
	private String employeeName;
	
	private List<MultipartFile> boardFiles;
}
