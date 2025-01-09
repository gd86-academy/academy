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
	
	// 날씨 API 사용
	
	Alpine.data('contacts1', () => ({
	    init() {
	        this.fetchWeather();
	    },

	    fetchWeather() {
	        // 5일치 예보 데이터를 가져오는 API
	        $.ajax({
	            url: 'https://api.openweathermap.org/data/2.5/forecast?q=Seoul&appid=c17fba3e8451a1665c094b90fc0dd175&units=metric',
	            type: 'GET',
	            dataType: 'json',
	            success: (data) => {
	                // 현재 날씨 데이터 가져오기
	                const currentTemp = data.list[0].main.temp; // 첫 번째 데이터는 현재 시간 기준
	                const currentIconCode = data.list[0].weather[0].icon;
	                const currentIconURL = `https://openweathermap.org/img/wn/${currentIconCode}@2x.png`;

	                // 현재 날씨 출력
	                $('#currentTemperature').text(`${currentTemp}°C`); // 온도 업데이트
	                $('#currentIcon').attr('src', currentIconURL); // 아이콘 업데이트

	                // 요일별 온도 출력
	                const weeklyData = data.list.filter((item, index) => index % 8 === 0); // 매일 한 번씩 데이터 가져오기
	                let weeklyHTML = '';

	                weeklyData.forEach((day, index) => {
	                    const dayTemp = day.main.temp;
	                    const dayName = this.getDayName(new Date(day.dt_txt).getDay()); // 요일 이름
	                    weeklyHTML += `
	                        <div class="mt-3 font-semibold text-white">
	                            ${dayName} ${dayTemp}°C
	                        </div>`;
	                });

	                // 요일별 데이터 업데이트
	                $('#weeklyWeather').html(weeklyHTML);
	            },
	            error: (err) => {
	                console.error('Weather data fetch error:', err);
	            }
	        });
	    },

	    getDayName(dayIndex) {
	        // 요일 이름 배열
	        const days = ['일', '월', '화', '수', '목', '금', '토'];
	        return days[dayIndex];
	    }
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



