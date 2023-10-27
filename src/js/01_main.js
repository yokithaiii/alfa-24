const swiperBlog = new Swiper('.l-blog__slider .swiper', {
  spaceBetween: 18,
  slidesPerView: 3,
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

