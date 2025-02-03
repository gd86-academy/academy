package com.example.academy.vo;

import lombok.Data;

@Data
public class Holiday {
	private String date;
	
	// 생성자 추가
    public Holiday(String date) {
        this.date = date;
    }
}
