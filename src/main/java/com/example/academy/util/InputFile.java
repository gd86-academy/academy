package com.example.academy.util;

import java.util.UUID;
import lombok.Data;

// 진수우 : 파일추가 객체.
@Data
public class InputFile {
	private String originFileName; // 실제 파일이름.
	
	// 파일명에서 점이 위치한 인덱스 계산.
	private Integer dotIndex(String fileName) {
		return this.originFileName.lastIndexOf(".");
	}
	
	// 서버에 저장되는 파일이름.
	public String getUUID() {
		return UUID.randomUUID().toString().replace("-", "");
	}
	
	// 파일명 추출.
	public String getFileName() {
		return this.originFileName.substring(0, this.dotIndex(this.originFileName));
	}
	
	// 파일확장자 추출.
	public String getFileExt() {
		return this.originFileName.substring(this.dotIndex(this.originFileName)+1);
	}
}
