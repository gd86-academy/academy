package com.example.academy.dto;

import lombok.Data;

@Data
public class ClassroomListDTO {
	private Integer classroomNo;
	private String classroomName;
	private Integer classroomManager;
	private Integer classroomCapacity;
	
	// 데이터를 배열로 반환
	public Object[] toArray() {
		return new Object[] {
			this.classroomNo
			, this.classroomName
			, this.classroomManager
			, this.classroomCapacity // test
		};
	}
}
