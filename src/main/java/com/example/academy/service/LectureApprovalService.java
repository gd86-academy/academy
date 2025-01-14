package com.example.academy.service;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.example.academy.dto.ApprovalAddDTO;
import com.example.academy.dto.LectureApprovalAddDTO;
import com.example.academy.dto.LectureApprovalEmployeeListDTO;
import com.example.academy.dto.LectureApprovalGetBeginTimeDTO;
import com.example.academy.dto.LectureApprovalOneDTO;
import com.example.academy.dto.LectureApprovalWeekdayListDTO;
import com.example.academy.mapper.FilesMapper;
import com.example.academy.mapper.LectureApprovalMapper;
import com.example.academy.util.InputFile;
import com.example.academy.vo.Common;
import com.example.academy.vo.Files;
import com.example.academy.vo.LectureWeekday;

@Service
@Transactional
public class LectureApprovalService {
	@Autowired LectureApprovalMapper lectureApprovalMapper;
	@Autowired FilesMapper filesMapper;
	
	// 진수우 : 강의결재 상세페이지에서 결재자 출력
	public List<LectureApprovalEmployeeListDTO> getLectureApprovalEmployee(Integer lectureApprovalNo) {
		return lectureApprovalMapper.selectLectureApprovalEmployee(lectureApprovalNo);
	}
	
	// 진수우 : 강의결재 상세페이지에서 파일 출력
	public List<Files> getLectureApprovalFile(Integer lectureApprovalNo) {
		return lectureApprovalMapper.selectLectureApprovalFile(lectureApprovalNo);
	}
		
	// 진수우 : 강의결재 상세페이지에서 강의시간 출력
	public List<LectureApprovalWeekdayListDTO> getLectureApprovalWeekday(Integer lectureApprovalNo) {
		return lectureApprovalMapper.selectLectureApprovalWeekday(lectureApprovalNo);
	}
	
	// 진수우 : 강의결재 상세페이지에서 강의정보 출력
	public LectureApprovalOneDTO getLectureApprovalOne(Integer lectureApprovalNo) {
		return lectureApprovalMapper.selectLectureApprovalOne(lectureApprovalNo);
	}
	
	// 진수우 : 강의결재신청 시 폼에 입력한 내용 데이터베이스에 저장.
	public void addLectureApproval(LectureApprovalAddDTO lectureApprovalAddDTO) {
		
		// 강의결재테이블에 입력한 내용 insert.
		lectureApprovalAddDTO.setLectureApprovalStep(lectureApprovalAddDTO.getApproval().size()); // 결재자 수 가져와서 set.
		lectureApprovalMapper.insertLectureApproval(lectureApprovalAddDTO);
		Integer lectureApprovalNo = lectureApprovalAddDTO.getLectureApprovalNo(); // insert할 때 생성된 결재번호 가져옴.
		
		// 강의시간테이블에 입력한 내용 insert.
		List<Integer> lectureWeekdayNoList = new ArrayList<>(); // 생성된 강의시간번호 리스트.
		for (LectureWeekday lectureWeekday : lectureApprovalAddDTO.getLectureWeekday()) {
			lectureApprovalMapper.insertLectureWeekday(lectureWeekday);
			lectureWeekdayNoList.add(lectureWeekday.getLectureWeekdayNo()); // insert할 때 생성된 강의시간번호 가져옴.
		}
		
		// 강의결재/강의시간 연결테이블에 내용 insert.
		for (Integer lectureWeekday : lectureWeekdayNoList) {
			Map<String,Integer> resultMap = new HashMap<>();
			resultMap.put("lectureApprovalNo", lectureApprovalNo);
			resultMap.put("lectureWeekdayNo", lectureWeekday);
			lectureApprovalMapper.insertLectureApprovalLectureWeekday(resultMap);
		}
		
		// 결재자테이블에 입력한 내용 insert.
		int approvalLevel = 0;
		for (String approval : lectureApprovalAddDTO.getApproval()) {
			// 결재순서를 정하기 위한 증가연산자.
			approvalLevel++;
			// 대괄호를 기준으로 문자열 나누어 사원이름과 번호를 분리.
	        String[] parts = approval.split("\\[|\\]"); // '[' 또는 ']'로 분리
			ApprovalAddDTO approvalAddDTO = new ApprovalAddDTO();
			approvalAddDTO.setApprover(Integer.parseInt(parts[1])); // 사원번호
			approvalAddDTO.setLectureApprovalNo(lectureApprovalNo); // 결재번호
			approvalAddDTO.setApprovalLevel(approvalLevel); // 결재순서
			lectureApprovalMapper.insertApprovalEmployee(approvalAddDTO);
		}
		
		// 파일테이블에 입력한 내용 insert. 물리적파일 저장.
		List<Integer> fileNoList = new ArrayList<>();
		for (MultipartFile getFiles : lectureApprovalAddDTO.getLectureApprovalFile()) {
			InputFile inputFile = new InputFile(); // inputFile 인스턴스 생성.
			inputFile.setOriginFileName(getFiles.getOriginalFilename()); // 파일의 실제이름을 추출해서 inputFile 인스턴스에 set.
			Files files = new Files();
			files.setFileName(inputFile.getUUID()); // 서버에서 관리되는 파일이름.
			files.setFileOrigin(inputFile.getFileName()); // 실제 파일이름.
			files.setFileExt(inputFile.getFileExt()); // 파일 확장자.
			files.setFileSize(getFiles.getSize()); // 파일 크기.
			files.setFileType(getFiles.getContentType()); // 파일 타입.
			files.setFileCategory("FC003"); // 파일 카테고리.
			Integer result = filesMapper.insertFile(files); // 파일정보 삽입.
			fileNoList.add(files.getFileNo()); // 데이터베이스에 파일정보 삽입 시 자동으로 생성되는 fileNo값 가져옴.
			// 서버에 물리적 파일 저장.
			if (result == 1) {
				try {
					getFiles.transferTo(new File(System.getProperty("user.dir") + "/src/main/resources/static/upload/" + files.getFileName() + "." + files.getFileExt()));
				} catch (Exception e) {
					e.printStackTrace();
					throw new RuntimeException();
				}
			}
		}
		
		// 강의결재/파일 연결테이블에 내용 insert.
		for (Integer fileNo : fileNoList) {
			Map<String,Integer> resultMap = new HashMap<>();
			resultMap.put("fileNo", fileNo); // 파일번호
			resultMap.put("lectureApprovalNo", lectureApprovalNo); // 결재번호
			lectureApprovalMapper.insertLectureApprovalFile(resultMap);
		}
		
	}
	
	// 진수우 : 시작시간 선택 시 가능한 시간만 출력
	public List<Common> getLectureApprovalGetBeginTime(LectureApprovalGetBeginTimeDTO lectureApprovalGetBeginTimeDTO) {
		return lectureApprovalMapper.selectLectureApprovalGetBeginTime(lectureApprovalGetBeginTimeDTO);
	}
}
