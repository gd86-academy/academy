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
				
				                
                //chat
                Alpine.data('chat', () => ({
                    isShowUserChat: false,
                    isShowChatMenu: false,
                    loginUser: {
                        id: 0,
                        name: 'Alon Smith',
                        path: 'profile-34.jpeg',
                        designation: 'Software Developer',
                    },
                    contactList: [
                        {
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
                        },
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