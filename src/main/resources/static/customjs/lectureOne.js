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
	
	
	
});
/*
// 개인정보 수정 유효성 검사 
$('#employeeModifyBtn').click(function() {
    let isVal = true;
 	// 이름 검사
    if ($('#employeeName').val().trim() === '') {
        $('.employeeName-error').show();
        $('#employeeName').addClass("errorInput");
        isVal = false;
    } else {
        $('.employeeName-error').hide();
        $('#employeeName').removeClass("errorInput");
    }
    
 	// 전화번호 검사
    if ($('#employeePhone').val().trim() === '') {
        $('.employeePhone-error').show();
        $('#employeePhone').addClass("errorInput");
        isVal = false;
    } else {
        $('.employeePhone-error').hide();
        $('#employeePhone').removeClass("errorInput");
    }

    // 이메일 검사
    if ($('#employeeMail').val().trim() === '') {
        $('#employeeMail').addClass("errorInput");
        $('.employeeMail-error').show();
        isVal = false;
    } else {
        $('.employeeMail-error').hide();
        $('#employeeMail').removeClass("errorInput");
    }
    
 	// 생년월일 검사
    if ($('#employeeBirth').val().trim() === '') {
        $('#employeeBirth').addClass("errorInput");
        $('.employeeBirth-error').show();
        isVal = false;
    } else {
        $('.employeeBirth-error').hide();
        $('#employeeBirth').removeClass("errorInput");
    }
 
 	// 주소 검사
    if ($('#employeeAddress').val().trim() === '' || $('#employeeAddressDetail').val().trim() === '' || $('#employeePostalCode').val().trim() === '') {
        $('#employeeAddress').addClass("errorInput");
        $('#employeeAddressDetail').addClass("errorInput");
        $('#employeePostalCode').addClass("errorInput");
        $('.employeeAddress-error').show();
        isVal = false;
    } else {
    	$('.employeeAddress-error').hide();
        $('#employeeAddressDetail').removeClass("errorInput");
        $('#employeePostalCode').removeClass("errorInput");
        $('#employeeAddress').removeClass("errorInput");
    }
 	
    // 폼 제출
    if (isVal) {
        console.log("submit 성공");
        $('#employeeModifyForm').submit();
    }
});
*/
// 강의삭제 모달 관련 DOM 요소
const openModalButtonLectureDelete = document.getElementById('openModalButtonLectureDelete');		// 강의상세페이지 [삭제]버튼
const closeModalButtonLectureDelete = document.getElementById('closeModalButtonLectureDelete');		// 삭제모달 [x]버튼
const modalBackgroundLectureDelete = document.getElementById('modalBackgroundLectureDelete');
const modalWrapperLectureDelete = document.getElementById('modalWrapperLectureDelete');
const cancelButtonLectureDelete = document.getElementById('cancelButtonLectureDelete');		// 삭제모달 [취소]버튼

// 강의삭제 모달 열기
openModalButtonLectureDelete.addEventListener('click', () => {
  modalBackgroundLectureDelete.classList.remove('hidden');  // 모달 배경 보이기
  modalBackgroundLectureDelete.classList.add('block');     // 모달 배경 보이게 설정
});

// 강의삭제 모달 닫기
const closeModalLectureDelete = () => {
  modalBackgroundLectureDelete.classList.remove('block');
  modalBackgroundLectureDelete.classList.add('hidden');  // 모달 배경 숨기기
  
};

closeModalButtonLectureDelete.addEventListener('click', closeModalLectureDelete); // [x]버튼 클릭 시
cancelButtonLectureDelete.addEventListener('click', closeModalLectureDelete);     // 취소 버튼 클릭 시