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
	
	// 사원 등록 생년월일
	document.addEventListener('DOMContentLoaded', function () {
	    const beginDateInput = document.getElementById('beginDate');
	    const endDateInput = document.getElementById('endDate');

	    // Flatpickr 초기화 - 종강일 
	    const endDatePicker = flatpickr(endDateInput, {
	        dateFormat: 'Y-m-d',
	        clickOpens: false, // 초기에는 비활성화
	    });

	    // Flatpickr 초기화 - 개강일
	    flatpickr(beginDateInput, {
	        dateFormat: 'Y-m-d',
	        onChange: (selectedDates) => {
				
	            if (selectedDates.length > 0) {
	                const selectedDate = selectedDates[0];

	                // 종강일 캘린더 활성화 및 최소 날짜 설정
	                endDateInput.disabled = false;
	                endDatePicker.set('minDate', selectedDate); // 최소 날짜 설정
	                endDatePicker.set('clickOpens', true); // 달력 활성화
	            } else {
	                // 개강일 선택 해제 시 종강일 초기화 및 비활성화
	                endDatePicker.clear();
	                endDateInput.disabled = true;
	                endDatePicker.set('clickOpens', false); // 달력 비활성화
	            }
	        },
	    });

	    // 초기 상태에서 종강일 비활성화
	    endDateInput.disabled = true;
	});
});
