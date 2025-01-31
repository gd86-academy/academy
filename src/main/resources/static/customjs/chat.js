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

    // chat section
    Alpine.data('chat', () => ({
        isShowUserChat: false, // 사용자 채팅 화면 표시 여부
        isShowChatMenu: false, // 채팅 메뉴 표시 여부
        chatUserTable: null, // 테이블 객체
        textMessage: '', // 사용자가 입력한 메시지 내용
        selectedUser: '', // 현재 선택된 사용자
        currentUserName: '', // 로그인한 사용자의 이름
        messages: [], // 채팅 메시지 목록

        initChat() { // 채팅 기능 초기화
            this.initMulticolumn();
            this.getCurrentUser();
            
            // 일정 간격으로 메시지 갱신
            setInterval(() => {
                if (this.selectedUser) {
                    this.getMessages();
                }
            }, 1000);
        },

        getCurrentUser() { // 로그인한 사용자의 정보 가져오기 (이름)
            $.ajax({
                url: 'http://localhost/academy/chat/fromUserId',
                type: 'GET',
                success: (userName) => {
                    this.currentUserName = userName;
                },
                error: (xhr, status, error) => {
                    console.error('Error getting current user:', error);
                }
            });
        },

        initMulticolumn() { // 왼쪽 채팅목록에 직원 목록을 가져옴
            $.ajax({
                url: 'http://localhost/academy/restapi/employeeList',
                type: 'GET',
                dataType: 'json',
                success: (data) => {
                    // 로그인한 사용자를 제외한 데이터 필터링
                    const filteredData = data.filter(item => item[0] !== this.currentUserName);

                    this.chatUserTable = new simpleDatatables.DataTable('#chatUserTable', {
                        data: {
                            data: filteredData.map(item => [
                                [item[0], item[5]]
                            ])
                        },

                        searchable: true,
                        perPage: 5,
                        perPageSelect: [10, 20, 30, 50, 100],

                        columns: [
                            {
                                select: 0,
                                render: (data, cell, row) => {
                                    const [name, image] = data.split(',');
                                    return `
                                        <div class="flex items-center w-max">
                                            <img class="w-9 h-9 rounded-full ltr:mr-2 rtl:ml-2 object-cover" 
                                                 src="${image === 'null.null' ? './images/defaultProfile.png' : './upload/' + image}" />
                                            <span class="employee-name">${name}</span>
                                            <span class="ml-2 unread-count text-red-500 font-bold" data-username="${name}"></span>
                                        </div>
                                    `;
                                },

                                sortable: true,
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

                        layout: {
                            top: '{search}',
                        },
                    });

                    this.updateUnreadCounts();

                    // 해당 직원의 행을 클릭해서 채팅 상대 선택
					document.querySelector('#chatUserTable tbody').addEventListener('click', (e) => {
					    const rowElement = e.target.closest('tr');
					    if (rowElement) {
					        const nameElement = rowElement.querySelector('.employee-name');
					        const unreadCountElement = rowElement.querySelector('.unread-count');
					        if (nameElement) {
					            const employeeName = nameElement.textContent.trim();
					            console.log(employeeName);

					            // DB의 use_yn을 0으로 변경하는 AJAX 요청
					            $.ajax({
					                url: 'http://localhost/academy/chat/updateUseYn',
					                type: 'POST',
					                data: {
					                    fromUserName: employeeName,  
					                    toUserName: this.currentUserName  
					                },
					                success: () => {
					                    console.log('use_yn updated successfully');
					                    // 읽지 않은 메시지 카운트를 화면에서 제거
					                    if (unreadCountElement) {
					                        unreadCountElement.textContent = '';
					                    }
					                    this.selectUser(employeeName);
					                },
					                error: (xhr, status, error) => {
					                    console.error('Error updating use_yn:', error);
					                }
					            });
					        }
					    }
					});

                },
            });
        },

        updateUnreadCounts() {
            const unreadCountElements = document.querySelectorAll('.unread-count');
            unreadCountElements.forEach(element => {
                const username = element.getAttribute('data-username');
                this.getUnreadMessageCount(username, (unreadCount) => {
                    if (unreadCount > 0) {
                        element.textContent = `(${unreadCount})`;
                    } else {
                        element.textContent = '';
                    }
                });
            });
        },

        // 선택된 직원을 저장하고, 채팅 화면에 표시
        selectUser(user) {
            console.log('Selected user:', user);
            this.selectedUser = user;
            this.isShowUserChat = true;
            this.scrollToBottom(); // 수정된 호출
            this.isShowChatMenu = false;
            this.getMessages(); // 해당 직원과의 채팅 메시지를 가져옴
        },

        getUnreadMessageCount(userName, callback) {
            $.ajax({
                url: 'http://localhost/academy/chat/unreadCount',
                type: 'GET',
                data: {
                    fromUserName: userName,
                    toUserName: this.currentUserName
                },
                success: (unreadCount) => {
                    callback(unreadCount);
                },
                error: (xhr, status, error) => {
                    console.error('Error getting unread message count:', error);
                    callback(0);
                }
            });
        },

        sendMessage() { // 메시지 보내기
            if (this.textMessage.trim()) {
                $.ajax({
                    url: 'http://localhost/academy/chat/send',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        fromUserName: this.currentUserName,
                        toUserName: this.selectedUser,
                        content: this.textMessage
                    }),
                    success: () => {
                        this.textMessage = '';
                        this.getMessages();
                    },
                    error: (xhr, status, error) => {
                        console.error('Error sending message:', error);
                    }
                });
            }
        },

        getMessages() { // 채팅 메시지 가져오기
            console.log('Sending request:', this.currentUserName, this.selectedUser);
            $.ajax({
                url: 'http://localhost/academy/chat/messages',
                type: 'GET',
                data: {
                    fromUserName: this.currentUserName.trim(),
                    toUserName: this.selectedUser.trim()
                },
                success: (messages) => {
                    console.log('Received messages:', messages);
                    this.messages = messages;
                    this.scrollToBottom();
                },
                error: (xhr, status, error) => {
                    console.error('Error getting messages:', xhr.responseText);
                }
            });
        },

        // 스크롤 바 기능
        scrollToBottom() {
            setTimeout(() => {
                const chatBox = document.querySelector('.chat-conversation-box');
                chatBox.scrollTop = chatBox.scrollHeight;
            }, 100);
        },
    }));
});
