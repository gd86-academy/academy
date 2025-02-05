package com.example.academy.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	// 단방향 암호화 메서드.
	@Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // BCryptPasswordEncoder로 빈 등록
    }
	
	// 권한 부여 메서드.
	@Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http.authorizeHttpRequests((auth) -> auth
        	.requestMatchers("/resources/**", "/static/**", "/css/**", "/js/**", "/images/**", "/upload/**", "/customjs/**").permitAll() // CSS, JS, 이미지 파일 접근 허용
            .requestMatchers("/login", "/loginProc", "/join", "/joinProc").permitAll()
            // .requestMatchers("/all/**").hasAnyRole("management", "humanresources", "Administration") // 모든사원
            .requestMatchers("/management/**").hasRole("management") // 운영팀
            .requestMatchers("/humanresources/**").hasRole("humanresources") // 인사팀
            .requestMatchers("/Administration/**").hasRole("Administration") // 행정팀
            
            //.anyRequest().permitAll()
            .anyRequest().authenticated() // 위에 등록되지 않은 경로는 로그인된 사원만 접근가능하도록 설정.
        );
        
        
        http
    	.formLogin((auth) -> auth.loginPage("/login")
    				.loginProcessingUrl("/loginProc")
    				.defaultSuccessUrl("/main", true)  // 로그인 성공 후 이동할 URL 설정
    				.permitAll()
        )
		.logout((logout) -> logout
		        .logoutUrl("/logout") // 로그아웃 URL (기본값은 "/logout")
		        .logoutSuccessUrl("/login") // 로그아웃 성공 후 이동할 URL
		        .invalidateHttpSession(true) // 세션 무효화
		        // .deleteCookies("") // 로그아웃 시 삭제할 쿠키
		        .permitAll()
		);

        http.csrf((auth) -> auth.disable()); // 사이트 위변조 설정해제. (개발환경에서는 편의성을 위해 사용하지 않음)        
        return http.build();
    }
}
