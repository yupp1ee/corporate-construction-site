// main.js - основной файл JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Прелоадер
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        preloader.classList.add('loaded');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    $(document).ready(function() {
        // Определяем активный пункт меню
        function setActiveMenu() {
            const currentPage = window.location.pathname.split('/').pop();
            $('.mobile-bottom-menu .menu-item').each(function() {
                const href = $(this).attr('href');
                if (href === currentPage ||
                    (currentPage === '' && href === 'index.html') ||
                    (currentPage === 'index.html' && href === 'index.html')) {
                    $(this).addClass('active');
                } else {
                    $(this).removeClass('active');
                }
            });
        }

        // Плавная прокрутка для контактов
        $('.mobile-bottom-menu .menu-item[href="#contacts"]').on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $('#contacts').offset().top
            }, 800);
        });

        // Инициализация при загрузке
        setActiveMenu();

        // Обновляем при изменении размера окна
        $(window).on('resize', function() {
            if ($(window).width() <= 425) {
                setActiveMenu();
            }
        });
    });

    $(document).ready(function() {
        function initHeroSlider() {
            const $slider = $('.hero-slider');
            const $slides = $('.slide');
            const $dots = $('.slider-dots .dot'); // Выбираем существующие точки

            let currentIndex = 0;
            let slideInterval;

            // Функция переключения слайда
            function goToSlide(index) {
                // Проверка границ
                if (index >= $slides.length) {
                    index = 0;
                } else if (index < 0) {
                    index = $slides.length - 1;
                }

                // Скрываем все слайды
                $slides.removeClass('active');
                // Показываем текущий слайд
                $slides.eq(index).addClass('active');

                // Обновляем точки (если они существуют)
                if ($dots.length > 0) {
                    $dots.removeClass('active');
                    $dots.eq(index).addClass('active');
                }

                currentIndex = index;
            }

            // Автопереключение
            function startSlider() {
                stopSlider();
                slideInterval = setInterval(function() {
                    goToSlide(currentIndex + 1);
                }, 5000);
            }

            function stopSlider() {
                clearInterval(slideInterval);
            }

            // Обработчики событий для точек (если они есть)
            if ($dots.length > 0) {
                $dots.on('click', function() {
                    const slideIndex = $(this).index();
                    goToSlide(slideIndex);
                    startSlider();
                });
            }

            // Инициализация
            goToSlide(0);
            startSlider();

            // Пауза при наведении
            $slider.hover(stopSlider, startSlider);
        }

        initHeroSlider();
    });

    // Мобильное меню
    const burgerMenu = document.querySelector('.burger-menu');
    const nav = document.querySelector('.nav');

    burgerMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Закрытие меню при клике на ссылку
    const navLinks = document.querySelectorAll('.nav__list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            burgerMenu.classList.remove('active');
            nav.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Фиксированная шапка при скролле
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Плавная прокрутка к якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 90,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Модальные окна
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const body = document.body;

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);

            modal.classList.add('show');
            body.classList.add('no-scroll');

            // Закрытие при клике вне модального окна
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    closeModal(modal);
                }
            });
        });
    });

    // Кнопки закрытия модальных окон
    const closeButtons = document.querySelectorAll('.modal__close');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });

    function closeModal(modal) {
        modal.classList.remove('show');
        body.classList.remove('no-scroll');
    }

    // Попап скидки (появляется через 5 секунд)
    setTimeout(() => {
        const discountModal = document.getElementById('discount-modal');
        const isModalShown = localStorage.getItem('discountModalShown');

        if (!isModalShown) {
            discountModal.classList.add('show');
            body.classList.add('no-scroll');
            localStorage.setItem('discountModalShown', 'true');

            discountModal.addEventListener('click', function(e) {
                if (e.target === this) {
                    closeModal(discountModal);
                }
            });
        }
    }, 5000);

    // Формы
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const formType = this.id || 'Форма на странице';

            // Здесь должна быть логика отправки формы (AJAX, fetch и т.д.)
            console.log(`Отправлена форма: ${formType}`, Object.fromEntries(formData));

            // Показываем сообщение об успешной отправке
            showSuccessMessage(this);
        });
    });

    function showSuccessMessage(form) {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div class="success-content">
                <svg viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
                </svg>
                <h3>Спасибо!</h3>
                <p>Ваша заявка успешно отправлена. Наш менеджер свяжется с вами в ближайшее время.</p>
            </div>
        `;

        form.parentNode.insertBefore(successMessage, form);
        form.style.display = 'none';

        setTimeout(() => {
            successMessage.classList.add('show');
        }, 50);
    }

    // Анимации при скролле
    const animateElements = document.querySelectorAll('[data-animate]');

    function checkAnimation() {
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;

            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    }

    window.addEventListener('scroll', checkAnimation);
    window.addEventListener('load', checkAnimation);

    // Фильтрация портфолио
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Удаляем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Инициализация слайдера отзывов
    initReviewsSlider();
});

// slider.js - слайдер отзывов
function initReviewsSlider() {
    const slider = document.querySelector('.reviews-slider');
    if (!slider) return;

    const slides = document.querySelectorAll('.review');
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'slider-dots';

    // Создаем точки для слайдера
    slides.forEach((slide, index) => {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    slider.parentNode.appendChild(dotsContainer);

    let currentSlide = 0;
    const dots = document.querySelectorAll('.slider-dots .dot');

    function goToSlide(index) {
        slides.forEach(slide => slide.style.display = 'none');
        dots.forEach(dot => dot.classList.remove('active'));

        slides[index].style.display = 'block';
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
    }

    // Инициализация первого слайда
    slides.forEach(slide => slide.style.display = 'none');
    slides[0].style.display = 'block';

    // Автопереключение слайдов
    setInterval(nextSlide, 5000);
}

// calculator.js - калькулятор стоимости ремонта (добавляется на соответствующие страницы)
function initRepairCalculator() {
    const calculatorForm = document.getElementById('calculator-form');
    if (!calculatorForm) return;

    const areaInput = calculatorForm.querySelector('[name="area"]');
    const typeSelect = calculatorForm.querySelector('[name="type"]');
    const packageRadios = calculatorForm.querySelectorAll('[name="package"]');
    const resultElement = calculatorForm.querySelector('.calculator-result');

    // Цены за квадратный метр для разных типов ремонта
    const prices = {
        apartment: {
            cosmetic: 3000,
            standard: 6000,
            premium: 12000
        },
        office: {
            cosmetic: 2500,
            standard: 5000,
            premium: 9000
        },
        house: {
            cosmetic: 3500,
            standard: 7000,
            premium: 15000
        },
        commercial: {
            cosmetic: 2000,
            standard: 4500,
            premium: 8000
        }
    };

    // Расчет стоимости при изменении параметров
    function calculateCost() {
        const area = parseFloat(areaInput.value) || 0;
        const type = typeSelect.value;
        let selectedPackage = 'standard';

        packageRadios.forEach(radio => {
            if (radio.checked) selectedPackage = radio.value;
        });

        if (type && prices[type] && prices[type][selectedPackage]) {
            const costPerMeter = prices[type][selectedPackage];
            const totalCost = area * costPerMeter;

            resultElement.innerHTML = `
                <div class="result-item">
                    <span>Стоимость:</span>
                    <strong>${totalCost.toLocaleString()} руб.</strong>
                </div>
                <div class="result-item">
                    <span>Срок выполнения:</span>
                    <strong>${Math.ceil(area / 10)} дней</strong>
                </div>
                <div class="result-note">
                    *Точную стоимость уточнит наш специалист после замера
                </div>
            `;
        } else {
            resultElement.innerHTML = '<div class="result-error">Выберите параметры для расчета</div>';
        }
    }

    // Слушатели событий
    areaInput.addEventListener('input', calculateCost);
    typeSelect.addEventListener('change', calculateCost);
    packageRadios.forEach(radio => {
        radio.addEventListener('change', calculateCost);
    });

    // Инициализация расчета
    calculateCost();
}

// Инициализация калькулятора при загрузке соответствующих страниц
if (document.querySelector('.calculator-section')) {
    document.addEventListener('DOMContentLoaded', initRepairCalculator);
}