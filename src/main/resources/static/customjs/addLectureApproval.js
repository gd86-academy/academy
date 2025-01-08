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
	Alpine.data("form", () => ({
		date1: new Date().toISOString().split('T')[0],
        date2: new Date().toISOString().split('T')[0],
        init() {
            // 생년월일
            const defaultDate1 = document.getElementById('employeeBirth').value || this.date1;
            flatpickr(document.getElementById('employeeBirth'), {
                dateFormat: 'Y-m-d',
                //defaultDate: defaultDate1,
            });

            // 입사일
            const defaultDate2 = document.getElementById('employeeDate').value || this.date2;
            flatpickr(document.getElementById('employeeDate'), {
                dateFormat: 'Y-m-d',
                //defaultDate: defaultDate2,
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
  // 모달 내부의 모든 입력 필드를 초기화
  const form = document.getElementById('employeeAddForm');
  form.reset(); // 모든 입력 필드와 라디오 버튼 초기화
  $('input').removeClass('errorInput');
  // 모든 에러 라벨 숨기기
  $('.error-label').hide();
};

closeModalButtonAddPeople.addEventListener('click', closeModalAddPeople); // 닫기 버튼 클릭 시




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
            nodeDefaultState: 'opened',
            template: {
                internalNode:
                    '<div class="tui-tree-content-wrapper" style="padding-left: {{indent}}px">' +
                        '<button type="button" class="tui-tree-toggle-btn tui-js-tree-toggle-btn">' +
                            '<span class="tui-ico-tree"></span>' +
                            '{{stateLabel}}' +
                        '</button>' +
                        '<span class="tui-tree-text tui-js-tree-text">' +
                            '<label class="tui-checkbox">' +
                        	   '<span class="tui-ico-check"><input type="checkbox" class="tui-tree-checkbox"></span>' +
                        	'</label>' +
                            '<span class="tui-tree-ico tui-ico-folder"></span>' +
                            '{{text}}' +
                        '</span>' +
                    '</div>' +
                    '<ul class="tui-tree-subtree tui-js-tree-subtree">{{children}}</ul>',
                leafNode:
                    '<div class="tui-tree-content-wrapper" style="padding-left: {{indent}}px">' +
                        '<span class="tui-tree-text tui-js-tree-text">' +
                            '<label class="tui-checkbox">' +
                               '<span class="tui-ico-check"><input type="checkbox" class="tui-tree-checkbox"></span>' +
                            '</label>' +
                            '<span class="tui-tree-ico tui-ico-file"></span>' +
                            '{{text}}' +
                        '</span>' +
                    '</div>'
            }
        }).enableFeature('Checkbox', {
            checkboxClassName: 'tui-tree-checkbox',
        });

        var checkBtn = document.getElementById('checkBtn');
        var uncheckBtn = document.getElementById('uncheckBtn');
        var checkedValue = document.getElementById('checkedValue');
        var rootNodeId = tree.getRootNodeId();
        var firstChildId = tree.getChildIds(rootNodeId)[0];

        tree.on('check', function(eventData) {
            var nodeData = tree.getNodeData(eventData.nodeId);
            checkedValue.value = 'checked : ' + nodeData.text;
        });

        tree.on('uncheck', function(eventData) {
            var nodeData = tree.getNodeData(eventData.nodeId);
            checkedValue.value = 'unchecked : ' + nodeData.text;
        });

        util.addEventListener(checkBtn, 'click', function() {
            tree.check(firstChildId);
        });

        util.addEventListener(uncheckBtn, 'click', function() {
            tree.uncheck(firstChildId);
        });
