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
		notifications: [],  // 빈 배열로 초기화
			    employeeNo: employeeNo,  // 예시로 직원 번호를 하드코딩했지만, 실제 값에 맞게 설정

			    // 알림 데이터를 가져오는 함수
			    loadNotifications() {
			        $.ajax({
			            url: "http://localhost/academy/restapi/newNoticeList",  // REST API 엔드포인트
			            contentType: 'application/json',
			            type: 'POST',
			            data: JSON.stringify(this.employeeNo),  // this.employeeNo를 사용해 보내기
			            success: (data) => {
			                // 서버에서 받은 데이터를 notifications 배열 형식으로 변환
			                this.notifications = data.map(item => ({
			                    id: item.noticeNo,  // 알림 ID
			                    message: `<span class="text-sm mr-1">${item.noticeContent}</span>`,  // 메시지
			                    time: item.createDate,  // 시간
			                }));
			                console.log(this.notifications);  // 확인용
			            },
			            error: () => {
			                alert("알림을 불러오는 중 오류가 발생했습니다.");
			            }
			        });
			    },

			    // 초기화 시 알림을 로드하는 함수
			    init() {
			        this.loadNotifications();  // 알림 목록 로드
			    }
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
            this.initMulticolumn(); // 직원 목록 가져오기
            this.getCurrentUser(); // 현재 로그인한 사용자 가져오기
            
            // 일정 간격으로 메시지 갱신(1초)
            setInterval(() => {
                if (this.selectedUser) {
                    this.getMessages();
                }
            }, 1000);
        },

        getCurrentUser() { // 로그인한 사용자의 정보 가져오기 (이름) -> GET요청을 보내 현재 로그인한 사용자의 이름을 가져옴
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

        initMulticolumn() { // 왼쪽 채팅목록에 직원 목록을 가져옴 (로그인한 사용자를 제외하고 테이블에 표시)
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
						
						// 직원 리스트가 5명이 넘어가면 페이징하는 버튼
						firstLast: true,
						    firstText: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>',
						    lastText: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M11 19L17 12L11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M6.99976 19L12.9998 12L6.99976 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>',
						    prevText: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M15 5L9 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>',
						    nextText: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>',
							
                        layout: {
							top: '<div class="dataTable-top">{search}</div>',
							bottom: '{pager}'
							
                        },
						
                    });
					
					// 안 읽은 
                    this.updateUnreadCounts();

                    // 해당 직원의 행을 클릭해서 채팅 상대 선택
					document.querySelector('#chatUserTable tbody').addEventListener('click', (e) => {
					    const rowElement = e.target.closest('tr');
					    if (rowElement) {
					        const nameElement = rowElement.querySelector('.employee-name');
							const imageElement = rowElement.querySelector('img');
					        const unreadCountElement = rowElement.querySelector('.unread-count'); // updateUnreadCounts()
					        if (nameElement&&imageElement) {
					            const employeeName = nameElement.textContent.trim();
								const employeeImageData = imageElement.getAttribute('src').split('/').pop();
					            console.log(employeeName, employeeImageData);

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
					                    this.selectUser(employeeName,employeeImageData);
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

        updateUnreadCounts() { // 사용자별로 읽지 않은 메시지 개수를 동적으로 표시
            const unreadCountElements = document.querySelectorAll('.unread-count');
            unreadCountElements.forEach(element => {
                const username = element.getAttribute('data-username'); // columns에서 가져옴
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
        selectUser(user,userImage) { 
            console.log('Selected user:', user);		
            this.selectedUser = user;
			this.selectedUserImage = userImage === 'null.null' ? './images/defaultProfile.png' : './upload/' + userImage; // 이미지 받아오기
            this.isShowUserChat = true;
            this.scrollToBottom(); // 수정된 호출
            this.isShowChatMenu = false;
            this.getMessages(); // 해당 직원과의 채팅 메시지를 가져옴
			
			
        },

        getUnreadMessageCount(userName, callback) { // 특정 사용자가 보낸 읽지 않은 메시지 수를 가져오는 함수
            $.ajax({
                url: 'http://localhost/academy/chat/unreadCount',
                type: 'GET',
                data: {
                    fromUserName: userName, // 보낸 사람
                    toUserName: this.currentUserName // 받은 사람 (현재 로그인한 사용자)
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
						this.scrollToBottom();
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
                    
                },
                error: (xhr, status, error) => {
                    console.error('Error getting messages:', xhr.responseText);
                }
            });
        },
		
		formatDateTime(dateString) {
		    const date = new Date(dateString);
		    const formattedDate = date.toLocaleDateString();
		    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
		    return `${formattedDate} ${formattedTime}`;
		},


        // 스크롤 바 기능
		scrollToBottom() {
		    this.$nextTick(() => {
		        setTimeout(() => {
		            const chatBox = document.querySelector('.chat-conversation-box');
		            if (chatBox) {
		                const scrollContainer = chatBox.closest('.perfect-scrollbar');
		                if (scrollContainer) {
		                    scrollContainer.scrollTop = scrollContainer.scrollHeight;
		                } else {
		                    // perfect-scrollbar가 없는 경우 chat-conversation-box 자체를 스크롤
		                    chatBox.scrollTop = chatBox.scrollHeight;
		                }
		            } else {
		                console.warn('Chat box not found, scrollToBottom failed');
		            }
		        }, 100);
		    });
		}

    }));
});
