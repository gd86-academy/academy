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
				
						// 테이블 출력
							Alpine.data('multicolumn', () => ({
							    datatable: null,
							    init() {
							        // AJAX 요청
							        $.ajax({
							            url: 'http://localhost/academy/restapi/employeeList',
							            type: 'GET',
							            dataType: 'json',
							            success: (data) => {
											this.datatable = new simpleDatatables.DataTable('#myTable', {
											    data: {
											       
											        data: data.map(item => [
														[item[0], item[5]],	// 이미지파일 + 사원
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
															if(image == 'null.null') {
																return `
																	<div class="flex items-center w-max">
																		<img class="w-9 h-9 rounded-full ltr:mr-2 rtl:ml-2 object-cover" src="./images/defaultProfile.png" />
																		<span>${name}</span>
																	</div>
																`;
															} else {
																return `
																	<div class="flex items-center w-max">
																		<img class="w-9 h-9 rounded-full ltr:mr-2 rtl:ml-2 object-cover" src="./upload/${image}" />
																		&nbsp;&nbsp;&nbsp;<span>${name}</span>
																	</div>
																`;
															}
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
											
											// 행 클릭 이벤트
											document.querySelector('#myTable tbody').addEventListener('click', (e) => {
											    const rowElement = e.target.closest('tr'); // 클릭된 행의 인덱스.
											    if (rowElement) {
													const tdElements = rowElement.querySelectorAll('td');
													const employeeNo = tdElements[1].textContent; // 두번째 열 데이터 추출.
													window.location.href = `/academy/employeeOne?employeeNo=${employeeNo}`;
											    }
											});
							            },
							            error: (xhr, status, error) => {
							                console.error('Error:', error);
							            }
							        });
							    },

						  // Method to handle user selection
						  selectUser(person) {
						    this.selectedUser = person;
						    // You can handle any logic when a user is selected, such as opening a chat or displaying user details
						    console.log('Selected User:', person);
						  }
						}));


                //chat
                Alpine.data('chat', () => ({
                    isShowUserChat: false,
                    isShowChatMenu: false,
                    
                    contactList: [
                        /*{
                            userId: 1,
                            name: 'Nia Hillyer',
                            path: 'profile-16.jpeg',
                            time: '2:09 PM',
                            preview: 'How do you do?',
                            messages: [
                                {
                                    fromUserId: 0,
                                    toUserId: 1,
                                    text: 'Hi, I am back from vacation',
                                },
                                {
                                    fromUserId: 0,
                                    toUserId: 1,
                                    text: 'How are you?',
                                },
                                {
                                    fromUserId: 1,
                                    toUserId: 0,
                                    text: 'Welcom Back',
                                },
                                {
                                    fromUserId: 1,
                                    toUserId: 0,
                                    text: 'I am all well',
                                },
                                {
                                    fromUserId: 0,
                                    toUserId: 1,
                                    text: 'Coffee?',
                                },
                            ],
                            active: true,
                        },*/
                        {
                            userId: 2,
                            name: 'Sean Freeman',
                            path: 'profile-1.jpeg',
                            time: '12:09 PM',
                            preview: 'I was wondering...',
                            messages: [
                                {
                                    fromUserId: 0,
                                    toUserId: 2,
                                    text: 'Hello',
                                },
                                {
                                    fromUserId: 0,
                                    toUserId: 2,
                                    text: "It's me",
                                },
                                {
                                    fromUserId: 0,
                                    toUserId: 2,
                                    text: 'I have a question regarding project.',
                                },
                            ],
                            active: false,
                        },
                        
                    ],
                    searchUser: '',
                    textMessage: '',
                    selectedUser: '',

                    get searchUsers() {
                        setTimeout(() => {
                            const element = document.querySelector('.chat-users');
                            element.scrollTop = 0;
                            element.behavior = 'smooth';
                        });
                        return this.contactList.filter((d) => {
                            return d.name.toLowerCase().includes(this.searchUser);
                        });
                    },

                    selectUser(user) {
                        this.selectedUser = user;
                        this.isShowUserChat = true;
                        this.scrollToBottom;
                        this.isShowChatMenu = false;
                    },

                    sendMessage() {
                        if (this.textMessage.trim()) {
                            const user = this.contactList.find((d) => d.userId === this.selectedUser.userId);
                            user.messages.push({
                                fromUserId: this.selectedUser.userId,
                                toUserId: 0,
                                text: this.textMessage,
                                time: 'Just now',
                            });
                            this.textMessage = '';
                            this.scrollToBottom;
                        }
                    },

                    get scrollToBottom() {
                        if (this.isShowUserChat) {
                            setTimeout(() => {
                                const element = document.querySelector('.chat-conversation-box');
                                element.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'end',
                                });
                            });
                        }
                    },
                }));
            });