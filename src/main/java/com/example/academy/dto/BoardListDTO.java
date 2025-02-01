package com.example.academy.dto;

import lombok.Data;

@Data
public class BoardListDTO {
	
	private Integer boardNo;
	private String boardTitle;
	private String employeeName;
	private String employeeDepartmentName;
	private Integer boardCount;
	private String updateDate;
	private String createDate;
	
	// 데이터를 배열로 반환하는 메서드
	public Object[] toArray() {
		return new Object[] {
				this.boardNo,
				this.boardTitle,
				this.employeeName,
				this.boardCount,
				this.updateDate,
				this.createDate,
				this.employeeDepartmentName
		};
	}
}
