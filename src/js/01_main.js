const swiperBlog = new Swiper('.l-blog__slider .swiper', {
  spaceBetween: 18,
  slidesPerView: 3,
  speed: 1000,
  navigation: {
    nextEl: '.l-blog__card-swiper-next',
    prevEl: '.l-blog__card-swiper-prev',
  },
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 18
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 2,
      spaceBetween: 18
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 3,
      spaceBetween: 18
    }
  }
});


const swiperSols = document.querySelectorAll('.l-popular-solutions__cards-tab.swiper');
swiperSols.forEach(el => {
  const swiperr = new Swiper(el, {
    spaceBetween: 18,
    slidesPerView: 1,
    speed: 1000,
    allowTouchMove: false,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 18,
        allowTouchMove: true,
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 'auto',
        spaceBetween: 0
      }
    }
  });
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

const swiperGoldenCards = new Swiper('.l-advice-cards__swiper .swiper', {
  spaceBetween: 20,
  slidesPerView: 3,
  centeredSlides: false,
  speed: 1000,
  navigation: {
    nextEl: '.l-blog__card-swiper-next.gold-card',
    prevEl: '.l-blog__card-swiper-prev.gold-card',
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

//tab 1
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

//tab 2 in second page detail  product
const $btns2 = $('.l-product__detail-card');
const $tabs2 = $('.l-product__detail-right--img');

$btns2.on('click', function() {
  $btns2.removeClass('active');
  $(this).addClass('active');

  const tabToShow2 = $(this).data('popull');
  const $tab2 = $('#' + tabToShow2);

  $tabs2.removeClass('active');
  $tab2.addClass('active');

  // $tabs2.fadeOut(200, function() {
  //   $tab2.fadeIn(200);
  // });

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

