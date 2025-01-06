/**
 *  강의실
 */

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
  const form = document.getElementById('classroomAddForm');
  form.reset(); // 모든 입력 필드와 라디오 버튼 초기화
  $('input').removeClass('errorInput');
  // 모든 에러 라벨 숨기기
  $('.error-label').hide();
};

closeModalButton.addEventListener('click', closeModal); // 닫기 버튼 클릭 시
cancelButton.addEventListener('click', closeModal);     // 취소 버튼 클릭 시

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
				        headings: ['번호', '강의실명', '담당자', '', ''],
				        data: data.map(item => [
							item[0], // 강의실 번호
				            item[1], // 강의실명
				            item[2], // 담당자
				            item[3], // 수정버튼
				            item[4], // 삭제버튼
				        ])
				    },
				    searchable: true,
				    perPage: 10,
				    perPageSelect: [10, 20, 30, 50, 100],
					
				    columns: [
				        {
				            select: 0,
				            render: (data, cell, row) => {
								if(data == 'null.null') return `<div class="flex items-center w-max"><img class="w-9 h-9 rounded-full ltr:mr-2 rtl:ml-2 object-cover" src="./images/defaultProfile.png" /></div>`;
				                else return `<div class="flex items-center w-max"><img class="w-9 h-9 rounded-full ltr:mr-2 rtl:ml-2 object-cover" src="./upload/${data}" /></div>`;
				            },
							sortable: false,
				        },
				        {
				            select: 6,
				            render: (data, cell, row) => {
				                return `<a type="button" class="btn btn-outline-dark mx-auto d-block" style="width:100px;" href="/academy/chat?employeeNo=${data}">
				                    <img class="h-4 w-4" src="./images/icon/Dialog.png" alt="image">
				                    &nbsp;메신저
				                </a>`;
				            },
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