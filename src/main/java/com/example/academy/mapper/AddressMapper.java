package com.example.academy.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.example.academy.vo.Address;

@Mapper
public interface AddressMapper {
	
	// 진수우 : 주소 저장.
	Integer insertAddress(Address address);
}
