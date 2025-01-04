package com.example.academy.vo;

import lombok.Data;

@Data
public class File {
	
	private Integer fileNo;
	private String fileName;
	private String fileExt;
	private String fileOrigin;
	private String fileSize;
	private String fileCategory;
	private String createDate;
	private String updateDate;
	
}
