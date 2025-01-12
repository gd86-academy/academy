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
	
	// 버튼 클릭 시 addBoard.html로 이동하는 함수
    Alpine.data('navigate', () => ({
       redirectToAddBoard() {
            window.location.href = 'addBoard.html';  // 'addBoard.html'로 이동
        }
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
	
	// 테이블 출력
	Alpine.data('multicolumn', () => ({
	    datatable: null,
	    init() {
			// 현재 날짜에서 년과 월을 추출
			const now = new Date();
			const year = now.getFullYear(); // 현재 연도
			const month = String(now.getMonth() + 1).padStart(2, '0'); // 현재 월 (1월은 0부터 시작하므로 +1)
			
	        // AJAX 요청
	        $.ajax({
	            url: 'http://localhost/academy/restapi/annualLeaveList',
	            type: 'GET',
	            dataType: 'json',
				data: { month: `${year}-${month}` }, // 'YYYY-MM' 형식으로 전달
	            success: (data) => {
					this.datatable = new simpleDatatables.DataTable('#myTable', {
					    data: {
					        headings: ['번호', '시작날짜', '종료날짜', '신청일자', '승인날짜'],
					        data: data.map(item => [
								item[0], // 번호
					            item[1], // 시작날짜
					            item[2], // 종료날짜
					            item[3], // 신청일자
					            item[4], // 승인날짜								
					        ])
					    },
					    searchable: true,
					    perPage: 10,
					    perPageSelect: [10, 20, 30, 50, 100],
					
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
					
					// 행 클릭 이벤트
					document.querySelector('#myTable tbody').addEventListener('click', (e) => {
					    const rowElement = e.target.closest('tr'); // 클릭된 행의 인덱스.
					    if (rowElement) {
							const tdElements = rowElement.querySelectorAll('td');
							const boardNo = tdElements[0].textContent; // boardNo 데이터 추출.
							window.location.href = `/academy/attendanceApprovalOne?approvalNo=${approvalNo}`;
					    }
					});
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
	
	// 연차 통계
	Alpine.data('analytics', () => ({
		init() {
			// statistics
            setTimeout(() => {
                // followers
                this.followers = new ApexCharts(this.$refs.followers, this.followersOptions);
                this.followers.render();
            }, 300);
		},
		
	   get followersOptions() {
           return {
               series: [
                   {
                       data: [38, 60, 38, 52, 36, 40],
                   },
               ],
               chart: {
                   height: 160,
                   type: 'area',
                   fontFamily: 'Nunito, sans-serif',
                   sparkline: {
                       enabled: true,
                   },
               },
               stroke: {
                   curve: 'smooth',
                   width: 2,
               },
               colors: ['#4361ee'],
               grid: {
                   padding: {
                       top: 5,
                   },
               },
               yaxis: {
                   show: false,
               },
               tooltip: {
                   x: {
                       show: false,
                   },
                   y: {
                       title: {
                           formatter: (formatter = () => {
                               return '';
                           }),
                       },
                   },
               },
           };
       },
	}));
});