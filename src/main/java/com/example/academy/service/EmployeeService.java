package com.example.academy.service;

import java.util.List;
import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.example.academy.dto.EmployeeAddDTO;
import com.example.academy.dto.EmployeeListDTO;
import com.example.academy.mapper.AddressMapper;
import com.example.academy.mapper.EmployeeMapper;
import com.example.academy.mapper.FilesMapper;
import com.example.academy.util.InputFile;
import com.example.academy.vo.Address;
import com.example.academy.vo.Files;

@Service
@Transactional
public class EmployeeService {
	@Autowired private BCryptPasswordEncoder bCryptPasswordEncoder;
	@Autowired EmployeeMapper employeeMapper;
	@Autowired AddressMapper addressMapper;
	@Autowired FilesMapper filesMapper;
	
	// 진수우 : 사원 추가.
	public void addEmployee(EmployeeAddDTO employeeAddDTO) {
		Integer result = 0;
		
		// 파일정보 데이터베이스에 삽입.
		MultipartFile mf = employeeAddDTO.getEmployeePhoto(); // 폼에 입력되었던 파일데이터 가져옴.
		InputFile inputFile = new InputFile(); // inputFile 인스턴스 생성.
		inputFile.setOriginFileName(mf.getOriginalFilename()); // 파일의 실제이름을 추출해서 inputFile 인스턴스에 set.
		Files files = new Files();
		files.setFileName(inputFile.getUUID()); // 서버에서 관리되는 파일이름.
		files.setFileOrigin(inputFile.getFileName()); // 실제 파일이름.
		files.setFileExt(inputFile.getFileExt()); // 파일 확장자.
		files.setFileSize(mf.getSize()); // 파일 크기.
		files.setFileType(mf.getContentType()); // 파일 타입.
		files.setFileCategory("employee"); // 파일 카테고리.
		result += filesMapper.insertFile(files); // 파일정보 삽입.
		
		// 주소정보 데이터베이스에 삽입.
		Address address = new Address();
		address.setAddressName(employeeAddDTO.getAddressName());
		address.setAddressDetail(employeeAddDTO.getAddressDetail());
		address.setPostCode(employeeAddDTO.getPostCode());
		result += addressMapper.insertAddress(address);
		
		// 사원정보 데이터베이스에 삽입.
		Integer fileNo = files.getFileNo(); // 데이터베이스에 파일정보 삽입 시 자동으로 생성되는 fileNo값 가져옴.
		Integer addressNo = address.getAddressNo(); // 데이터베이스에 주소정보 삽입 시 자동으로 생성되는 addressNo값 가져옴.
		employeeAddDTO.setPhotoFileNo(fileNo);
		employeeAddDTO.setAddressNo(addressNo);
		employeeAddDTO.setEmployeePw(bCryptPasswordEncoder.encode("1234")); // 사원추가 시 임시비밀번호를 '1234'로 설정.
		result += employeeMapper.insertEmployee(employeeAddDTO);
		
		// 서버에 물리적 파일 저장.
		if (result == 3) {
			try {
				mf.transferTo(new File(System.getProperty("user.dir") + "/src/main/resources/static/upload/" + files.getFileName() + "." + files.getFileExt()));
			} catch (Exception e) {
				e.printStackTrace();
				throw new RuntimeException();
			}
		}
	}
	
	// 진수우 : 사원 리스트 출력.
	public List<EmployeeListDTO> getEmployeeList() {
		return employeeMapper.selectEmployeeList();
	}
	
	// 진수우 : 사원 인원수 조회.
	public Integer countEmployee() {
		return employeeMapper.countEmployee();
	}
}
