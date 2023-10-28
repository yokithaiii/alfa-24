const swiperBlog = new Swiper('.l-blog__slider .swiper', {
  spaceBetween: 18,
  slidesPerView: 3,
  speed: 1000,
  navigation: {
    nextEl: '.l-blog__card-swiper-next',
    prevEl: '.l-blog__card-swiper-prev',
  },
});

const swiperCases = new Swiper('.l-cases__swiper', {
  slidesPerView: 1,
  fadeEffect: { crossFade: true },
  virtualTranslate: true,
  effect: "fade",
  speed: 1000,
  allowTouchMove: false,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: '.l-cases__card-swiper-next',
    prevEl: '.l-cases__card-swiper-prev',
  },
});

const swiperContacts = new Swiper('.l-contacts__slider-swiper .swiper', {
  spaceBetween: 20,
  slidesPerView: "auto",
  speed: 1000,
  navigation: {
    nextEl: '.l-blog__card-swiper-next',
    prevEl: '.l-blog__card-swiper-prev',
  },
});


const dots = document.querySelectorAll('.l-complex__body-dot');
document.addEventListener('click', function(event) {
  dots.forEach(dot => {
    dot.classList.remove('active');
    dot.classList.remove('stop');
  });
});

dots.forEach(el => {
  el.addEventListener('click', function(event) {
    event.stopPropagation();
    dots.forEach(dot => {
      dot.classList.remove('active');
      dot.classList.remove('stop');
    });
    el.classList.add('stop');
    el.classList.add('active');
  });
});


const $btns = $('.l-popular-solutions__tabs li');
const $tabs = $('.l-popular-solutions__cards-tab');

$btns.on('click', function() {
  $btns.removeClass('active');
  $(this).addClass('active');

  const tabToShow = $(this).data('popul');
  const $tab = $('#' + tabToShow);

  $tabs.removeClass('active');
  $tab.addClass('active');

  $tabs.fadeOut(200, function() {
    $tab.fadeIn(200);
  });

});


const $pauseBtn = $('.l-cases__card-swiper-play');
let $isAutoplayPaused = false;
$pauseBtn.on('click', function() {
  $(this).toggleClass('active');

  if ($isAutoplayPaused) {
    swiperCases.autoplay.start();
  } else {
    swiperCases.autoplay.stop();
  }

  $isAutoplayPaused = !$isAutoplayPaused;
});

