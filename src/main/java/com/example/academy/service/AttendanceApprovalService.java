package com.example.academy.service;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.example.academy.dto.AttendanceApprovalAddDTO;
import com.example.academy.dto.AttendanceApprovalListDTO;
import com.example.academy.mapper.ApprovalEmployeeMapper;
import com.example.academy.mapper.AttendanceApprovalFileMapper;
import com.example.academy.mapper.AttendanceApprovalMapper;
import com.example.academy.mapper.FilesMapper;
import com.example.academy.util.InputFile;
import com.example.academy.vo.Files;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
public class AttendanceApprovalService {
	@Autowired AttendanceApprovalMapper attendanceApprovalMapper;
	@Autowired ApprovalEmployeeMapper approvalEmployeeMapper;
	@Autowired FilesMapper filesMapper;
	@Autowired AttendanceApprovalFileMapper attendanceApprovalFileMapper;
	
	// 김혜린 : 근태신청서 신청
	public void addAttendanceApproval(AttendanceApprovalAddDTO attendanceApprovalAddDTO) {
		int result = 0;	// 물리적 파일 추가전 db에 삽입 유무확인 

		// attendance_approval (근태신청서) 테이블에 추가
		result += attendanceApprovalMapper.insertAttendanceApproval(attendanceApprovalAddDTO);
		Integer attendanceApprovalNo = attendanceApprovalAddDTO.getAttendanceApprovalNo();
		log.debug("attendanceApprovalNo: " + attendanceApprovalNo);
		log.debug("attendance_approval테이블삽입확인:1? " + result);
		
		// approval_employee (결재자) 테이블에 추가
		// approvers 결재자 배열 받아서 값세팅 ex)김아무개[32], 최아무개[36]
		Integer index = 1; 	// 결재순위표시
		int row = 0;
		for(String a : attendanceApprovalAddDTO.getApprovers()) {
			String numberStr = a.replaceAll("[^0-9]", "");	// 숫자 제외 ""로 바꾸기
			int number = Integer.parseInt(numberStr);
			attendanceApprovalAddDTO.setApprover(number);
			attendanceApprovalAddDTO.setApprovalLevel(index);
			index++;
			attendanceApprovalAddDTO.setAttendanceApprovalNo(attendanceApprovalNo);
			row += approvalEmployeeMapper.insertAttendanceApprovalEmployee(attendanceApprovalAddDTO);
		}
		// 모든 결재자가 db에 삽입되면 result +1 
		if(attendanceApprovalAddDTO.getApprovers().size() == row) {
			result += 1;
		}
		log.debug("approval_employee 테이블삽입확인:2? " + result);
		
		// 파일 추가
		int row2=0;
		if(attendanceApprovalAddDTO.getAttendanceApprovalFiles() != null) {	// 파일이 첨부된경우(비어있지 않으면)
			List<MultipartFile> files = attendanceApprovalAddDTO.getAttendanceApprovalFiles();	// 폼에 입력되었던 파일 가져옴
			
			for(MultipartFile mf : files) {
				InputFile inputFile = new InputFile(); // inputFile 인스턴스 생성.
				inputFile.setOriginFileName(mf.getOriginalFilename());	// 파일 실제 이름 추출 후 inputFile 인스턴스에 set.
				
				Files file = new Files();
				file.setFileName(inputFile.getUUID());		// 서버 파일명
				file.setFileExt(inputFile.getFileExt());	// 파일 확장자
				file.setFileOrigin(inputFile.getFileName());	// 기존 파일명
				file.setFileSize(mf.getSize());		// 파일크기
				file.setFileType(mf.getContentType());	// 파일 타입
				file.setFileCategory("FC003");	// 파일 카테고리
				// file 테이블에 삽입
				row2 += filesMapper.insertFile(file);	
				Integer fileNo = file.getFileNo();	// 삽입된 파일 pk번호 받아오기
				log.debug("fileNo = " + fileNo);
				log.debug("파일 테이블삽입확인:row2? " + row2);
				
				// 근태신청서-파일 테이블에 삽입할 데이터 set
				attendanceApprovalAddDTO.setAttendanceApprovalNo(attendanceApprovalNo);
				attendanceApprovalAddDTO.setFileNo(fileNo);
				// attendance_approval_file 테이블에 삽입
				row2 += attendanceApprovalFileMapper.insertAttendanceApprovalFile(attendanceApprovalAddDTO);
				log.debug("신청서파일 테이블삽입확인:row2? " + row2);
				
				// 모든 db에 잘 삽입되었다면 서버에 물리적 파일 저장
				if(result == 2 && row2 == 2) {
					try {
						mf.transferTo(new File(System.getProperty("user.dir") + "/src/main/resources/static/upload/" + file.getFileName() + "." + file.getFileExt()));
					} catch (Exception e) {
						e.printStackTrace();
						throw new RuntimeException();
					} 
				}
				row2=0;
				
			}
			
		}
		
		
		
	}
	
	// 김혜린 : 근태신청서리스트 조회
	public List<AttendanceApprovalListDTO> getAttendanceApprovalList(Integer employeeNo) {
		return attendanceApprovalMapper.selectAttendanceAprrovalList(employeeNo);
	}
}
