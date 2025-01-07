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
	    datatable: null,
	    init() {
	        // AJAX 요청
	        $.ajax({
	            url: 'http://localhost/academy/restapi/classroomList',
	            type: 'GET',
	            dataType: 'json',
	            success: (data) => {
					this.datatable = new simpleDatatables.DataTable('#classroomTable', {
					    data: {
					        headings: ['강의실번호', '강의실명', '담당자', '수정', '삭제'],
					        data: data.map(item => [
								item[0], // 강의실 번호
					            item[1], // 강의실명
					            item[5], // 담당자 이름
								`<button type="button" class="btn btn-dark" onclick="openModalButtonModifyClassroom(${item[0]})">수정</button>`, // 수정 버튼
								`<button type="button" class="btn btn-danger" onclick="openModalButtonDeleteClassroom(${item[0]})">삭제</button>`  // 삭제 버튼
					        ])
					    },
					    searchable: true,
					    perPage: 10,
					    perPageSelect: [10, 20, 30, 50, 100],
						
					    columns: [
					        {
					            select: 6,
								sortable: false,
					        },
					        {
					            select: 7,
								sortable: false,
					        },
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

// 강의실 등록 모달 관련 DOM 요소
const openModalButtonAddClassroom = document.getElementById('openModalButtonAddClassroom');
const closeModalButtonAddClassroom = document.getElementById('closeModalButtonAddClassroom');
const openModalButtonModifyClassroom = document.getElementById('openModalButtonModifyClassroom');
const closeModalButtonModifyClassroom = document.getElementById('closeModalButtonModifyClassroom');
const openModalButtonDeleteClassroom = document.getElementById('openModalButtonDeleteClassroom');
const closeModalButtonDeleteClassroom = document.getElementById('closeModalButtonDeleteClassroom');
const modalBackground = document.getElementById('modalBackground');
const modalWrapper = document.getElementById('modalWrapper');
const cancelButton = document.getElementById('cancelButton');

// 모달 열기
openModalButtonAddClassroom.addEventListener('click', () => {
  modalBackground.classList.remove('hidden');  // 모달 배경 보이기
  modalBackground.classList.add('block');     // 모달 배경 보이게 설정
});

// 모달 닫기
const closeModal = () => {
  modalBackground.classList.remove('block');
  modalBackground.classList.add('hidden');  // 모달 배경 숨기기
  // 모달 내부의 모든 입력 필드를 초기화
  const form = document.getElementById('classroomAddForm');
  form.reset(); // 모든 입력 필드와 라디오 버튼 초기화
  $('input').removeClass('errorInput');
  // 모든 에러 라벨 숨기기
  $('.error-label').hide();
};

closeModalButtonAddClassroom.addEventListener('click', closeModal); // 닫기 버튼 클릭 시
cancelButton.addEventListener('click', closeModal);     // 취소 버튼 클릭 시

// 강의실 등록 유효성검사
$('#classroomAddBtn').click(function(){
	let isVal = true;
	if($('#classroomName').val().trim() === '') {
		$('#classroomName').addClass("errorInput");
		$('.classroomName-error').show();
		isVal = false;
	} else {
		$('#classroomName').removeClass("errorInput");
		$('.classroomName-error').hide();
	}
	if($('#classroomManager').val().trim() === '') {
		$('#classroomManager').addClass("errorInput");
		$('.classroomManager-error').show();
		isVal = false;
	} else {
		$('#classroomManager').removeClass("errorInput");
		$('.classroomManager-error').hide();
	}
	if($('#classroomCapacity').val().trim() === '') {
		$("#classroomCapacity").addClass("errorInput");
		$('.classroomCapacity-error').show();
		isVal = false;
	} else {
		$('#classroomCapacity').removeClass("errorInput");
		$('.classroomCapacity-error').hide();
	}
	if (isVal) {
        console.log("submit 성공");
        $('#classroomAddForm').submit();
    }
});

