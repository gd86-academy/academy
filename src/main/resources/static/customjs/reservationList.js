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
	// 캘린더
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
	        // AJAX 요청
	        $.ajax({
	            url: `http://localhost/academy/restapi/reservationList`,
	            type: 'GET',
	            dataType: 'json',
	            success: (data) => {
	                this.events = data.map(event => ({
	                    id: event.reservationNo,
	                    title: event.reservationTitle,
	                    start: event.reservationDate, // 서버에서 전달받은 날짜 형식으로 처리
	                    end: event.endTimeCode,
	                    extendedProps: {
	                        meetingroomName: event.meetingroomName || '회의실 없음',
	                        employees: event.reservationEmployees.map(emp => emp.employeeName).join(', ') || '참여자 없음',
	                        description: event.reservationContent || '상세 내용 없음',
	                    }
	                }));

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
	                    // 툴팁 설정
	                    eventMouseEnter: function(info) {
	                        const event = info.event;

	                        // 툴팁의 내용을 설정합니다
	                        const tooltipContent = `
	                            <strong>회의실:</strong> ${event.extendedProps.meetingroomName}<br>
	                            <strong>참여자:</strong> ${event.extendedProps.employees}<br>
	                            <strong>시작 시간:</strong> ${event.start.toLocaleString()}<br>
	                            <strong>종료 시간:</strong> ${event.end.toLocaleString()}<br>
	                            <strong>상세 내용:</strong> ${event.extendedProps.description}
	                        `;
	                        
	                        // 툴팁을 활성화합니다
	                        const tooltip = document.createElement('div');
	                        tooltip.className = 'tooltip bs-tooltip-top';
	                        tooltip.setAttribute('role', 'tooltip');
	                        tooltip.innerHTML = `<div class="arrow"></div><div class="tooltip-inner">${tooltipContent}</div>`;
	                        document.body.appendChild(tooltip);

	                        // 툴팁 위치를 계산합니다
	                        const rect = info.el.getBoundingClientRect();
	                        tooltip.style.top = `${rect.top + window.scrollY - tooltip.offsetHeight - 5}px`;
	                        tooltip.style.left = `${rect.left + window.scrollX + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
	                    },
	                    eventMouseLeave: function(info) {
	                        // 마우스를 벗어나면 툴팁을 제거합니다
	                        const tooltips = document.querySelectorAll('.tooltip');
	                        tooltips.forEach(tooltip => tooltip.remove());
	                    },
	                });
	                this.calendar.render();

	                this.$watch('$store.app.sidebar', () => {
	                    setTimeout(() => {
	                        this.calendar.render();
	                    }, 300);
	                });
	            },
	            error: (xhr, status, error) => {
	                console.error('Error:', error);
	            }
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