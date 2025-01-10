package com.example.academy.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.example.academy.dto.TreeNode;
import com.example.academy.service.TreeNodeService;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
public class TreeNodeRestController {
	@Autowired TreeNodeService treeNodeService;
	
	// 진수우 : 결재선추가에있는 ToastUI Tree API에 사원리스트를 제공.
	@GetMapping("/restapi/employeeListNode")
	public List<TreeNode> employeeListNode() {
		return treeNodeService.getEmployeeTreeNode();
	}
	
}
