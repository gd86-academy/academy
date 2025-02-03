package com.example.academy.controller;

import java.util.List;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

import com.example.academy.service.CommonService;
import com.example.academy.vo.Common;

@ControllerAdvice
public class GlobalControllerAdvice {

    private final CommonService commonService;

    public GlobalControllerAdvice(CommonService commonService) {
        this.commonService = commonService;
    }

    @ModelAttribute("boardCategory")
    public List<Common> boardCategoryList() {
        return commonService.getBoardCategory();
    }
}
