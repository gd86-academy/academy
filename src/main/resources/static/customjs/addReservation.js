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
	
	// 사원검색
	function searchEmployee() {
	    let searchValue = $('#searchEmployee').val().trim();

	    if (searchValue === '') {
	        $('#searchEmployee').addClass("errorInput");
	        $('.searchEmployee-error').show();
	        $('#resultEmployee').empty(); // 기존 결과 제거
	        $('#resultEmployee').append('<option value="">검색어를 입력해주세요</option>');
	        return; // 입력이 비어있다면 검색을 하지 않음
	    } else {
	        $('#searchEmployee').removeClass("errorInput");
	        $('.searchEmployee-error').hide();
	    }

	    // Ajax 요청
	    $.ajax({
	        url: 'http://localhost/academy/restapi/searchEmployee', // 사원 검색 API URL
	        type: 'GET',
	        data: { searchEmployee: searchValue },
	        dataType: 'json',
	        success: function (data) {
	            // 검색 결과를 #resultEmployee에 표시
	            $('#resultEmployee').empty(); // 기존 옵션 제거
	            if (data.length > 0) {
	                data.forEach(employee => {
	                    $('#resultEmployee').append(
	                        `<option value="${employee.employeeNo}">${employee.employeeName}</option>`
	                    );
	                });
	            } else {
	                $('#resultEmployee').append('<option value="">검색된 사원이 없습니다</option>');
	            }
	        },
	        error: function (xhr, status, error) {
	            console.error('Error:', error);
	        }
	    });
	}

	// 키보드 입력 이벤트 
	$('#searchEmployee').on('keyup', function () {
	    searchEmployee(); //검색 함수 호출
	});
	
	// 검색창에서 엔터 키 처리
	/*
	$('#searchEmployee').on('keydown', function (e) {
	    if (e.key === 'Enter') {
	        e.preventDefault(); // 엔터 키로 폼이 제출되는 것을 막음
	        searchEmployee(); // 검색 함수 호출
	    }
	});
	*/

	// 클릭 이벤트
	$('#btnEmployee').on('click', function () {
	    searchEmployee(); // 검색 함수 호출
	});
	
	// 사원추가
	let cnt = 0;

	$('#addResultEmployee').click(function () {
	    const selectedOption = $('#resultEmployee option:selected'); // 선택된 옵션 가져오기
	    const employeeNo = selectedOption.val();
	    const employeeName = selectedOption.text();

	    if (employeeNo && employeeName) {
	        // 중복 검사
	        let exists = false;
	        $('#selectEmployeesContainer .selectedEmployee').each(function () {
	            // data()로 읽은 값과 employeeNo를 문자열로 비교
	            if ($(this).attr('data-employee-no') === String(employeeNo)) {
	                exists = true; // 이미 추가된 사원이면 추가하지 않음
	                return false; // 반복문 종료
	            }
	        });

	        if (!exists) {
	            // 선택된 사원을 추가
	            const newEmployee = `
	                <div class="d-flex w-100 items-center justify-between mt-2 selectedEmployee-box">
	                    <input type="hidden" value="${employeeNo}" name="reservationEmployees[` + (cnt) + `].employeeNo">
	                    <input 
	                        class="form-input selectedEmployee"
	                        type="text"
	                        value="${employeeName}" 
	                        data-employee-no="${employeeNo}" 
	                        name="reservationEmployees[` + (cnt++) + `].employeeName"
	                        readonly>
	                    <button type="button" class="btn btn-danger ms-3 removeEmployee" style="word-break:keep-all;">삭제</button>
	                </div>
	            `;
	            $('#selectEmployeesContainer').append(newEmployee);

	            // 검색기록 초기화
	            $('#searchEmployee').val('');
	            $('#resultEmployee').empty();
	        }
	    }
		
		// 회의실 선택과 수용 인원 정보 가져오기
		let meetingroomNo = $('#selectMeetingroom option:selected');
		let meetingroomCapacity = meetingroomNo.data('capacity');
		let selectedEmployeeCount = $('#selectEmployeesContainer .selectedEmployee-box').length;
		selectedEmployeeCount++; // 예약자 포함

		console.log('회의실 수용 인원:', meetingroomCapacity);  // meetingroomCapacity 확인
		console.log('선택된 사원 수:', selectedEmployeeCount);  // selectedEmployeeCount 확인
		
		if (!meetingroomNo) {
			$('#modalBackgroundMeetingroomCheck').show();
			$('#modalWrapperMeetingroomCheck').show();
		    return;  
		}

		if (selectedEmployeeCount > meetingroomCapacity) {
	        $('#selectEmployeesContainer .selectedEmployee-box:last').remove(); // 마지막 추가된 사원 제거
	        $('.reservationEmployee-error').show(); // 실패 시 에러 메시지 표시
	    } else {
	        $('.reservationEmployee-error').hide(); // 에러 메시지 숨기기
	    }
	});

	// 삭제 버튼 기능 추가
	$(document).on('click', '.removeEmployee', function () {
	    const parentElement = $(this).closest('.selectedEmployee-box');
	    const employeeNo = parentElement.find('.selectedEmployee').data('employee-no');

	    // employeeNo 값 확인
	    if (!employeeNo) {
	        console.error('employeeNo가 유효하지 않습니다:', employeeNo);
	        return;
	    }

	    const deleteField = $('#deleteEmployee');
	    let currentValues = deleteField.val() || ''; // null 방지

	    // 값 추가 (중복 방지)
	    if (!currentValues.split(',').includes(String(employeeNo))) {
	        currentValues = currentValues ? `${currentValues},${employeeNo}` : employeeNo;
	        deleteField.val(currentValues); // 값 설정
	        console.log('삭제된 employeeNo 추가됨:', deleteField.val());
	    } else {
	        console.log('employeeNo가 이미 존재합니다:', employeeNo);
	    }

	    // DOM에서 삭제
	    parentElement.remove();

	});
	
});

// 회의실 미선택 유효성
$(document).ready(function () {
    $('#beginTimeCode, #endTimeCode, #reservationTitle, #reservationDate, #reservationContent, #searchEmployee').on('click', function () {
        const meetingroom = $('#selectMeetingroom').val();

        if (!meetingroom) {
            console.log('회의실을 선택하지 않았습니다.');
            $('#modalBackgroundMeetingroomCheck').show();
            $('#modalWrapperMeetingroomCheck').show();
			$('#beginTimeCode, #endTimeCode').val('');
        }
    });

    $('#closeModalButtonMeetingroomCheck').on('click', function () {
        $('#modalBackgroundMeetingroomCheck').hide();
        $('#modalWrapperMeetingroomCheck').hide();
    });

    $('#modalBackgroundMeetingroomCheck').on('click', function () {
        $('#modalBackgroundMeetingroomCheck').hide();
        $('#modalWrapperMeetingroomCheck').hide();
    });
});

// 예약신청 유효성 검사
$('#btnAddReservation').click(function(){
	let isValid = true;  
    // 회의실 검사
    if ($('#selectMeetingroom').val().trim() === '') {
    	$('#selectMeetingroom').addClass("errorInput");
    	$('.selectMeetingroom-error').show();
    	isValid = false;
  	} else {
    	$('#selectMeetingroom').removeClass("errorInput");
    	$('.selectMeetingroom-error').hide();
    }
    // 회의제목 검사
    if ($('#reservationTitle').val().trim() === '') {
    	$('#reservationTitle').addClass("errorInput");
    	$('.reservationTitle-error').show();
    	isValid = false;
  	} else {
    	$('#reservationTitle').removeClass("errorInput");
    	$('.reservationTitle-error').hide();
    }
    // 시작시간 검사
    if ($('#beginTimeCode').val().trim() === '') {
    	$('#beginTimeCode').addClass("errorInput");
    	$('.beginTimeCode-error').show();
    	isValid = false;
  	} else {
    	$('#beginTimeCode').removeClass("errorInput");
    	$('.beginTimeCode-error').hide();
    }
    // 종료시간 검사
    if ($('#endTimeCode').val().trim() === '') {
    	$('#endTimeCode').addClass("errorInput");
    	$('.endTimeCode-error').show();
    	isValid = false;
  	} else {
    	$('#endTimeCode').removeClass("errorInput");
    	$('.endTimeCode-error').hide();
    }
    // 예약날짜 검사
    if ($('#reservationDate').val().trim() === '') {
    	$('#reservationDate').addClass("errorInput");
    	$('.reservationDate-error').show();
    	isValid = false;
  	} else {
    	$('#reservationDate').removeClass("errorInput");
    	$('.reservationDate-error').hide();
    }
	// isValid가 true일 때만 폼 제출
    if (isValid) {
        $('#addReservationForm').submit();
    } else {
        e.preventDefault(); // 폼 제출을 막음
        console.log("유효성 검사 실패");
    }
})






