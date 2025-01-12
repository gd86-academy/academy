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

// 결재선추가 모달 관련 DOM 요소
const openModalButtonAddPeople = document.getElementById('openModalButtonAddPeople');
const closeModalButtonAddPeople = document.getElementById('closeModalButtonAddPeople');
const modalBackgroundAddPeople = document.getElementById('modalBackgroundAddPeople');
const modalWrapperAddPeople = document.getElementById('modalWrapperAddPeople');
const applyModalButtonAddPeople = document.getElementById('applyModalButtonAddPeople');

// 결재선추가 모달 열기
openModalButtonAddPeople.addEventListener('click', () => {
  modalBackgroundAddPeople.classList.remove('hidden');  // 모달 배경 보이기
  modalBackgroundAddPeople.classList.add('block');     // 모달 배경 보이게 설정
});

// 결재선추가 모달 닫기
const closeModalAddPeople = () => {
  modalBackgroundAddPeople.classList.remove('block');
  modalBackgroundAddPeople.classList.add('hidden');  // 모달 배경 숨기기
};

if (closeModalButtonAddPeople) closeModalButtonAddPeople.addEventListener('click', closeModalAddPeople); // 닫기 버튼 클릭 시
if (applyModalButtonAddPeople) applyModalButtonAddPeople.addEventListener('click', () => {
	// 해당 id를 가진 요소를 찾음
	var element = document.getElementById('inputContainer');
	if (element) {
        // 요소 내의 모든 input 태그들을 찾음
        var inputs = element.querySelectorAll('input:not([type="hidden"])');
        
        if (inputs.length > 0) {
            // 각 input 태그의 value 값을 출력
            inputs.forEach(function(input, index) {
                console.log(`Input ${index + 1}:`, input.value);
				console.log(inputs.length);
				let html = `
		            <div class="flex w-full mb-1">
		                <input class="text-center w-full" value="${input.value}"></input>
		            </div>
		        `;
				
				
				if (inputs.length == 1) { // 값이 1개라면
					$('#people1 .flex').remove();
					$('#people1').append(html);  // HTML 추가
					$('#people2 .flex').remove();
					$('#people3 .flex').remove();
				} else if (inputs.length == 2) { // 값이 2개라면 
					if (index == 0) {
						$('#people1 .flex').remove();
						$('#people1').append(html);  // HTML 추가
					}
					if (index == 1) {
						$('#people2 .flex').remove();
						$('#people2').append(html);  // HTML 추가
					}
					if (index == 1) $('#people3 .flex').remove();
				} else if (inputs.length == 3) {
					if (index == 0) {
						$('#people1 .flex').remove();
						$('#people1').append(html);  // HTML 추가
					}
					if (index == 1) {
						$('#people2 .flex').remove();
						$('#people2').append(html);  // HTML 추가
					}
					if (index == 2) {
						$('#people3 .flex').remove();
						$('#people3').append(html);  // HTML 추가
					}
				}
				
            });
        } else {
            console.log('input 태그가 존재하지 않습니다.');
			$('#people1 .flex').remove();
			$('#people2 .flex').remove();
			$('#people3 .flex').remove();
        }
    } else {
        console.log(`id "${elementId}"를 가진 요소를 찾을 수 없습니다.`);
    }
	closeModalAddPeople();
});

// 시작시간 선택
document.addEventListener("DOMContentLoaded", function(e) {
    // default
    var els = document.querySelectorAll(".begintime");
    els.forEach(function(select) {
        NiceSelect.bind(select);
    });
});

// 종료시간 선택
document.addEventListener("DOMContentLoaded", function(e) {
    // default
    var els = document.querySelectorAll(".endTime");
    els.forEach(function(select) {
        NiceSelect.bind(select);
    });
});

// 요일 선택
document.addEventListener("DOMContentLoaded", function(e) {
    // default
    var els = document.querySelectorAll(".weekday");
    els.forEach(function(select) {
        NiceSelect.bind(select);
    });
});

// 유효성 모달 관련 DOM 요소
const openModalButtonSubmitError = document.getElementById('openModalButtonSubmitError');
const closeModalButtonSubmitError = document.getElementById('closeModalButtonSubmitError');
const modalBackgroundSubmitError = document.getElementById('modalBackgroundSubmitError');
const modalWrapperSubmitError = document.getElementById('modalWrapperSubmitError');
const employeeBtnSubmitError = document.getElementById('employeeBtnSubmitError');

// 유효성 모달 닫기
const closeModalSubmitError = () => {
	  modalBackgroundSubmitError.classList.remove('block');
	  modalBackgroundSubmitError.classList.add('hidden');  // 모달 배경 숨기기
};

if (closeModalButtonSubmitError) closeModalButtonSubmitError.addEventListener('click', closeModalSubmitError); // 닫기 버튼 클릭 시
if (employeeBtnSubmitError) employeeBtnSubmitError.addEventListener('click', closeModalSubmitError);     // 취소 버튼 클릭 시

// 추가오류 모달 관련 DOM 요소
const openModalButtonAddFileError = document.getElementById('openModalButtonAddFileError');
const closeModalButtonAddFileError = document.getElementById('closeModalButtonAddFileError');
const modalBackgroundAddFileError = document.getElementById('modalBackgroundAddFileError');
const modalWrapperAddFileError = document.getElementById('modalWrapperAddFileError');
const employeeBtnAddFileError = document.getElementById('employeeBtnAddFileError');

// 추가오류 모달 닫기
const closeModalAddFileError = () => {
	  modalBackgroundAddFileError.classList.remove('block');
	  modalBackgroundAddFileError.classList.add('hidden');  // 모달 배경 숨기기
};

if (closeModalButtonAddFileError) closeModalButtonAddFileError.addEventListener('click', closeModalAddFileError); // 닫기 버튼 클릭 시
if (employeeBtnAddFileError) employeeBtnAddFileError.addEventListener('click', closeModalAddFileError);     // 취소 버튼 클릭 시

// 이미 등록한 회원추가시 경고 모달 관련 DOM 요소
const openModalButtonAddExist = document.getElementById('openModalButtonAddExist');
const closeModalButtonAddExist = document.getElementById('closeModalButtonAddExist');
const modalBackgroundAddExist = document.getElementById('modalBackgroundAddExist');
const modalWrapperAddExist = document.getElementById('modalWrapperAddExist');
const employeeBtnAddExist = document.getElementById('employeeBtnAddExist');

// 이미 등록한 회원추가시 모달 닫기
const closeModalAddExist = () => {
	  modalBackgroundAddExist.classList.remove('block');
	  modalBackgroundAddExist.classList.add('hidden');  // 모달 배경 숨기기
};

if (closeModalButtonAddExist) closeModalButtonAddExist.addEventListener('click', closeModalAddExist); // 닫기 버튼 클릭 시
if (employeeBtnAddExist) employeeBtnAddExist.addEventListener('click', closeModalAddExist);     // 취소 버튼 클릭 시

// 추가초과 모달 관련 DOM 요소
const openModalButtonAddOver = document.getElementById('openModalButtonAddOver');
const closeModalButtonAddOver = document.getElementById('closeModalButtonAddOver');
const modalBackgroundAddOver = document.getElementById('modalBackgroundAddOver');
const modalWrapperAddAddOver = document.getElementById('modalWrapperAddOver');
const employeeBtnAddAddOver = document.getElementById('employeeBtnAddOver');

// 추가오류 모달 닫기
const closeModalAddOver = () => {
	  modalBackgroundAddOver.classList.remove('block');
	  modalBackgroundAddOver.classList.add('hidden');  // 모달 배경 숨기기
};

if (closeModalButtonAddOver) closeModalButtonAddOver.addEventListener('click', closeModalAddOver); // 닫기 버튼 클릭 시
if (employeeBtnAddAddOver) employeeBtnAddAddOver.addEventListener('click', closeModalAddOver);     // 취소 버튼 클릭 시

// 유효성 검사 
$('#addBtn').click(function() {
    let isVal = true;
    
 	// 시작날짜 검사
    if ($('#beginDate').val().trim() === '') {
        $('#beginDate').addClass("errorInput");
        $('.beginDate-error').show();
        isVal = false;
    } else {
        $('.beginDate-error').hide();
        $('#beginDate').removeClass("errorInput");
    }
	
	// 종료날짜 검사
    if ($('#endDate').val().trim() === '') {
        $('#endDate').addClass("errorInput");
        $('.endDate-error').show();
        isVal = false;
    } else {
        $('.endDate-error').hide();
        $('#endDate').removeClass("errorInput");
    }
 	
	$('#timeDiv tr').each(function(index) {
        // 각 select 요소에 대한 검사
		console.log($('#timeDiv tr').length);
        const weekday = $(this).find(`#weekdayId${index}`);
        const beginTime = $(this).find(`#beginTimeId${index}`);
        const endTime = $(this).find(`#endTimeId${index}`);

        // 요일 검사
        if (weekday.val() === '' || weekday.val() === null) {
            weekday.addClass('errorInput');
            $(this).find('.weekday-error').show();
            isVal = false;
        } else {
            weekday.removeClass('errorInput');
            $(this).find('.weekday-error').hide();
        }
		console.log("요일" + weekday.val());
        // 시작시간 검사
        if (beginTime.val() === '' || beginTime.val() === null) {
            beginTime.addClass('errorInput');
            $(this).find('.beginTime-error').show();
            isVal = false;
        } else {
            beginTime.removeClass('errorInput');
            $(this).find('.beginTime-error').hide();
        }
		console.log("시작시간" + beginTime.val());
        // 종료시간 검사
        if (endTime.val() === '' || endTime.val() === null) {
            endTime.addClass('errorInput');
            $(this).find('.endTime-error').show();
            isVal = false;
        } else {
            endTime.removeClass('errorInput');
            $(this).find('.endTime-error').hide();
        }
		console.log("종료시간" + endTime.val());
    });
	
	// #inputContainer에 input 요소가 하나도 없으면 추가된 항목이 없다고 판단
    if ($('#inputContainer input:not([type="hidden"])').length === 0) {
        isVal = false;
		console.log('결재선이 비어있습니다.');
    }
	
	
	$('#inputContainer input:not([type="hidden"])').each(function() {
		console.log($('#inputContainer input:not([type="hidden"])').length);
        var value = $(this).val();
        // readonly 속성이 없고 값이 비어있는 input을 유효하지 않다고 판단
        if (!$(this).prop('readonly') && value.trim() === '') {
            isVal = false;
            $(this).css('border', '1px solid red'); // 값이 비어있는 input에 빨간색 테두리 추가
        } else {
            $(this).css('border', ''); // 값이 있는 input은 테두리 제거
        }
    });
	
	// 강의명 검사
    if ($('#lectureName').val().trim() === '') {
        $('#lectureName').addClass("errorInput");
        $('.lectureName-error').show();
        isVal = false;
    } else {
        $('.lectureName-error').hide();
        $('#lectureName').removeClass("errorInput");
    }
	
	const $classroomList = $('#classroomList'); // 선택박스 참조
	const $niceSelectclassroomList = $classroomList.next('.nice-select'); // nice-select 참조
		
 	// 강의실 검사
    if ($('#classroomList').val() === null) {
        $('.classroomList-error').show();
        $niceSelectclassroomList.addClass("errorInput"); // 에러 클래스 추가
        isVal = false;
    } else {
        $('.classroomList-error').hide();
        $niceSelectclassroomList.removeClass("errorInput"); // 에러 클래스 제거
    }
	
	// 강의내용 검사
	if ($('#lectureContent').val().trim() === '') {
        $('#lectureContent').addClass("errorInput");
        $('.lectureContent-error').show();
        isVal = false;
    } else {
        $('.lectureContent-error').hide();
        $('#lectureContent').removeClass("errorInput");
    }
	
	// 결재제목 검사
	if ($('#lectureApprovalTitle').val().trim() === '') {
	    $('#lectureApprovalTitle').addClass("errorInput");
	    $('.lectureApprovalTitle-error').show();
	    isVal = false;
	} else {
	    $('.lectureApprovalTitle-error').hide();
	    $('#lectureApprovalTitle').removeClass("errorInput");
	}
	
	// 결재내용 검사
	if ($('#lectureApprovalContent').val().trim() === '') {
        $('#lectureApprovalContent').addClass("errorInput");
        $('.lectureApprovalContent-error').show();
        isVal = false;
    } else {
        $('.lectureApprovalContent-error').hide();
        $('#lectureApprovalContent').removeClass("errorInput");
    }
 	
    // 폼 제출
    if (isVal) {
        console.log("submit 성공");
        $('#addForm').submit();
    } else {
	  	modalBackgroundSubmitError.classList.remove('hidden');  // 모달 배경 보이기
	  	modalBackgroundSubmitError.classList.add('block');     // 모달 배경 보이게 설정
	}
});

$('#timeDiv tr').each(function(index) {
	
	
});


// 강의시간 입력 필드 추가
let timeResult = 0; // 기존 <select> 개수 확인

$('#btnAddTime').click(function() {
    let isEmpty = false;

    // 모든 <select> 필드 검사
	$('#timeDiv select').each(function() {
	    const selectedValue = $(this).val();
	    
	    if (selectedValue === '' || selectedValue === null) {
	        isEmpty = true;
	        return false; // 루프 중단
	    }
	});
    if (isEmpty) {
        modalBackgroundAddFileError.classList.toggle('hidden', false);
        modalBackgroundAddFileError.classList.toggle('block', true);
    } else if (timeResult > 4) {
		modalBackgroundAddOver.classList.toggle('hidden', false);
		modalBackgroundAddOver.classList.toggle('block', true);
	} else {
	    timeResult++; // 고유 ID 증가
	
	    let weekdayId = 'weekdayId' + timeResult;
	    let beginTimeId = 'beginTimeId' + timeResult;
	    let endTimeId = 'endTimeId' + timeResult;
		
		console.log(weekdayId)
		console.log(beginTimeId)
		console.log(endTimeId)
		
	
	    let html = `
	        <tr id="weekday${timeResult}">
	            <td class="bg-[#f4f4f4] lecutre-title-align"></td>
	            <td>
	                <select id="${weekdayId}" class="form-select" name="lectureWeekday[${timeResult}].weekdayCode">
	                    <option value="" disabled selected>요일</option>
	                </select>
	            </td>
	            <td colspan="2">
	                <div class="flex justify-between">
	                    <select id="${beginTimeId}" class="form-select mr-3 " name="lectureWeekday[${timeResult}].beginTimeCode">
	                        <option value="" disabled selected>시작시간</option>
	                    </select>
	                    <div>~</div>
	                    <select id="${endTimeId}" class="form-select ml-3 " name="lectureWeekday[${timeResult}].endTimeCode">
	                        <option value="" disabled selected>종료시간</option>
	                    </select>
	                </div>
	            </td>
	        </tr>
	    `;
	
	    $('#timeDiv').append(html);
	
	    $.get('http://localhost/academy/restapi/getWeekday', function(data) {
	        data.forEach(cwk => {
	            $(`#${weekdayId}`).append(`<option value="${cwk.code}">${cwk.name}</option>`);
	        });
	    });
	
	    $.get('http://localhost/academy/restapi/getTime', function(data) {
	        data.forEach(ct => {
	            $(`#${beginTimeId}`).append(`<option value="${ct.code}">${ct.name}</option>`);
	            $(`#${endTimeId}`).append(`<option value="${ct.code}">${ct.name}</option>`);
	        });
	    });
    }
});


// 강의시간 입력 필드 삭제
$('#BtnEndTime').click(function() {
    // #timeDiv 내에 tr 요소가 하나 이상 존재하는지 확인
    if ($('#timeDiv tr').length <= 1) { // 첫 번째 tr은 기본 요소이므로 1개 이상이어야 삭제 가능
        // alert('삭제할 항목이 없습니다.');
    } else {
        // 마지막으로 추가된 tr의 ID
        let lastTimeResult = timeResult;  // 현재 timeResult 값 (마지막 추가된 항목)

        // 동적으로 생성된 필드들의 ID를 기반으로 삭제
        let lastRowId = 'weekday' + lastTimeResult;

        // 마지막 tr 삭제
        $('#' + lastRowId).closest('tr').remove();  // 해당 tr 삭제

        timeResult--;  // timeResult 감소
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
console.log(departmentName);

// 트리에 사원목록 출력.
$.ajax({
    url: 'http://localhost/academy/restapi/employeeListNode',
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
			var approvalPeopleResult = 0;
			$('#addEmployeeListButton').click(function() {
			    if (selectedNode && selectedNode.text) { // selectedNode가 정의되고 text가 존재하는지 확인.
			        var approvalPeoplesId = 'approvalPeoples' + approvalPeopleResult;
			        var approvalRemoveBtnId = 'approvalRemoveBtn' + approvalPeopleResult;
			        let html = `
			            <div class="flex w-full mb-1">
			                <input id="${approvalPeoplesId}" type="text" class="form-input ltr:rounded-r-none rtl:rounded-l-none" name="approval" value="${selectedNode.text}" readonly/>
			                <button id="${approvalRemoveBtnId}" type="button" class="btn btn-danger ltr:rounded-l-none rtl:rounded-r-none" style="width: 80px;">삭제</button>
			            </div>
			        `;
					
					if (approvalPeopleResult < 3) {
						// 중복 여부 확인
				        var isDuplicate = false;
				        $('#inputContainer input:not([type="hidden"])').each(function() {
				            if ($(this).val().trim() === selectedNode.text.trim()) {
				                isDuplicate = true;
				                return false; // 반복문 중단
				            }
				        });
						
						if (isDuplicate == false) {
							$('#inputContainer').append(html);  // HTML을 inputContainer에 추가
							approvalPeopleResult++; // 추가할 때마다 approvalPeopleResult 증가
						} else {
							modalBackgroundAddExist.classList.toggle('hidden', false);
							modalBackgroundAddExist.classList.toggle('block', true);
						}
						
					}
			        else {
						modalBackgroundAddOver.classList.toggle('hidden', false);
						modalBackgroundAddOver.classList.toggle('block', true);
					}
			        // 로그 출력
			        console.log(approvalPeopleResult);
			        
			    } else {
			        // alert('트리 항목을 선택하세요!');
			    }
			});

			// 삭제버튼 클릭 시 해당 input과 삭제 버튼을 삭제.
			$(document).on('click', '.btn-danger', function() {
			    // 클릭된 삭제 버튼의 부모 요소인 .flex를 삭제
			    $(this).closest('.flex').remove();
				approvalPeopleResult--;
				console.log(approvalPeopleResult);
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


let result = 0;  // 전역 변수로 result 선언
// 첨부파일 폼 추가버튼 클릭 시
$('#btnAddFile').click(function(){
	// 마지막 파일 입력필드가 비어있다면
	if ($('#fileDiv input[type="file"]').last().val() === '') {
		modalBackgroundAddFileError.classList.toggle('hidden', false);
		modalBackgroundAddFileError.classList.toggle('block', true);
	} else {	
		result++; // result 증가( 파일 입력 필드마다 고유 값이 생성됨)
		
		let inputId = 'attendanceApprovalFile' + result; // 고유한 inputId 생성
		let displayId = 'attendanceApprovalFileNameDisplay' + result; // 고유한 displayId 생성
		let removeButtonId = 'removeFileBtn' + result;	// 고유한 removeButtonId 생성 (휴지통 버튼)
		
		let html = `
			<div class="flex mt-1" id = "fileField${result}">
	       		<!-- 커스텀 버튼 -->
	           <button 
	               type="button" 
	               class="btn btn-primary ltr:rounded-r-none rtl:rounded-l-none" 
	               style="width: 150px;"
	               onclick="document.getElementById('${inputId}').click();">
	               파일 선택
	           </button>
	           <!-- 숨겨진 파일 입력 -->
	           <input 
	               id="${inputId}" 
	               name="lectureApprovalFile"
	               type="file" 
	               class="hidden"
	               multiple
	               onchange="document.getElementById('${displayId}').value = this.files[0] ? this.files[0].name : '';" />
	           <!-- 파일 이름 표시 -->
	           <input 
	               id="${displayId}" 
	               type="text" 
	               placeholder="첨부된 파일이 없습니다."
	               class="form-input ltr:rounded-l-none rtl:rounded-r-none flex-grow" 
	               readonly />
	           <!-- 휴지통 버튼 -->
	           <button
	           		type="button"
	           		class = "btn btn-outline-danger ml-2"
	           		id = "${removeButtonId}"
	           		onclick="removeFileField(${result});"
	           		<!--휴지통 아이콘추가-->
	           		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		           		<path
		           			opacity="0.5"
		           			d="M11.5956 22.0001H12.4044C15.1871 22.0001 16.5785 22.0001 17.4831 21.1142C18.3878 20.2283 18.4803 18.7751 18.6654 15.8686L18.9321 11.6807C19.0326 10.1037 19.0828 9.31524 18.6289 8.81558C18.1751 8.31592 17.4087 8.31592 15.876 8.31592H8.12405C6.59127 8.31592 5.82488 8.31592 5.37105 8.81558C4.91722 9.31524 4.96744 10.1037 5.06788 11.6807L5.33459 15.8686C5.5197 18.7751 5.61225 20.2283 6.51689 21.1142C7.42153 22.0001 8.81289 22.0001 11.5956 22.0001Z"
		           			fill="currentColor"
		           		/>
		           		<path
		           			d="M3 6.38597C3 5.90152 3.34538 5.50879 3.77143 5.50879L6.43567 5.50832C6.96502 5.49306 7.43202 5.11033 7.61214 4.54412C7.61688 4.52923 7.62232 4.51087 7.64185 4.44424L7.75665 4.05256C7.8269 3.81241 7.8881 3.60318 7.97375 3.41617C8.31209 2.67736 8.93808 2.16432 9.66147 2.03297C9.84457 1.99972 10.0385 1.99986 10.2611 2.00002H13.7391C13.9617 1.99986 14.1556 1.99972 14.3387 2.03297C15.0621 2.16432 15.6881 2.67736 16.0264 3.41617C16.1121 3.60318 16.1733 3.81241 16.2435 4.05256L16.3583 4.44424C16.3778 4.51087 16.3833 4.52923 16.388 4.54412C16.5682 5.11033 17.1278 5.49353 17.6571 5.50879H20.2286C20.6546 5.50879 21 5.90152 21 6.38597C21 6.87043 20.6546 7.26316 20.2286 7.26316H3.77143C3.34538 7.26316 3 6.87043 3 6.38597Z"
		           			fill="currentColor"
		           		/>
		           		<path
		           			fill-rule="evenodd"
		           			clip-rule="evenodd"
		           			d="M9.42543 11.4815C9.83759 11.4381 10.2051 11.7547 10.2463 12.1885L10.7463 17.4517C10.7875 17.8855 10.4868 18.2724 10.0747 18.3158C9.66253 18.3592 9.29499 18.0426 9.25378 17.6088L8.75378 12.3456C8.71256 11.9118 9.01327 11.5249 9.42543 11.4815Z"
		           			fill="currentColor"
		           		/>
		           		<path
		           			fill-rule="evenodd"
		           			clip-rule="evenodd"
		           			d="M14.5747 11.4815C14.9868 11.5249 15.2875 11.9118 15.2463 12.3456L14.7463 17.6088C14.7051 18.0426 14.3376 18.3592 13.9254 18.3158C13.5133 18.2724 13.2126 17.8855 13.2538 17.4517L13.7538 12.1885C13.795 11.7547 14.1625 11.4381 14.5747 11.4815Z"
		           			fill="currentColor"
		           		/>
		           	</svg>
	           </button>
	       </div>
		`;
		
		$('#fileDiv').append(html);	// 파일 입력 필드 추가
	}
});

// 휴지통 버튼 클릭시 호출 (파일 입력 폼과 해당 휴지통 버튼을 삭제하는 함수)
function removeFileField(fileId) {
	// 해당 파일 입력폼과 휴지통 버튼을 포함하는 div 제거
	$('#fileField'+fileId).remove();
	
}