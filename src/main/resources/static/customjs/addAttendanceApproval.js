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

// 부서 선택
document.addEventListener("DOMContentLoaded", function(e) {
    // default
    var els = document.querySelectorAll(".begintime");
    els.forEach(function(select) {
        NiceSelect.bind(select);
    });
});

// 직급 선택
document.addEventListener("DOMContentLoaded", function(e) {
    // default
    var els = document.querySelectorAll(".endTime");
    els.forEach(function(select) {
        NiceSelect.bind(select);
    });
});

// 직급 선택
document.addEventListener("DOMContentLoaded", function(e) {
    // default
    var els = document.querySelectorAll(".weekday");
    els.forEach(function(select) {
        NiceSelect.bind(select);
    });
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

