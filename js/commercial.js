// Mobile menu toggle
const burgerMenu = document.querySelector('.burger-menu');
const nav = document.querySelector('.nav');
const body = document.body;

burgerMenu.addEventListener('click', function() {
    this.classList.toggle('active');
    nav.classList.toggle('active');
    body.classList.toggle('menu-open');
});

// Close menu when clicking on links
const navLinks = document.querySelectorAll('.nav__list a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        burgerMenu.classList.remove('active');
        nav.classList.remove('active');
        body.classList.remove('menu-open');
    });
});

$(document).ready(function() {
    // Активация пункта меню при клике
    $('.mobile-nav-item').click(function() {
        $('.mobile-nav-item').removeClass('active');
        $(this).addClass('active');
    });

    // Определение текущей страницы и активация соответствующего пункта меню
    var currentPage = window.location.pathname.split('/').pop();
    $('.mobile-nav-item').each(function() {
        var linkPage = $(this).attr('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            $(this).addClass('active');
        }
    });
});

// Fixed header on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

$(document).ready(function() {
    // Параллакс эффект для hero-секции


        // Применяем трансформацию к фону
        $('.hero-bg').css({
            'transform': 'translate3d(0, ' + parallaxValue + 'px, 0)',
            'will-change': 'transform'
        });

        // Дополнительный эффект для контента (опционально)
        $('.hero-content').css({
            'transform': 'translateY(' + (scrollPosition * 0.2) + 'px)',
            'opacity': 1 - scrollPosition / 500
        });
    });
});

    // Калькулятор стоимости
    const $calculatorForm = $('#calculate');
    const $areaInput = $('#area');
    const $packageSelect = $('#package');
    const $totalElement = $('#total');

    $calculatorForm.add($areaInput).add($packageSelect).on('click input change', calculateTotal);

    function calculateTotal() {
        const area = parseFloat($areaInput.val()) || 0;
        const pricePerMeter = parseFloat($packageSelect.val());
        const total = area * pricePerMeter;

        $totalElement.text(`${total.toLocaleString('ru-RU')} ₽`);
    }

    // Инициализация расчета при загрузке
    calculateTotal();

    // Плавная прокрутка для кнопки "Рассчитать стоимость"
    $('#calculateBtn').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $('.calculator').offset().top
        }, 800);
    });

    // Анимация при наведении на галерею
    $('.gallery-item').on({
        mouseenter: function() {
            $(this).find('.gallery-overlay').css('transform', 'translateY(0)');
        },
        mouseleave: function() {
            $(this).find('.gallery-overlay').css('transform', 'translateY(100%)');
        }
    });
});