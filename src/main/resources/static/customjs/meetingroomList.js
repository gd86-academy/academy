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
	            url: 'http://localhost/academy/restapi/MeetingRoomList',
	            type: 'GET',
	            dataType: 'json',
	            success: (data) => {
					this.datatable = new simpleDatatables.DataTable('#meetingroomTable', {
					    data: {
					        headings: ['회의실번호', '회의실명', '담당자', '수용인원수', '수정', '삭제'],
							data: data.map(item => [
							    item[0], // 회의실 번호
							    item[1], // 회의실명
							    item[2], // 담당자 이름
							    item[3], // 수용 인원
							    `<button type="button" class="btn btn-dark" onclick="openModifyModal(${item[0]})">수정</button>`, // 수정 버튼
							    `<button type="button" class="btn btn-danger" onclick="openDeleteModal(${item[0]})">삭제</button>`  // 삭제 버튼
							])
					    },
					    searchable: true,
					    perPage: 10,
					    perPageSelect: [10, 20, 30, 50, 100],
						
					    columns: [
					        {
					            select: 4,
								sortable: false,
					        },
					        {
					            select: 5,
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
// 모달 관련 DOM 요소
const openModalButton = document.getElementById('openModalButton');
const closeModalButton = document.getElementById('closeModalButton');
const modalBackground = document.getElementById('modalBackground');
const modalWrapper = document.getElementById('modalWrapper');
const cancelButton = document.getElementById('cancelButton');

// 모달 열기
openModalButton.addEventListener('click', () => {
  modalBackground.classList.remove('hidden');  // 모달 배경 보이기
  modalBackground.classList.add('block');     // 모달 배경 보이게 설정
});

// 모달 닫기
const closeModal = () => {
  modalBackground.classList.remove('block');
  modalBackground.classList.add('hidden');  // 모달 배경 숨기기
  // 모달 내부의 모든 입력 필드를 초기화
  const form = document.getElementById('meetingroomAddForm');
  form.reset(); // 모든 입력 필드와 라디오 버튼 초기화
  $('input').removeClass('errorInput');
  // 모든 에러 라벨 숨기기
  $('.error-label').hide();
};

closeModalButton.addEventListener('click', closeModal); // 닫기 버튼 클릭 시
cancelButton.addEventListener('click', closeModal);     // 취소 버튼 클릭 시


$('#meetingRoomAddBtn').click(function() {

    // 회의실 이름 검사
    let isVal = true;
    if ($('#meetingroomName').val().trim() === '') {
        $('#meetingroomName').addClass("errorInput");
        $('.meetingroomName-error').show();
        isVal = false;
    } else {
        $('#meetingroomName').removeClass("errorInput");
        $('.meetingroomName-error').hide();
    }

    // 회의실 담당자 검사
    if ($('#meetingroomManager').val().trim() === '') {
        $('#meetingroomManager').addClass("errorInput");
        $('.meetingroomManager-error').show();
        isVal = false;
    } else {
        $('#meetingroomManager').removeClass("errorInput");
        $('.meetingroomManager-error').hide();
    }

    // 회의실 수용인원 검사
    if ($('#meetingroomCapacity').val().trim() === '') {
        $('#meetingroomCapacity').addClass("errorInput");
        $('.meetingroomCapacity-error').show();
        isVal = false;
    } else {
        $('#meetingroomCapacity').removeClass("errorInput");
        $('.meetingroomCapacity-error').hide();
    }
	if (isVal) {
	        console.log("유효성 검사 통과, 폼 제출");
	        $('#meetingroomAddForm').submit(); 
	    }

}); // 닫는 괄호 추가


// 회의실 삭제 모달 관련 DOM 요소
const modalDeleteBackground = document.getElementById('modalDeleteBackground');
const deleteMeetingroomLabel = document.getElementById('deleteMeetingroomLabel');
const confirmDeleteButton = document.getElementById('confirmDeleteButton');
const closeDeleteModalButton = document.getElementById('closeDeleteModalButton');
const cancelDeleteButton = document.getElementById('cancelDeleteButton');

// 모달 열기 함수 (회의실 번호를 받아서 데이터 세팅)
const openDeleteModal = (meetingroomNo) => {
    // 회의실 번호 표시
    deleteMeetingroomLabel.innerText = meetingroomNo;

    // 삭제 확인 버튼 클릭 이벤트 설정
    confirmDeleteButton.onclick = () => {
        // 서버로 요청 전송
        window.location.href = `/academy/deleteMeetingRoom?meetingroomNo=${meetingroomNo}`;
    };

    // 모달 보이기
    modalDeleteBackground.classList.remove('hidden');
    modalDeleteBackground.classList.add('block');
};

// 모달 닫기 함수
const closeDeleteModal = () => {
    modalDeleteBackground.classList.remove('block');
    modalDeleteBackground.classList.add('hidden');
};

// 버튼 이벤트 리스너 설정
closeDeleteModalButton.addEventListener('click', closeDeleteModal);
cancelDeleteButton.addEventListener('click', closeDeleteModal);



// 회의실 수정 모달 관련 DOM 요소
const openModifyModalButton = document.getElementById('openModifyModalButton');
const closeModifyModalButton = document.getElementById('closeModifyModalButton');
const modalModifyBackground = document.getElementById('modalModifyBackground');
const modalModifyWrapper = document.getElementById('modalModifyWrapper');
const cancelModifyButton = document.getElementById('cancelModifyButton');
const submitModifyButton = document.getElementById('meetingroomModifyButton');

// 모달 열기
const openModifyModal = (meetingRoomNo) => {
  $.ajax({
    url: `http://localhost/academy/modifyMeetingRoom?meetingroomNo=${meetingRoomNo}`,
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      console.log('Received data:', data);
      
      // 기존 데이터를 입력 필드에 채우기
      $('#meetingroomNo').val(data.meetingroomNo);
      $('#displayMeetingroomNo').text(data.meetingroomNo);  // 회의실 번호 표시
      $('#meetingroomName').val(data.meetingroomName);
      $('#meetingroomManager').val(data.meetingroomManager);
      $('#meetingroomCapacity').val(data.meetingroomCapacity);

      modalModifyBackground.classList.remove('hidden');
      modalModifyBackground.classList.add('block');
    },
    error: (xhr, status, error) => {
      console.error('Error fetching meeting room details:', error);
      alert('회의실 정보를 가져오는 데 실패했습니다.');
    },
  });
};






// 모달 닫기
const closeModifyModal = () => {
  modalModifyBackground.classList.remove('block');
  modalModifyBackground.classList.add('hidden');
  document.getElementById('meetingroomModifyForm').reset();
  $('input').removeClass('errorInput');
  $('.error-label').hide();
};

closeModifyModalButton.addEventListener('click', closeModifyModal);
cancelModifyButton.addEventListener('click', closeModifyModal);

// 수정 버튼 클릭 이벤트
submitModifyButton.addEventListener('click', function(e) {
  e.preventDefault();
  
  if (validateForm()) {
    const formData = new FormData(document.getElementById('meetingroomModifyForm'));
    
    $.ajax({
      url: 'http://localhost/academy/modifyMeetingRoom',
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
  
  // 회의실 이름 검사
  if ($('#meetingroomName').val().trim() === '') {
    $('#meetingroomName').addClass("errorInput");
    $('.meetingroomName-error').show();
    isValid = false;
  } else {
    $('#meetingroomName').removeClass("errorInput");
    $('.meetingroomName-error').hide();
  }

  // 회의실 담당자 검사
  if ($('#meetingroomManager').val().trim() === '') {
    $('#meetingroomManager').addClass("errorInput");
    $('.meetingroomManager-error').show();
    isValid = false;
  } else {
    $('#meetingroomManager').removeClass("errorInput");
    $('.meetingroomManager-error').hide();
  }

  // 회의실 수용인원 검사
  if ($('#meetingroomCapacity').val().trim() === '') {
    $('#meetingroomCapacity').addClass("errorInput");
    $('.meetingroomCapacity-error').show();
    isValid = false;
  } else {
    $('#meetingroomCapacity').removeClass("errorInput");
    $('.meetingroomCapacity-error').hide();
  }

  return isValid;
}