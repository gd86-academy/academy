// html에서 userNo값 받아오기  console.log(myButton.value); // "submit"
const employeeNo = document.getElementById('employeeNo').value;
console.log("employeeNo는", employeeNo);
let datatable = null;

document.addEventListener('alpine:init', () => {
    // main section
    Alpine.data('scrollToTop', () => ({
        showTopButton: false,
        init() {
            window.onscroll = () => {
                this.scrollFunction();
            };
        },

        scrollFunction() {
            if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                this.showTopButton = true;
            } else {
                this.showTopButton = false;
            }
        },

        goToTop() {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        },
    }));

    // theme customization
    Alpine.data('customizer', () => ({
        showCustomizer: false,
    }));

    // sidebar section
    Alpine.data('sidebar', () => ({
        init() {
            const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
            if (selector) {
                selector.classList.add('active');
                const ul = selector.closest('ul.sub-menu');
                if (ul) {
                    let ele = ul.closest('li.menu').querySelectorAll('.nav-link');
                    if (ele) {
                        ele = ele[0];
                        setTimeout(() => {
                            ele.click();
                        });
                    }
                }
            }
        },
    }));

    // header section
    Alpine.data('header', () => ({
        notifications: [
            {
                id: 1,
                profile: 'user-profile.jpeg',
                message: '<strong class="text-sm mr-1">John Doe</strong>invite you to <strong>Prototyping</strong>',
                time: '45 min ago',
            },
            {
                id: 2,
                profile: 'profile-34.jpeg',
                message: '<strong class="text-sm mr-1">Adam Nolan</strong>mentioned you to <strong>UX Basics</strong>',
                time: '9h Ago',
            },
        ],
    }));
	
	Alpine.data('contacts', () => ({
		editUser(user) {
            this.params = this.defaultParams;
            if (user) {
                this.params = JSON.parse(JSON.stringify(user));
            }

            this.addContactModal = true;
        },
	}));
	
	
	// 테이블 출력
	Alpine.data('multicolumn', () => ({
	    init() {
	        // AJAX 요청
	        $.ajax({
	            url: 'http://localhost/academy/restapi/attendanceApprovalList',
	            type: 'GET',
				data: {employeeNo: employeeNo},	// employeeNo값을 전달
	            dataType: 'json',
	            success: (data) => {
					datatable = new simpleDatatables.DataTable('#myTable', {
					    data: {
					        headings: ['번호', '제목', '신청종류', '신청자', '결재상태'],
					        data: data.map(item => [
								item[0], // 신청번호
								item[1], // 제목								
					            item[2], // 신청종류
					            item[3], // 신청자
								item[4], // 결재상태
					        ])
					    },
					    searchable: true,
					    perPage: 10,
					    perPageSelect: [10, 20, 30, 50, 100],
						
					    columns: [
					        
					    ],
					
	                    firstLast: true,
	                    firstText:
	                        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>',
	                    lastText:
	                        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M11 19L17 12L11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M6.99976 19L12.9998 12L6.99976 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>',
	                    prevText:
	                        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M15 5L9 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>',
	                    nextText:
	                        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>',
	                    labels: {
	                        perPage: '{select}',
	                    },
	                    layout: {
	                        top: '{search}',
	                        bottom: '{info}{select}{pager}',
	                    },
						
	                });
					/*
					// 행 클릭 이벤트
					document.querySelector('#myTable tbody').addEventListener('click', (e) => {
					    const rowElement = e.target.closest('tr'); // 클릭된 행의 인덱스.
					    if (rowElement) {
							const tdElements = rowElement.querySelectorAll('td');
							const lectureNo = tdElements[0].textContent; // 두번째 열 데이터 추출.
							window.location.href = `/academy/lectureOne?lectureNo=${lectureNo}`;
					    }
					});*/
	            },
	            error: (xhr, status, error) => {
	                console.error('Error:', error);
	            }
	        });
	    },
			
	    formatDate(date) {
	        if (date) {
	            const dt = new Date(date);
	            const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
	            const day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
	            return dt.getFullYear() + '.' + month + '.' + day;
	        }
	        return '';
	    },
		
		
		
	}));
});
// 강의신청서 버튼 클릭시
$('#lectureApprovalBtn').click(function() {
	
	// 버튼 클래스 수정
	$(this).removeClass('btn-outline-primary').addClass('btn-primary');
	$(attendanceApprovalBtn).removeClass('btn-primary').addClass('btn-outline-primary');
	
	// Alpine store에 있는 datatable을 참조하려면 먼저 그 존재 여부를 확인합니다.
    const alpineComponent = Alpine.store('multicolumn'); 
	
	
	// 테이블 존재 여부 확인 후 datatable 초기화
    const tableElement = $('#myTable');
	// 기존 DataTable이 있으면 제거하고 테이블 내용도 초기화
   if (datatable) {
       datatable.destroy();  // 기존 DataTable 제거
       datatable = null;      // datatable 변수 초기화
   }
   tableElement.empty();  // 기존 테이블 내용 비우기
	
	$.ajax({
		url: 'http://localhost/academy/restapi/lectureApprovalList',
		type: 'GET',
		data: {employeeNo: employeeNo},	// employeeNo값을 전달
		dataType: 'json',
		success: (data) => {
			console.log('AJAX 요청 성공:', data); // 데이터 확인
			
			
			datatable = new simpleDatatables.DataTable('#myTable', {
				data: {
					headings: ['번호', '제목', '신청자', '결재상태'],
					data: data.map(item => [
						item[0], // 신청번호
						item[1], // 제목		
						item[2], // 신청자
						item[3], // 결재상태
					])
				},
				searchable: true,
				perPage: 10,
				perPageSelect: [10, 20, 30, 50, 100],
				
				columns: [
					
				],
			
				firstLast: true,
				firstText:
					'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>',
				lastText:
					'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M11 19L17 12L11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M6.99976 19L12.9998 12L6.99976 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>',
				prevText:
					'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M15 5L9 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>',
				nextText:
					'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>',
				labels: {
					perPage: '{select}',
				},
				layout: {
					top: '{search}',
					bottom: '{info}{select}{pager}',
				},
				
			});
			// Alpine 스토어에 새 테이블 객체 저장
           Alpine.store('datatable', datatable);
		   console.log('새로운 테이블 객체:', datatable);
			
			// 행 클릭 이벤트
			document.querySelector('#myTable tbody').addEventListener('click', (e) => {
				const rowElement = e.target.closest('tr'); // 클릭된 행의 인덱스.
				if (rowElement) {
					const tdElements = rowElement.querySelectorAll('td');
					const lectureApprovalNo = tdElements[0].textContent; // 두번째 열 데이터 추출.
					window.location.href = `/academy/lectureApprovalOne?lectureApprovalNo=${lectureApprovalNo}`;
				}
			});
		},
		error: (xhr, status, error) => {
			console.error('Error:', error);
		}
	});
});
// 근태신청서 버튼 클릭시
$('#attendanceApprovalBtn').click(function() {
	// 버튼 클래스 수정
	$(this).removeClass('btn-outline-primary').addClass('btn-primary');	
	$(lectureApprovalBtn).removeClass('btn-primary').addClass('btn-outline-primary');	
	
	// Alpine store에 있는 datatable을 참조하려면 먼저 그 존재 여부를 확인합니다.
    const alpineComponent = Alpine.store('multicolumn'); 
	
	
	// 테이블 존재 여부 확인 후 datatable 초기화
    const tableElement = $('#myTable');
	// 기존 DataTable이 있으면 제거하고 테이블 내용도 초기화
   if (datatable) {
       datatable.destroy();  // 기존 DataTable 제거
       datatable = null;      // datatable 변수 초기화
   }
   tableElement.empty();  // 기존 테이블 내용 비우기
	
	$.ajax({
		url: 'http://localhost/academy/restapi/attendanceApprovalList',
		type: 'GET',
		data: {employeeNo: employeeNo},	// employeeNo값을 전달
		dataType: 'json',
		success: (data) => {
			console.log('AJAX 요청 성공:', data); // 데이터 확인
			
			
			datatable = new simpleDatatables.DataTable('#myTable', {
				data: {
			        headings: ['번호', '제목', '신청종류', '신청자', '결재상태'],
			        data: data.map(item => [
						item[0], // 신청번호
						item[1], // 제목								
			            item[2], // 신청종류
			            item[3], // 신청자
						item[4], // 결재상태
			        ])
			    },
				searchable: true,
				perPage: 10,
				perPageSelect: [10, 20, 30, 50, 100],
				
				columns: [
					
				],
			
				firstLast: true,
				firstText:
					'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>',
				lastText:
					'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M11 19L17 12L11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M6.99976 19L12.9998 12L6.99976 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>',
				prevText:
					'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M15 5L9 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>',
				nextText:
					'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>',
				labels: {
					perPage: '{select}',
				},
				layout: {
					top: '{search}',
					bottom: '{info}{select}{pager}',
				},
				
			});
			// Alpine 스토어에 새 테이블 객체 저장
           Alpine.store('datatable', datatable);
		   console.log('새로운 테이블 객체:', datatable);
			/*
			// 행 클릭 이벤트
			document.querySelector('#myTable tbody').addEventListener('click', (e) => {
				const rowElement = e.target.closest('tr'); // 클릭된 행의 인덱스.
				if (rowElement) {
					const tdElements = rowElement.querySelectorAll('td');
					const lectureNo = tdElements[0].textContent; // 두번째 열 데이터 추출.
					window.location.href = `/academy/lectureOne?lectureNo=${lectureNo}`;
				}
			});*/
		},
		error: (xhr, status, error) => {
			console.error('Error:', error);
		}
	});
});
