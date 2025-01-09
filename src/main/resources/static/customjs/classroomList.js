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
								`<button type="button" class="btn btn-dark" onclick="openModifyModal(${item[0]})" >수정</button>`, // 수정 버튼
								`<button type="button" class="btn btn-danger" onclick="openDeleteModal(${item[0]})">삭제</button>`  // 삭제 버튼
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
const openModalButtonAddClassroom = document.getElementById('openModalButtonAddClassroom'); // 등록 모달 열기 버튼
const closeModalButtonAddClassroom = document.getElementById('closeModalButtonAddClassroom'); // 등록 모달 닫기 버튼
const cancelButtonAddClassroom = document.getElementById('cancelButtonAddClassroom'); // 등록 모달 취소 버튼
const modalBackgroundAddClassroom = document.getElementById('modalBackgroundAddClassroom');
const modalWrapperAddClassroom = document.getElementById('modalWrapperAddClassroom');

// 강의실 등록 모달 열기
openModalButtonAddClassroom.addEventListener('click', () => {
  modalBackgroundAddClassroom.classList.remove('hidden');  // 모달 배경 보이기
  modalBackgroundAddClassroom.classList.add('block');     // 모달 배경 보이게 설정
});

// 강의실 등록 모달 닫기
const closeModalAddClassroom = () => {
  modalBackgroundAddClassroom.classList.remove('block');
  modalBackgroundAddClassroom.classList.add('hidden');  // 모달 배경 숨기기
  // 모달 내부의 모든 입력 필드를 초기화
  const addForm = document.getElementById('classroomAddForm');
  addForm.reset(); // 모든 입력 필드와 라디오 버튼 초기화
  $('input').removeClass('errorInput');
  // 모든 에러 라벨 숨기기
  $('.error-label').hide();
};

closeModalButtonAddClassroom.addEventListener('click', closeModalAddClassroom); // 닫기 버튼 클릭 시
cancelButtonAddClassroom.addEventListener('click', closeModalAddClassroom); // 취소 버튼 클릭 시

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

// 강의실 수정 모달 관련 DOM 요소 
const openModifyModalButton = document.getElementById('openModifyModalButton');
const closeModifyModalButton = document.getElementById('closeModifyModalButton');
const modalModifyBackground = document.getElementById('modalModifyBackground');
const modalModifyWrapper = document.getElementById('modalModifyWrapper');
const cancelModifyButton = document.getElementById('cancelModifyButton');
const submitModifyButton = document.getElementById('classroomModifyButton');


// 모달 열기
const openModifyModal = (classroomNo) => {
  $.ajax({
    url: `http://localhost/academy/modifyClassroom?classroomNo=${classroomNo}`,
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      document.getElementById('classroomNo').value = data.classroomNo;
      document.getElementById('classroomName').value = data.classroomName;
      document.getElementById('classroomManager').value = data.classroomManager;
      document.getElementById('classroomCapacity').value = data.classroomCapacity;

      modalModifyBackground.classList.remove('hidden');
      modalModifyBackground.classList.add('block');
    },
    error: (xhr, status, error) => {
      console.error('Error fetching meeting room details:', error);
      alert('강의실 정보를 가져오는 데 실패했습니다.');
    },
  });
};

// 모달 닫기
const closeModifyModal = () => {
  modalModifyBackground.classList.remove('block');
  modalModifyBackground.classList.add('hidden');
  document.getElementById('classroomModifyForm').reset();
  $('input').removeClass('errorInput');
  $('.error-label').hide();
};

closeModifyModalButton.addEventListener('click', closeModifyModal);
cancelModifyButton.addEventListener('click', closeModifyModal);

// 수정 버튼 클릭 이벤트
submitModifyButton.addEventListener('click', function(e) {
  e.preventDefault();
  
  if (validateForm()) {
    const formData = new FormData(document.getElementById('classroomModifyForm'));
    
    $.ajax({
      url: 'http://localhost/academy/modifyClassroom',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(response) {
        alert('회의실이 성공적으로 수정되었습니다.');
        closeModifyModal();
        // 테이블 새로고침
        if (window.multicolumn && window.multicolumn.datatable) {
          window.multicolumn.init();
        } else {
          location.reload();
        }
      },
      error: function(xhr, status, error) {
        alert('회의실 수정에 실패했습니다.');
        console.error(error);
      }
    });
  }
});

// 폼 유효성 검사 함수
function validateForm() {
  let isValid = true;
  
  // 강의실명
  if ($('#classroomName').val().trim() === '') {
    $('#classroomName').addClass("errorInput");
    $('.classroomName-error').show();
    isValid = false;
  } else {
    $('#classroomName').removeClass("errorInput");
    $('.classroomName-error').hide();
  }

  // 담당자
  if ($('#classroomManager').val().trim() === '') {
    $('#classroomManager').addClass("errorInput");
    $('.classroomManager-error').show();
    isValid = false;
  } else {
    $('#classroomManager').removeClass("errorInput");
    $('.classroomManager-error').hide();
  }

  // 수용인원
  if ($('#classroomCapacity').val().trim() === '') {
    $('#classroomCapacity').addClass("errorInput");
    $('.classroomCapacity-error').show();
    isValid = false;
  } else {
    $('#classroomCapacity').removeClass("errorInput");
    $('.classroomCapacity-error').hide();
  }

  return isValid;
}


// 강의실 삭제 모달
const openModalButtonDeleteClassroom = document.getElementById('openModalButtonDeleteClassroom'); // 삭제 모달 열기 버튼
const closeModalButtonDeleteClassroom = document.getElementById('closeModalButtonDeleteClassroom'); // 삭제 모달 닫기 버튼
const cancelButtonDeleteClassroom = document.getElementById('cancelButtonDeleteClassroom'); // 삭제 모달 취소 버튼
const modalBackgroundDeleteClassroom = document.getElementById('modalBackgroundDeleteClassroom');
const modalWrapperDeleteClassroom = document.getElementById('modalWrapperDeleteClassroom');
const deleteClassroomLabel = document.getElementById('deleteClassroomLabel');

// 삭제 모달 열기 함수 (강의실 번호를 받아서 데이터 세팅)
const openDeleteModal = (classroomNo) => {
    // 강의실 번호 표시
    deleteClassroomLabel.innerText = classroomNo;

    // 삭제 확인 버튼 클릭 이벤트 설정
    openModalButtonDeleteClassroom.onclick = () => {
        // 서버로 요청 전송
        window.location.href = `/academy/removeClassroom?classroomNo=${classroomNo}`;
    };

    // 모달 보이기
    modalBackgroundDeleteClassroom.classList.remove('hidden');
    modalBackgroundDeleteClassroom.classList.add('block');
};

// 모달 닫기 함수
const closeDeleteModal = () => {
    modalBackgroundDeleteClassroom.classList.remove('block');
    modalBackgroundDeleteClassroom.classList.add('hidden');
};

// 버튼 이벤트 리스너 설정
closeModalButtonDeleteClassroom.addEventListener('click', closeDeleteModal);
cancelButtonDeleteClassroom.addEventListener('click', closeDeleteModal);





