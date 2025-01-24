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
cancelButtonLectureDelete.addEventListener('click', closeModalLectureDelete);     // 취소 버튼 클릭 