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
	    currentDate: new Date(), // 현재 날짜 저장 (초기값)

	    init() {
	        // 초기 데이터 로드
	        this.loadTableData(this.formatDateToMonth(this.currentDate));

	        // 이전 달 버튼 클릭 이벤트
	        document.getElementById("prevMonth").addEventListener("click", () => {
	            this.currentDate.setMonth(this.currentDate.getMonth() - 1); // 이전 달로 변경
	            this.updateMonthDisplay();
	            this.loadTableData(this.formatDateToMonth(this.currentDate));
	        });

	        // 다음 달 버튼 클릭 이벤트
	        document.getElementById("nextMonth").addEventListener("click", () => {
	            this.currentDate.setMonth(this.currentDate.getMonth() + 1); // 다음 달로 변경
	            this.updateMonthDisplay();
	            this.loadTableData(this.formatDateToMonth(this.currentDate));
	        });
	    },

	    // 'YYYY-MM' 형식으로 포맷
	    formatDateToMonth(date) {
	        const year = date.getFullYear();
	        const month = String(date.getMonth() + 1).padStart(2, '0');
	        return `${year}-${month}`;
	    },

	    // 화면 상단에 현재 월 표시
	    updateMonthDisplay() {
	        const currentMonthDisplay = document.getElementById("currentMonthDisplay");
	        currentMonthDisplay.textContent = this.formatDateToMonth(this.currentDate).replace('-', '.'); // 'YYYY.MM' 형식
	    },

	    // AJAX를 통한 테이블 데이터 로드
	    loadTableData(month) {
	        // 기존 테이블 제거
	        if (this.datatable) {
	            this.datatable.destroy();
	            document.querySelector('#myTable').innerHTML = ''; // 테이블 초기화
	        }

	        // AJAX 요청
	        $.ajax({
	            url: 'http://localhost/academy/restapi/annualLeaveList',
	            type: 'GET',
	            dataType: 'json',
	            data: { month }, // 'YYYY-MM' 형식으로 전달
	            success: (data) => {
	                // 테이블 데이터 설정
	                this.datatable = new simpleDatatables.DataTable('#myTable', {
	                    data: {
	                        headings: ['번호', '시작날짜', '종료날짜', '신청일자', '승인날짜', '신청종류'],
	                        data: data.map(item => [
	                            item[0], // 번호
	                            item[1], // 시작날짜
	                            item[2], // 종료날짜
	                            item[3], // 신청일자
	                            item[4], // 승인날짜
	                            item[5], // 신청종류								
	                        ])
	                    },
	                    searchable: false,
	                    perPage: 10,
	                    perPageSelect: [10, 20, 30, 50, 100],
	                    firstLast: false,
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
	                    const rowElement = e.target.closest('tr');
	                    if (rowElement) {
	                        const tdElements = rowElement.querySelectorAll('td');
	                        const approvalNo = tdElements[0].textContent; // approvalNo 데이터 추출
	                        window.location.href = `/academy/attendanceApprovalOne?approvalNo=${approvalNo}`;
	                    }
	                });
	            },
	            error: (xhr, status, error) => {
	                console.error('Error:', error);
	            }
	        });
	    },

	    // 날짜 포맷 (YYYY.MM.DD)
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

	Alpine.data('analytics', () => ({
	    init() {
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
	                    data: annualLeaveCountList,  // 서버에서 받은 연차 데이터 사용
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