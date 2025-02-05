package com.example.academy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@EnableScheduling // 스케줄러 기능 활성화
public class AcademyApplication implements WebMvcConfigurer {

	public static void main(String[] args) {
		SpringApplication.run(AcademyApplication.class, args);
	}
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/upload/**").addResourceLocations("file:/home/ubuntu/apache-tomcat-10.1.34/webapps/upload"); // 리눅스 OS
	}

}
