// Инициализация Swiper слайдера для отзывов
const swiper = new Swiper('.reviewsSwiper', {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 20,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 25
    },
    1200: {
      slidesPerView: 2,
      spaceBetween: 30
    }
  }
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar-custom');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Мобильное меню
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navbarMenu = document.getElementById('navbarMenu');

if (mobileMenuBtn && navbarMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
    // Меняем иконку бургера на крестик
    if (navbarMenu.classList.contains('active')) {
      mobileMenuBtn.textContent = '✕';
    } else {
      mobileMenuBtn.textContent = '☰';
    }
  });
  
  // Закрываем меню при клике на ссылку
  const navLinks = navbarMenu.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navbarMenu.classList.remove('active');
      if (mobileMenuBtn) mobileMenuBtn.textContent = '☰';
    });
  });
}

// Плавный скролл для всех якорных ссылок
document.querySelectorAll('.nav-link, a[href^="#"], .order-btn').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#' || !targetId) return;
    
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const navbarHeight = document.querySelector('.navbar-custom').offsetHeight;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 20;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Отправка формы
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
    this.reset();
  });
}

// Анимация при скролле
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

const animatedElements = document.querySelectorAll(
  '.card-item-exact, .service-item-no-bg, .about-content-box, ' +
  '.about-image-wrapper, .blog-main-item, .certificate-item, .swiper-slide'
);

animatedElements.forEach(el => {
  observer.observe(el);
});

// Задержка для карточек
document.querySelectorAll('.card-item-exact').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.1}s`;
});

document.querySelectorAll('.service-item-no-bg').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.1}s`;
});

document.querySelectorAll('.certificate-item').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.15}s`;
});

// Плавное появление страницы и обработка якоря из URL
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
  
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      setTimeout(() => {
        const navbarHeight = document.querySelector('.navbar-custom').offsetHeight;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 20;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 100);
    }
  }
});