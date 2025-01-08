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
	
	// 개강일 캘린더
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
	
	// 종강일 캘린더
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


// 강의 수정 (강의날짜(개강/종강일), 강의명, 강의내용) 유효성검사
$('#lectureModifyBtn').click(function() {
    let isVal = true;
 	// 강의명 검사
    if ($('#lectureName').val().trim() === '') {
        $('.lectureName-error').show();
        $('#lectureName').addClass("errorInput");
        isVal = false;
    } else {
        $('.lectureName-error').hide();
        $('#lectureName').removeClass("errorInput");
    }
    
 	// 강의내용 검사
    if ($('#lectureContent').val().trim() === '') {
        $('.lectureContent-error').show();
        $('#lectureContent').addClass("textarea-error");
        isVal = false;
    } else {
        $('.lectureContent-error').hide();
        $('#lectureContent').removeClass("textarea-error");
    }
 	
    // 폼 제출
    if (isVal) {
        console.log("submit 성공");
        $('#lectureModifyForm').submit();
    }
});
