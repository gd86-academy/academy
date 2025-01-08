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
	
	Alpine.data('analytics', () => ({
		init() {
			// statistics
            setTimeout(() => {
                // followers
                this.followers = new ApexCharts(this.$refs.followers, this.followersOptions);
                this.followers.render();
            }, 300);
		},
		
	   get followersOptions() {
           return {
               series: [
                   {
                       data: [38, 60, 38, 52, 36, 40],
                   },
               ],
               chart: {
                   height: 160,
                   type: 'area',
                   fontFamily: 'Nunito, sans-serif',
                   sparkline: {
                       enabled: true,
                   },
               },
               stroke: {
                   curve: 'smooth',
                   width: 2,
               },
               colors: ['#4361ee'],
               grid: {
                   padding: {
                       top: 5,
                   },
               },
               yaxis: {
                   show: false,
               },
               tooltip: {
                   x: {
                       show: false,
                   },
                   y: {
                       title: {
                           formatter: (formatter = () => {
                               return '';
                           }),
                       },
                   },
               },
           };
       },
	}));
});



