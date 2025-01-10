package com.example.academy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.example.academy.dto.BoardDTO;
import com.example.academy.dto.BoardListDTO;
import com.example.academy.mapper.BoardFileMapper;
import com.example.academy.mapper.BoardMapper;
import com.example.academy.mapper.FilesMapper;
import com.example.academy.util.InputFile;
import com.example.academy.vo.BoardFile;
import com.example.academy.vo.Files;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
public class BoardService {
	@Autowired BoardMapper boardMapper;
	@Autowired FilesMapper filesMapper;
	@Autowired BoardFileMapper boardFileMapper;
	
	public Integer updateBoardYN(Integer boardNo) {
		return boardMapper.updateBoardYN(boardNo);
	}
	
	// 공지사항 수정
	public void updateBoard(BoardDTO boardDTO) {
		Integer boardRow = boardMapper.updateBoard(boardDTO);
		log.debug("boardRow = " + boardRow);
		
		List<MultipartFile> files = boardDTO.getBoardFiles(); // 폼에 입력되었던 파일데이터 가져옴.
		
		// 파일이 첨부되지 않은 경우, files가 null일 수 있으므로 null 체크 후, 비어있는 리스트로 처리
	    if (files == null || files.isEmpty()) {
	        log.debug("No files to upload");
	    } else {
	        // 파일이 첨부된 경우 파일 처리 로직 실행
		// 파일정보 데이터베이스에 삽입.
	    	for(MultipartFile mf : files) {
				
	    		InputFile inputFile = new InputFile(); // inputFile 인스턴스 생성.
				inputFile.setOriginFileName(mf.getOriginalFilename()); // 파일의 실제이름을 추출해서 inputFile 인스턴스에 set.
				
				Files file = new Files();
				file.setFileName(inputFile.getUUID()); // 서버에서 관리되는 파일이름.
				file.setFileOrigin(inputFile.getFileName()); // 실제 파일이름.
				file.setFileExt(inputFile.getFileExt()); // 파일 확장자.
				file.setFileSize(mf.getSize()); // 파일 크기.
				file.setFileType(mf.getContentType()); // 파일 타입.
				file.setFileCategory("employee"); // 파일 카테고리.
				Integer fileRow = filesMapper.updateFile(file); // 파일정보 삽입.
				log.debug("fileRow = " + fileRow);
			
	    	}
		}
	}
	
	
	// 상세 공지사항 
	public BoardDTO boardOne(Integer boardNo) {
		
		// boardNo 해당 게시물을 조회 시 조회 수 증가
		boardMapper.updateBoardCount(boardNo);
		
		// 게시물 상세 조회
		BoardDTO boardDTO = boardMapper.selectBoardOne(boardNo);
		log.debug("boardDTO -----> " + boardDTO);
		
		// 날짜를 2025-01-09 형식으로 넘기기
		boardDTO.setUpdateDate(boardDTO.getUpdateDate().substring(0, 10));
		
		return boardDTO;
	}
	
	// 공지사항 추가
	public void addBoard(BoardDTO boardDTO) {
		Integer boardRow = boardMapper.insertBoard(boardDTO);
		log.debug("boardRow = " + boardRow);
		Integer boardNo = boardDTO.getBoardNo();
		log.debug("boardNo = " + boardNo);
		
		List<MultipartFile> files = boardDTO.getBoardFiles(); // 폼에 입력되었던 파일데이터 가져옴.
		
		// 파일이 첨부되지 않은 경우, files가 null일 수 있으므로 null 체크 후, 비어있는 리스트로 처리
	    if (files == null || files.isEmpty()) {
	        log.debug("No files to upload");
	    } else {
	        // 파일이 첨부된 경우 파일 처리 로직 실행
			// 파일정보 데이터베이스에 삽입.
			for(MultipartFile mf : files) {					
				
				InputFile inputFile = new InputFile(); // inputFile 인스턴스 생성.
				inputFile.setOriginFileName(mf.getOriginalFilename()); // 파일의 실제이름을 추출해서 inputFile 인스턴스에 set.
				
				Files file = new Files();
				file.setFileName(inputFile.getUUID()); // 서버에서 관리되는 파일이름.
				file.setFileOrigin(inputFile.getFileName()); // 실제 파일이름.
				file.setFileExt(inputFile.getFileExt()); // 파일 확장자.
				file.setFileSize(mf.getSize()); // 파일 크기.
				file.setFileType(mf.getContentType()); // 파일 타입.
				file.setFileCategory("employee"); // 파일 카테고리.
				Integer fileRow = filesMapper.insertFile(file); // 파일정보 삽입.
				log.debug("fileRow = " + fileRow);
				Integer fileNo = file.getFileNo();
				log.debug("fileNo = " + fileNo);
				
				BoardFile boardFile = new BoardFile();
				boardFile.setBoardNo(boardNo);
				boardFile.setFileNo(fileNo);
				Integer boardFileRow = boardFileMapper.insertBoardFile(boardFile);
				log.debug("boardFileRow = " + boardFileRow);			
			
			}
	    }
	}
	
	// 공지사항 리스트 조회
	public List<BoardListDTO> getBoardList() {
		List<BoardListDTO> boardList = boardMapper.selectBoardList();
		for(BoardListDTO board : boardList) {
			board.setUpdateDate(board.getUpdateDate().substring(0, 10));
		}
		return boardList;
	}
	
}
