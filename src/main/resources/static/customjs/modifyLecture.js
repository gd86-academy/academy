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

// 강의날짜 선택
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


// 담당자수정 모달 관련 DOM 요소
const openModalButtonModifyPeople = document.getElementById('openModalButtonModifyPeople');
const closeModalButtonModifyPeople = document.getElementById('closeModalButtonModifyPeople');
const modalBackgroundModifyPeople = document.getElementById('modalBackgroundModifyPeople');
const modalWrapperModifyPeople = document.getElementById('modalWrapperModifyPeople');
const applyModalButtonModifyPeople = document.getElementById('applyModalButtonModifyPeople');

// 강의실 수정모달에서 담당자수정 모달 열기
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
    url: 'http://localhost/academy/restapi/employeeListNodeManagement',
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
			$('#modifyEmployeeButton').click(function() {
			    if (selectedNode && selectedNode.text) { // selectedNode가 정의되고 text가 존재하는지 확인.
			        var employee = selectedNode.text;
			        
			        $('#employeeNo').val(employee); 
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

// 강의수정페이지에서 강의날짜 항목을 하나라도 변경하면 기존 강의시간 숨김처리 후 새로운 입력창 출력.
$(document).on('change', '#classroomList', function () {
	$('#alreadyLectureTime').remove();; // 숨김 처리
	$('#weekdayId0').prop('selectedIndex', 0);
	$('#beginTimeId0').prop('selectedIndex', 0);
	$('#endTimeId0').prop('selectedIndex', 0);
	$('#weekdayId0').prop('disabled', false);
	$('#beginTimeId0').prop('disabled', false);
	$('#endTimeId0').prop('disabled', true);
	$('#beginTimeId0 option:not(:first)').remove();
	$('#endTimeId0 option:not(:first)').remove();
	$('#newLectureTime').removeAttr('hidden');     // 숨김 해제
});
$(document).on('change', '#beginDate', function () {
	$('#alreadyLectureTime').remove();; // 숨김 처리
	$('#weekdayId0').prop('selectedIndex', 0);
	$('#beginTimeId0').prop('selectedIndex', 0);
	$('#endTimeId0').prop('selectedIndex', 0);
	$('#weekdayId0').prop('disabled', false);
	$('#beginTimeId0').prop('disabled', false);
	$('#endTimeId0').prop('disabled', true);
	$('#beginTimeId0 option:not(:first)').remove();
	$('#endTimeId0 option:not(:first)').remove();
	$('#newLectureTime').removeAttr('hidden');     // 숨김 해제
});
$(document).on('change', '#endDate', function () {
	$('#alreadyLectureTime').remove();; // 숨김 처리
	$('#weekdayId0').prop('selectedIndex', 0);
	$('#beginTimeId0').prop('selectedIndex', 0);
	$('#endTimeId0').prop('selectedIndex', 0);
	$('#weekdayId0').prop('disabled', false);
	$('#beginTimeId0').prop('disabled', false);
	$('#endTimeId0').prop('disabled', true);
	$('#beginTimeId0 option:not(:first)').remove();
	$('#endTimeId0 option:not(:first)').remove();
	$('#newLectureTime').removeAttr('hidden');     // 숨김 해제
});