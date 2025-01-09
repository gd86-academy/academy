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

// 모달 관련 DOM 요소
const openModalButtonAddPeople = document.getElementById('openModalButtonAddPeople');
const closeModalButtonAddPeople = document.getElementById('closeModalButtonAddPeople');
const modalBackgroundAddPeople = document.getElementById('modalBackgroundAddPeople');
const modalWrapperAddPeople = document.getElementById('modalWrapperAddPeople');

// 모달 열기
openModalButtonAddPeople.addEventListener('click', () => {
  modalBackgroundAddPeople.classList.remove('hidden');  // 모달 배경 보이기
  modalBackgroundAddPeople.classList.add('block');     // 모달 배경 보이게 설정
});

// 모달 닫기
const closeModalAddPeople = () => {
  modalBackgroundAddPeople.classList.remove('block');
  modalBackgroundAddPeople.classList.add('hidden');  // 모달 배경 숨기기
};

closeModalButtonAddPeople.addEventListener('click', closeModalAddPeople); // 닫기 버튼 클릭 시

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

// 파일 입력 필드 추가
let fileResult = 0;  // 전역 변수로 result 선언
$('#btnAddFile').click(function() {
    // 마지막 파일 입력 필드가 비어 있지 않다면
    if ($('#fileDiv input[type="file"]').last().val() === '') {
        // alert('첨부하지 않은 파일이 이미 존재합니다.');
		modalBackgroundAddFileError.classList.remove('hidden');  // 모달 배경 보이기
		modalBackgroundAddFileError.classList.add('block');     // 모달 배경 보이게 설정
    } else {
        fileResult++;  // result 증가 (파일 입력 필드마다 고유 값이 생성됨)
        
        let inputId = 'lectureApprovalFile' + fileResult;  // 고유 input ID 생성
        let displayId = 'lectureApprovalFileDisplay' + fileResult;  // 고유 display ID 생성
        
        let html = `
        	<div class="flex mt-3">
	           <button 
	               type="button" 
	               class="btn btn-primary ltr:rounded-r-none rtl:rounded-l-none" 
	               style="width: 150px;"
	               onclick="document.getElementById('${inputId}').click();">
	               파일 선택
	           </button>
	           <input 
	               id="${inputId}" 
	               name="lectureApprovalFile"
	               type="file" 
	               class="hidden" 
	               onchange="document.getElementById('${displayId}').value = this.files[0] ? this.files[0].name : '';" />
	           <input 
	               id="${displayId}" 
	               type="text" 
	               placeholder="첨부된 파일이 없습니다."
	               class="form-input ltr:rounded-l-none rtl:rounded-r-none flex-grow" 
	               readonly />
	       </div>
        `;
        $('#fileDiv').append(html); // 파일 입력 필드 추가
    }
});


// 파일 입력 필드 삭제
$('#btnRemoveFile').click(function() {
	// 파일 입력 필드가 하나 이상 존재하는지 확인
    if ($('#fileDiv .flex').length === 0) { // .flex 클래스가 있는 요소가 없다면
        alert('삭제할 파일 입력 필드가 없습니다.');
    } else {
    	// 마지막 입력 필드를 삭제
        let lastInputId = 'lectureApprovalFile' + fileResult; // 마지막으로 추가된 파일 입력 필드의 ID
        let lastDisplayId = 'lectureApprovalFileNameDisplay' + fileResult; // 마지막으로 추가된 파일 이름 표시 필드의 ID
        
     	// 파일 입력 필드와 파일 이름 표시 필드 삭제
        $('#' + lastInputId).closest('.flex').remove();  // 마지막 .flex 요소 (파일 입력 필드 전체) 삭제
        $('#' + lastDisplayId).remove();  // 해당 파일 이름 표시 필드 삭제
        
        fileResult--;  // result 감소
    }
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

var util = {
            addEventListener: function(element, eventName, handler) {
                if (element.addEventListener) {
                    element.addEventListener(eventName, handler, false);
                } else {
                    element.attachEvent('on' + eventName, handler);
                }
            }
        };

        var data = [
            {text: 'rootA', children: [
                {text: 'sub-A1'},
                {text: 'sub-A2'},
                {text: 'sub-A3'},
                {text: 'sub-A4'},
                {text: 'sub-A5', state: 'closed', children: [
                    {text:'sub-A5A', children:[
                        {text:'sub-A5A1'}
                    ]},
                    {text:'sub_A5B'}
                ]},
                {text: 'sub-A6'},
                {text: 'sub-A7'},
                {text: 'sub-A8'},
                {text: 'sub-A9', state: 'closed', children: [
                    {text:'sub-A9A'},
                    {text:'sub-A9B'}
                ]},
                {text: 'sub-A10'},
                {text: 'sub-A11'},
                {text: 'sub-A12'}
            ]},
            {text: 'rootB', state:'closed', children: [
                {text:'sub-B1'},
                {text:'sub-B2'},
                {text:'sub-B3'}
            ]}
        ];

        var tree = new tui.Tree('#tree', {
            data: data,
            nodeDefaultState: 'opened'
        }).enableFeature('Selectable', {
            selectedClassName: 'tui-tree-selected',
        });

        var selectedBtn = document.getElementById('selectedBtn');
        var deselectedBtn = document.getElementById('deselectedBtn');
        var rootNodeId = tree.getRootNodeId();
        var firstChildId = tree.getChildIds(rootNodeId)[0];
        var selectedValue = document.getElementById('selectedValue');

        tree.on('select', function(eventData) {
            var nodeData = tree.getNodeData(eventData.nodeId);
            selectedValue.value = 'selected : ' + nodeData.text;
        });

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

