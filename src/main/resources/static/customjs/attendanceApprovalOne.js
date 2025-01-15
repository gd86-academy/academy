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
	

	// 작성날짜 캘린더
	Alpine.data("form", () => ({
	    init() {
			// 오늘 날짜를 YYYY-MM-DD 형식으로 변환
			const today = new Date().toISOString().split('T')[0];
			// 입력 필드에 기본값으로 오늘 날짜 설정
            const inputField = document.getElementById('todayDate');
            inputField.value = today;
			
			// Flatpickr 초기화
	        flatpickr(inputField, {
	            dateFormat: 'Y-m-d',	// 날짜 형식 설정 (예: 2025-01-08)
	            defaultDate: today, // 기본 날짜를 오늘 날짜로 설정
	        });
	    },
	}));
	
	// 신청 시작날짜 캘린더
	Alpine.data("form1", () => ({
        init() {
            const defaultDate1 = document.getElementById('beginDate').value;
			// Flatpickr 초기화
            flatpickr(document.getElementById('beginDate'), {
                dateFormat: 'Y-m-d',	// 날짜 형식 설정 (예: 2025-01-08)
                //defaultDate: defaultDate1, // 기본값 설정 
            });
        },
    }));
	
	// 신청 종료날짜 캘린더
	Alpine.data("form2", () => ({
        init() {
            const defaultDate1 = document.getElementById('endDate').value;
			// Flatpickr 초기화
            flatpickr(document.getElementById('endDate'), {
                dateFormat: 'Y-m-d',	// 날짜 형식 설정 (예: 2025-01-08)
                //defaultDate: defaultDate1, // 기본값 설정 
            });
        },
    }));
	
	
	
});






// 유효성 검사 




// 밑에부터 모달관련

