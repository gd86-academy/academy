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
					        headings: ['회의실번호', '회의실명', '담당자', '수용인원수', ''],
							data: data.map(item => [
							    item[0], // 회의실 번호
							    item[1], // 회의실명
								`<div class="flex items-center"><img class="w-9 h-9 rounded-full ltr:mr-2 rtl:ml-2 object-cover" src="./upload/${item[7]}.${item[8]}" /><span>${item[2]}</span>&nbsp;<span style="color: #cccccc;">${item[3]}</span></div>`,
								`<span>${item[4]}명</span>`, // 수용 인원
							    `<div class="flex"><button type="button" class="btn btn-dark mr-3" onclick="openModifyModal(${item[0]})">수정</button><button type="button" class="btn btn-danger" onclick="openDeleteModal(${item[0]})">삭제</button></div>`  // 삭제 버튼
							])
					    },
					    searchable: true,
					    perPage: 10,
					    perPageSelect: [10, 20, 30, 50, 100],
						
					    columns: [
					        {
					            select: 4,
								width: "15%",
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
	console.log('meetingRoomNo : ' + meetingRoomNo);
  $.ajax({
    url: `http://localhost/academy/modifyMeetingRoom?meetingroomNo=${meetingRoomNo}`,
    type: 'GET',
    dataType: 'json',
    success: (data) => {
        
      // 기존 데이터를 입력 필드에 채우기
      $('#meetingroomNo').val(data.meetingroomNo);
      $('#displayMeetingroomNo').text(data.meetingroomNo);  // 회의실 번호 표시
      $('#modifyMeetingroomName').val(data.meetingroomName);
	  var manager = data.employeeName + '[' + data.meetingroomManager + ']'
      $('#modifyMeetingroomManager').val(manager);
      $('#modifyMeetingroomCapacity').val(data.meetingroomCapacity);
	  

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
        // alert('회의실이 성공적으로 수정되었습니다.');
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


// 회의실추가모달에서 사원추가버튼을 누를 떄 트리 출력
// 담당자추가 모달 관련 DOM 요소
const openModalButtonAddPeople = document.getElementById('openModalButtonAddPeople');
const closeModalButtonAddPeople = document.getElementById('closeModalButtonAddPeople');
const modalBackgroundAddPeople = document.getElementById('modalBackgroundAddPeople');
const modalWrapperAddPeople = document.getElementById('modalWrapperAddPeople');
const applyModalButtonAddPeople = document.getElementById('applyModalButtonAddPeople');

// 회의실 추가모달에서 담당자추가 모달 열기
openModalButtonAddPeople.addEventListener('click', () => {
  modalBackgroundAddPeople.classList.remove('hidden');  // 모달 배경 보이기
  modalBackgroundAddPeople.classList.add('block');     // 모달 배경 보이게 설정
});

// 담당자추가 모달 닫기
const closeModalAddPeople = () => {
  modalBackgroundAddPeople.classList.remove('block');
  modalBackgroundAddPeople.classList.add('hidden');  // 모달 배경 숨기기
};

if (closeModalButtonAddPeople) closeModalButtonAddPeople.addEventListener('click', closeModalAddPeople); // 닫기 버튼 클릭 시


// 회의실수정모달에서 사원추가버튼을 누를 떄 트리 출력
// 담당자수정 모달 관련 DOM 요소
const openModalButtonModifyPeople = document.getElementById('openModalButtonModifyPeople');
const closeModalButtonModifyPeople = document.getElementById('closeModalButtonModifyPeople');
const modalBackgroundModifyPeople = document.getElementById('modalBackgroundModifyPeople');
const modalWrapperModifyPeople = document.getElementById('modalWrapperModifyPeople');
const applyModalButtonModifyPeople = document.getElementById('applyModalButtonModifyPeople');

// 회의실 수정모달에서 담당자수정 모달 열기
openModalButtonModifyPeople.addEventListener('click', () => {
  modalBackgroundModifyPeople.classList.remove('hidden');  // 모달 배경 보이기
  modalBackgroundModifyPeople.classList.add('block');     // 모달 배경 보이게 설정
});

// 담당자수정 모달 닫기
const closeModalModifyPeople = () => {
  modalBackgroundModifyPeople.classList.remove('block');
  modalBackgroundModifyPeople.classList.add('hidden');  // 모달 배경 숨기기
};

if (closeModalButtonModifyPeople) closeModalButtonModifyPeople.addEventListener('click', closeModalModifyPeople); // 닫기 버튼 클릭 시


// 폼 유효성 검사 함수
function validateForm() {
  let isValid = true;
  
  // 회의실 이름 검사
  if ($('#modifyMeetingroomName').val().trim() === '') {
    $('#modifyMeetingroomName').addClass("errorInput");
    $('.meetingroomName-error').show();
    isValid = false;
  } else {
    $('#modifyMeetingroomName').removeClass("errorInput");
    $('.meetingroomName-error').hide();
  }

  // 회의실 담당자 검사
  if ($('#modifyMeetingroomManager').val().trim() === '') {
    $('#modifyMeetingroomManager').addClass("errorInput");
    $('.meetingroomManager-error').show();
    isValid = false;
  } else {
    $('#modifyMeetingroomManager').removeClass("errorInput");
    $('.meetingroomManager-error').hide();
  }

  // 회의실 수용인원 검사
  if ($('#modifyMeetingroomCapacity').val().trim() === '') {
    $('#modifyMeetingroomCapacity').addClass("errorInput");
    $('.meetingroomCapacity-error').show();
    isValid = false;
  } else {
    $('#modifyMeetingroomCapacity').removeClass("errorInput");
    $('.meetingroomCapacity-error').hide();
  }

  return isValid;
}


// 트리에 팀명이 선택되는 것을 방지하기위해서 팀명 리스트로 받아오기.
const departmentName = [];
$.ajax({
    url: 'http://localhost/academy/restapi/getDepartment',
    type: 'GET',
    dataType: 'json',
    success: (data) => {
		// name 필드값을 추출해서 리스트로 변환.
		$.each(data, function(index, item) {
            departmentName.push(item.name); // departmentName 배열에 name 필드값 추가
        });
	},
	error: (xhr, status, error) => {
        console.error('Error:', error);
    }
});

// 트리에 사원목록 출력.
$.ajax({
    url: 'http://localhost/academy/restapi/employeeListNodeShowMe',
    type: 'GET',
    dataType: 'json',
    success: (data) => {
			var tree = new tui.Tree('#tree', { // Tree 컴포넌트를 초기화하는 생성자.
			    data: data, // 데이터를 가져옴.
			    nodeDefaultState: 'opened' // 모든 노드가 기본적으로 열린 상태.
			}).enableFeature('Selectable', { // Tree 컴포넌트 추가기능 설정.
			    selectedClassName: 'tui-tree-selected', // 선택된 노드의 CSS설정.
			});

			var selectedBtn = document.getElementById('selectedBtn');
			var deselectedBtn = document.getElementById('deselectedBtn');
			var rootNodeId = tree.getRootNodeId();
			var firstChildId = tree.getChildIds(rootNodeId)[0];
			var selectedValue = document.getElementById('selectedValue');
			var selectedNode = null; // 선택된 노드를 추적하는 변수
			
			// 팀명 선택 방지
		    tree.on('beforeSelect', function(eventData) {
		        var nodeData = tree.getNodeData(eventData.nodeId);
				$.each(departmentName, function(i, department) {
			        if (nodeData.text.includes(department)) { // 팀명 조건 설정
						console.log(nodeData.text.includes(department))
			            console.log('팀명은 선택할 수 없습니다.');
						eventData.preventDefault(); // 기본 동작 취소 (선택 방지)
			            return false; // 선택 방지
			        }
			    });
		    });

			// 트리의 루트노드ID를 가져옴.
			tree.on('select', function(eventData) {
			    var nodeData = tree.getNodeData(eventData.nodeId);
				selectedValue.value = 'selected : ' + nodeData.text;
			    selectedNode = nodeData; // 선택된 노드 정보 저장
			    console.log('Selected:', selectedNode.text);
			});

			// 트리에서 선택된 항목을 선택해제함.
			tree.on('deselect', function(eventData) {
			    var nodeData = tree.getNodeData(eventData.nodeId);
			    selectedValue.value = 'deselected : ' + nodeData.text;
			});

			util.addEventListener(selectedBtn, 'click', function() {
			    tree.select(firstChildId);
			});

			util.addEventListener(deselectedBtn, 'click', function() {
			    tree.deselect();
			});

			// "추가" 버튼 클릭 이벤트 처리
			$('#addEmployeeListButton').click(function() {
			    if (selectedNode && selectedNode.text) { // selectedNode가 정의되고 text가 존재하는지 확인.
			        var employee = selectedNode.text;
			        
			        // #meetingroomManager input 필드에 값 설정
			        $('#meetingroomManager').val(employee); 
			    } else {
			        // alert('트리 항목을 선택하세요!');
			    }
				closeModalAddPeople();
				
			});
		},
    error: (xhr, status, error) => {
        console.error('Error:', error);
    }
});

// 트리에 사원목록 출력.
$.ajax({
    url: 'http://localhost/academy/restapi/employeeListNodeShowMe',
    type: 'GET',
    dataType: 'json',
    success: (data) => {
			var tree = new tui.Tree('#modifytree', { // Tree 컴포넌트를 초기화하는 생성자.
			    data: data, // 데이터를 가져옴.
			    nodeDefaultState: 'opened' // 모든 노드가 기본적으로 열린 상태.
			}).enableFeature('Selectable', { // Tree 컴포넌트 추가기능 설정.
			    selectedClassName: 'tui-tree-selected', // 선택된 노드의 CSS설정.
			});

			var selectedBtn2 = document.getElementById('selectedBtn');
			var deselectedBtn2 = document.getElementById('deselectedBtn');
			var rootNodeId2 = tree.getRootNodeId();
			var firstChildId2 = tree.getChildIds(rootNodeId2)[0];
			var selectedValue2 = document.getElementById('selectedValue');
			var selectedNode2 = null; // 선택된 노드를 추적하는 변수
			
			// 팀명 선택 방지
		    tree.on('beforeSelect', function(eventData) {
		        var nodeData = tree.getNodeData(eventData.nodeId);
				$.each(departmentName, function(i, department) {
			        if (nodeData.text.includes(department)) { // 팀명 조건 설정
						console.log(nodeData.text.includes(department))
			            console.log('팀명은 선택할 수 없습니다.');
						eventData.preventDefault(); // 기본 동작 취소 (선택 방지)
			            return false; // 선택 방지
			        }
			    });
		    });

			// 트리의 루트노드ID를 가져옴.
			tree.on('select', function(eventData) {
			    var nodeData = tree.getNodeData(eventData.nodeId);
				selectedValue2.value = 'selected : ' + nodeData.text;
			    selectedNode2 = nodeData; // 선택된 노드 정보 저장
			    console.log('Selected:', selectedNode2.text);
			});

			// 트리에서 선택된 항목을 선택해제함.
			tree.on('deselect', function(eventData) {
			    var nodeData = tree.getNodeData(eventData.nodeId);
			    selectedValue2.value = 'deselected : ' + nodeData.text;
			});

			util.addEventListener(selectedBtn2, 'click', function() {
			    tree.select(firstChildId2);
			});

			util.addEventListener(deselectedBtn2, 'click', function() {
			    tree.deselect();
			});
			
			$('#modifyEmployeeListButton').click(function() {
			    if (selectedNode2 && selectedNode2.text) { // selectedNode가 정의되고 text가 존재하는지 확인.
			        var employee = selectedNode2.text;
			        
			        // #meetingroomManager input 필드에 값 설정
			        $('#modifyMeetingroomManager').val(employee); 
			    } else {
			        // alert('트리 항목을 선택하세요!');
			    }
				closeModalModifyPeople();
				
			});
		},
    error: (xhr, status, error) => {
        console.error('Error:', error);
    }
});
	
// 브라우저에 맞는 맞춤형 메서드를 제공.
var util = {
    addEventListener: function(element, eventName, handler) {
        if (element.addEventListener) {
            element.addEventListener(eventName, handler, false);
        } else {
            element.attachEvent('on' + eventName, handler);
        }
    }
};

// DOM이 준비된 후에 실행
document.addEventListener('DOMContentLoaded', function() {
    // ID로 요소를 찾습니다.
    var selectedBtn = document.getElementById('selectedBtn');
    var deselectedBtn = document.getElementById('deselectedBtn');

    // 버튼이 존재하는지 확인
    if (selectedBtn && deselectedBtn) {
        // 버튼에 클릭 이벤트 리스너 추가
        util.addEventListener(selectedBtn, 'click', function() {
            tree.select(firstChildId);
        });

        util.addEventListener(deselectedBtn, 'click', function() {
            tree.deselect();
        });
    } else {
        console.log("Buttons not found!");
    }
});