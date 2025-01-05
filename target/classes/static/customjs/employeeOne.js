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
	
	Alpine.data('calendar', () => ({
	                    defaultParams: {
	                        id: null,
	                        title: '',
	                        start: '',
	                        end: '',
	                        description: '',
	                        type: 'primary',
	                    },
	                    params: {
	                        id: null,
	                        title: '',
	                        start: '',
	                        end: '',
	                        description: '',
	                        type: 'primary',
	                    },
	                    isAddEventModal: false,
	                    minStartDate: '',
	                    minEndDate: '',
	                    calendar: null,
	                    now: new Date(),
	                    events: [],
	                    init() {
	                        this.events = [
	                            {
	                                id: 1,
	                                title: 'All Day Event',
	                                start: '2025' + '-' + '03' + '-01T14:30:00',
	                                end: '2025' + '-' + '03' + '-02T14:30:00',
	                                className: 'danger',
	                                description:
	                                    'Aenean fermentum quam vel sapien rutrum cursus. Vestibulum imperdiet finibus odio, nec tincidunt felis facilisis eu.',
	                            },
	                            {
	                                id: 2,
	                                title: 'Site Visit',
	                                start: this.now.getFullYear() + '-' + this.getMonth(this.now) + '-07T19:30:00',
	                                end: this.now.getFullYear() + '-' + this.getMonth(this.now) + '-08T14:30:00',
	                                className: 'primary',
	                                description: 'Etiam a odio eget enim aliquet laoreet. Vivamus auctor nunc ultrices varius lobortis.',
	                            },
	                            {
	                                id: 3,
	                                title: 'Product Lunching Event',
	                                start: this.now.getFullYear() + '-' + this.getMonth(this.now) + '-17T14:30:00',
	                                end: this.now.getFullYear() + '-' + this.getMonth(this.now) + '-18T14:30:00',
	                                className: 'info',
	                                description:
	                                    'Proin et consectetur nibh. Mauris et mollis purus. Ut nec tincidunt lacus. Nam at rutrum justo, vitae egestas dolor.',
	                            },
	                            {
	                                id: 4,
	                                title: 'Meeting',
	                                start: this.now.getFullYear() + '-' + this.getMonth(this.now) + '-12T10:30:00',
	                                end: this.now.getFullYear() + '-' + this.getMonth(this.now) + '-13T10:30:00',
	                                className: 'danger',
	                                description: 'Mauris ut mauris aliquam, fringilla sapien et, dignissim nisl. Pellentesque ornare velit non mollis fringilla.',
	                            },
	                            {
	                                id: 5,
	                                title: 'Lunch',
	                                start: this.now.getFullYear() + '-' + this.getMonth(this.now) + '-12T15:00:00',
	                                end: this.now.getFullYear() + '-' + this.getMonth(this.now) + '-13T15:00:00',
	                                className: 'info',
	                                description: 'Integer fermentum bibendum elit in egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus.',
	                            },
	                            {
	                                id: 6,
	                                title: 'Conference',
	                                start: this.now.getFullYear() + '-' + this.getMonth(this.now) + '-12T21:30:00',
	                                end: this.now.getFullYear() + '-' + this.getMonth(this.now) + '-13T21:30:00',
	                                className: 'success',
	                                description:
	                                    'Curabitur facilisis vel elit sed dapibus. Nunc sagittis ex nec ante facilisis, sed sodales purus rhoncus. Donec est sapien, porttitor et feugiat sed, eleifend quis sapien. Sed sit amet maximus dolor.',
	                            },
	                            {
	                                id: 7,
	                                title: 'Happy Hour',
	                                start: this.now.getFullYear() + '-' + this.getMonth(this.now) + '-12T05:30:00',
	                                end: this.now.getFullYear() + '-' + this.getMonth(this.now) + '-13T05:30:00',
	                                className: 'info',
	                                description:
	                                    ' odio lectus, porttitor molestie scelerisque blandit, hendrerit sed ex. Aenean malesuada iaculis erat, vitae blandit nisl accumsan ut.',
	                            },
	                            {
	                                id: 8,
	                                title: 'Dinner',
	                                start: this.now.getFullYear() + '-' + this.getMonth(this.now) + '-12T20:00:00',
	                                end: this.now.getFullYear() + '-' + this.getMonth(this.now) + '-13T20:00:00',
	                                className: 'danger',
	                                description:
	                                    'Sed purus urna, aliquam et pharetra ut, efficitur id mi. Pellentesque ut convallis velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	                            },
	                            {
	                                id: 9,
	                                title: 'Birthday Party',
	                                start: this.now.getFullYear() + '-' + this.getMonth(this.now) + '-27T20:00:00',
	                                end: this.now.getFullYear() + '-' + this.getMonth(this.now) + '-28T20:00:00',
	                                className: 'success',
	                                description:
	                                    'Sed purus urna, aliquam et pharetra ut, efficitur id mi. Pellentesque ut convallis velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	                            },
	                            {
	                                id: 10,
	                                title: 'New Talent Event',
	                                start: this.now.getFullYear() + '-' + this.getMonth(this.now, 1) + '-24T08:12:14',
	                                end: this.now.getFullYear() + '-' + this.getMonth(this.now, 1) + '-27T22:20:20',
	                                className: 'danger',
	                                description:
	                                    'Sed purus urna, aliquam et pharetra ut, efficitur id mi. Pellentesque ut convallis velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	                            },
	                            {
	                                id: 11,
	                                title: 'Other new',
	                                start: this.now.getFullYear() + '-' + this.getMonth(this.now, -1) + '-13T08:12:14',
	                                end: this.now.getFullYear() + '-' + this.getMonth(this.now, -1) + '-16T22:20:20',
	                                className: 'primary',
	                                description:
	                                    'Pellentesque ut convallis velit. Sed purus urna, aliquam et pharetra ut, efficitur id mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	                            },
	                            {
	                                id: 13,
	                                title: 'Upcoming Event',
	                                start: this.now.getFullYear() + '-' + this.getMonth(this.now, 1) + '-15T08:12:14',
	                                end: this.now.getFullYear() + '-' + this.getMonth(this.now, 1) + '-18T22:20:20',
	                                className: 'primary',
	                                description:
	                                    'Pellentesque ut convallis velit. Sed purus urna, aliquam et pharetra ut, efficitur id mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	                            },
	                        ];
	                        var calendarEl = document.getElementById('calendar');
	                        this.calendar = new FullCalendar.Calendar(calendarEl, {
	                            initialView: 'dayGridMonth',
	                            headerToolbar: {
	                                left: 'prev,next today',
	                                center: 'title',
	                                right: 'dayGridMonth,timeGridWeek,timeGridDay',
	                            },
	                            editable: true,
	                            dayMaxEvents: true,
	                            selectable: true,
	                            droppable: true,
	                            eventClick: (event) => {
	                                this.editEvent(event);
	                            },
	                            select: (event) => {
	                                this.editDate(event);
	                            },
	                            events: this.events,
	                        });
	                        this.calendar.render();

	                        this.$watch('$store.app.sidebar', () => {
	                            setTimeout(() => {
	                                this.calendar.render();
	                            }, 300);
	                        });
	                    },

	                    getMonth(dt, add = 0) {
	                        let month = dt.getMonth() + 1 + add;
	                        return dt.getMonth() < 10 ? '0' + month : month;
	                    },

	                    editEvent(data) {
	                        this.params = JSON.parse(JSON.stringify(this.defaultParams));
	                        if (data) {
	                            let obj = JSON.parse(JSON.stringify(data.event));
	                            this.params = {
	                                id: obj.id ? obj.id : null,
	                                title: obj.title ? obj.title : null,
	                                start: this.dateFormat(obj.start),
	                                end: this.dateFormat(obj.end),
	                                type: obj.classNames ? obj.classNames[0] : 'primary',
	                                description: obj.extendedProps ? obj.extendedProps.description : '',
	                            };
	                            this.minStartDate = new Date();
	                            this.minEndDate = this.dateFormat(obj.start);
	                        } else {
	                            this.minStartDate = new Date();
	                            this.minEndDate = new Date();
	                        }

	                        this.isAddEventModal = true;
	                    },

	                    editDate(data) {
	                        let obj = {
	                            event: {
	                                start: data.start,
	                                end: data.end,
	                            },
	                        };
	                        this.editEvent(obj);
	                    },

	                    dateFormat(dt) {
	                        dt = new Date(dt);
	                        const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
	                        const date = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
	                        const hours = dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours();
	                        const mins = dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes();
	                        dt = dt.getFullYear() + '-' + month + '-' + date + 'T' + hours + ':' + mins;
	                        return dt;
	                    },

	                    saveEvent() {
	                        if (!this.params.title) {
	                            return true;
	                        }
	                        if (!this.params.start) {
	                            return true;
	                        }
	                        if (!this.params.end) {
	                            return true;
	                        }

	                        if (this.params.id) {
	                            //update event
	                            let event = this.events.find((d) => d.id == this.params.id);
	                            event.title = this.params.title;
	                            event.start = this.params.start;
	                            event.end = this.params.end;
	                            event.description = this.params.description;
	                            event.className = this.params.type;
	                        } else {
	                            //add event
	                            let maxEventId = 0;
	                            if (this.events) {
	                                maxEventId = this.events.reduce((max, character) => (character.id > max ? character.id : max), this.events[0].id);
	                            }

	                            let event = {
	                                id: maxEventId + 1,
	                                title: this.params.title,
	                                start: this.params.start,
	                                end: this.params.end,
	                                description: this.params.description,
	                                className: this.params.type,
	                            };
	                            this.events.push(event);
	                        }
	                        this.calendar.getEventSources()[0].refetch(); //refresh Calendar
	                        this.showMessage('Event has been saved successfully.');
	                        this.isAddEventModal = false;
	                    },

	                    startDateChange(event) {
	                        const dateStr = event.target.value;
	                        if (dateStr) {
	                            this.minEndDate = this.dateFormat(dateStr);
	                            this.params.end = '';
	                        }
	                    },

	                    showMessage(msg = '', type = 'success') {
	                        const toast = window.Swal.mixin({
	                            toast: true,
	                            position: 'top',
	                            showConfirmButton: false,
	                            timer: 3000,
	                        });
	                        toast.fire({
	                            icon: type,
	                            title: msg,
	                            padding: '10px 20px',
	                        });
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
  const form = document.getElementById('employeeAddForm');
  form.reset(); // 모든 입력 필드와 라디오 버튼 초기화
  $('input').removeClass('errorInput');
  // 모든 에러 라벨 숨기기
  $('.error-label').hide();
};

closeModalButton.addEventListener('click', closeModal); // 닫기 버튼 클릭 시
cancelButton.addEventListener('click', closeModal);     // 취소 버튼 클릭 시


