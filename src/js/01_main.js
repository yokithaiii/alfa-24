document.addEventListener("DOMContentLoaded", function(event) {
  class Tabs {
    constructor(root) {
        this.root = root;
        this.list = this.root.querySelector('[data-list]');
        this.buttons = new Map([...this.list.querySelectorAll('[data-target]')]
            .map(entry => [
                entry.dataset.target,
                entry,
            ])
        );
        this.containers = new Map([...this.root.querySelectorAll('[data-tab]')]
            .map(entry => [entry.dataset.tab, entry])
        );
        this.salt = Math.random().toString(36).slice(2);
        this.current = null;
        this.active = null;
    }

    select(name) {
        const keys = [...this.buttons.keys()];

        for (let [key, button] of this.buttons.entries()) {
            button.setAttribute('aria-selected', key === name);
            if (key === name) {
              button.classList.add('active');
            } else {
              button.classList.remove('active');
            }
        }

        for (let [key, container] of this.containers.entries()) {
          console.log(key,name);
            if (key === name) {
                container.removeAttribute('hidden');
                container.classList.add('active');
              } else {
                container.setAttribute('hidden', true);
                container.classList.remove('active');
            }
        }

        this.active = keys.indexOf(name);
    }

    init() {
        const keys = [...this.buttons.keys()];

        this.list.setAttribute('role', 'tablist');

        this.list.addEventListener('keydown', event => {
            if (event.code === 'Home') {
                event.preventDefault();

                this.buttons.get(keys[0]).focus();
            }

            if (event.code === 'End') {
                event.preventDefault();

                this.buttons.get(keys[keys.length - 1]).focus();
            }

            if (event.code === 'ArrowLeft') {
                event.preventDefault();

                this.buttons.get(keys[Math.max(0, this.current - 1)]).focus();
            }

            if (event.code === 'ArrowRight') {
                event.preventDefault();

                this.buttons.get(keys[Math.min(keys.length - 1, this.current + 1)]).focus();
            }
        });

        for (let [key, button] of this.buttons.entries()) {
            button.setAttribute('tabindex', '0');
            button.setAttribute('id', `button_${this.salt}_${key}`);
            button.setAttribute('role', 'tab');
            button.setAttribute('aria-controls', `container_${this.salt}_${key}`);

            button.addEventListener('click', event => {
                event.preventDefault();

                this.select(key);
            });

            button.addEventListener('focus', event => {
                this.current = keys.indexOf(key);
            });

            button.addEventListener('keypress', event => {
                if (event.code === 'Enter' || event.code === 'Space') {
                    event.preventDefault();

                    this.select(key);
                }
            });
        }

        for (let [key, container] of this.containers.entries()) {
            container.setAttribute('id', `container_${this.salt}_${key}`);
            container.setAttribute('role', 'tabpanel');
            container.setAttribute('aria-labelledby', `button_${this.salt}_${key}`);
        }

        this.select(keys[0]);
    }

    static create(element) {
        const instance = new Tabs(element);
        instance.init();

        return instance;
    }
  }

  const containers = document.querySelectorAll('[data-tabs]');

  for (let container of containers) {
    const tabs = Tabs.create(container);
    // console.log(tabs)
  }

});


document.addEventListener("DOMContentLoaded", function() {
  const sections = document.querySelectorAll(".l-products__content .l-products__item");
  const navLinks = document.querySelectorAll(".l-products__nav-wrapper a");

  const sectionOffsets = Array.from(sections).map(section => section.offsetTop);

  let offsetMargin = window.innerWidth >= 426 ? 350 : 0;
  let offsetMarginLink = window.innerWidth >= 426 ? 150 : 50;

  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;

    sectionOffsets.forEach((offset, index) => {
      if (scrollPosition >= offset - offsetMargin) {
        navLinks.forEach(link => link.classList.remove("active"));
        navLinks[index].classList.add("active");
      }
    });
  });

  window.addEventListener("resize", () => {
    offsetMargin = window.innerWidth >= 426 ? 350 : 0;
    offsetMarginLink = window.innerWidth >= 426 ? 150 : 50;
  });

  navLinks.forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const targetOffset = targetSection.offsetTop - offsetMarginLink;
        window.scrollTo({ top: targetOffset, behavior: "smooth" });
      }
    });
  });

  const scrollRightButton = document.querySelector(".scrollRightButton");
  const scrollLeftButton = document.querySelector(".scrollLeftButton");
  const scrollContainer = document.querySelector(".l-popular-solutions__tabs-wrapper");
  
  scrollRightButton.addEventListener("click", () => {
    scrollContainer.scrollBy({ left: 200, behavior: "smooth" });
  
    // Проверяем, достигли ли мы максимума влево или вправо, и скрываем соответствующую кнопку при необходимости
    const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= maxScrollLeft) {
      scrollRightButton.style.display = "none";
    }
    if (scrollContainer.scrollLeft > 0) {
      scrollLeftButton.style.display = "block";
    }
  });
  
  scrollLeftButton.addEventListener("click", () => {
    scrollContainer.scrollBy({ left: -200, behavior: "smooth" });
  
    // Проверяем, достигли ли мы максимума влево или вправо, и скрываем соответствующую кнопку при необходимости
    if (scrollContainer.scrollLeft <= 0) {
      scrollLeftButton.style.display = "none";
    }
    if (scrollContainer.scrollLeft + scrollContainer.clientWidth < scrollContainer.scrollWidth) {
      scrollRightButton.style.display = "block";
    }
  });

  const scrollRightButton2 = document.querySelector(".scrollRightButton2");
  const scrollLeftButton2 = document.querySelector(".scrollLeftButton2");
  const scrollContainer2 = document.querySelector(".l-products__nav");

  scrollRightButton2.addEventListener("click", () => {
    scrollContainer2.scrollBy({ left: 200, behavior: "smooth" });
  
    // Проверяем, достигли ли мы максимума влево или вправо, и скрываем соответствующую кнопку при необходимости
    const maxScrollLeft = scrollContainer2.scrollWidth - scrollContainer2.clientWidth;
    if (scrollContainer2.scrollLeft + scrollContainer2.clientWidth >= maxScrollLeft) {
      scrollRightButton2.style.display = "none";
    }
    if (scrollContainer2.scrollLeft > 0) {
      scrollLeftButton2.style.display = "block";
    }
  });
  
  scrollLeftButton2.addEventListener("click", () => {
    scrollContainer2.scrollBy({ left: -200, behavior: "smooth" });
  
    // Проверяем, достигли ли мы максимума влево или вправо, и скрываем соответствующую кнопку при необходимости
    if (scrollContainer2.scrollLeft <= 0) {
      scrollLeftButton2.style.display = "none";
    }
    if (scrollContainer2.scrollLeft + scrollContainer2.clientWidth < scrollContainer2.scrollWidth) {
      scrollRightButton2.style.display = "block";
    }
  });

});


const swiperBlog = new Swiper('.l-blog__slider .swiper', {
  spaceBetween: 18,
  slidesPerView: 3,
  slidesPerGroup: 3,
  speed: 1000,
  navigation: {
    nextEl: '.l-blog__slider .l-blog__card-swiper-next',
    prevEl: '.l-blog__slider .l-blog__card-swiper-prev',
  },
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 18
    },
    // when window width is >= 480px
    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 18
    },
    // when window width is >= 640px
    1024: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 18
    }
  }
});


const swiperSols = document.querySelectorAll('.l-popular-solutions__cards-tab.swiper');
let i = 1;
swiperSols.forEach(el => {
  const swiperr = new Swiper(el, {
    spaceBetween: 18,
    slidesPerView: 1,
    speed: 1000,
    allowTouchMove: false,
    navigation: {
      nextEl: '#popul-'+i+' .l-blog__card-swiper-next',
      prevEl: '#popul-'+i+' .l-blog__card-swiper-prev',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 18,
        allowTouchMove: true,
      },
      // when window width is >= 480px
      768: {
        slidesPerView: 2,
        spaceBetween: 18,
        allowTouchMove: true,
      },
      // when window width is >= 640px
      1200: {
        slidesPerView: 'auto',
        spaceBetween: 0
      }
    }
  });

  i++;
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
    nextEl: '.l-cases__swiper .l-cases__card-swiper-next',
    prevEl: '.l-cases__swiper .l-cases__card-swiper-prev',
  },
});

const swiperContacts = new Swiper('.l-contacts__slider-swiper .swiper', {
  spaceBetween: 20,
  slidesPerView: "auto",
  speed: 1000,
  navigation: {
    nextEl: '.l-contacts__slider-swiper .l-blog__card-swiper-next',
    prevEl: '.l-contacts__slider-swiper .l-blog__card-swiper-prev',
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
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 'auto',
      spaceBetween: 10
    },
    // when window width is >= 480px
    768: {
      slidesPerView: 2,
      spaceBetween: 18
    },
    // when window width is >= 640px
    769: {
      slidesPerView: 3,
      spaceBetween: 20
    }
  }
});

const swiperRecommended = new Swiper('.l-recommended__slider .swiper', {
  spaceBetween: 18,
  slidesPerView: 1,
  speed: 1000,
  navigation: {
    nextEl: '.l-recommended__slider .l-blog__card-swiper-next',
    prevEl: '.l-recommended__slider .l-blog__card-swiper-prev',
  },
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 18
    },
    // when window width is >= 480px
    768: {
      slidesPerView: 2,
      spaceBetween: 18
    },
    // when window width is >= 640px
    769: {
      slidesPerView: 3,
      spaceBetween: 18
    }
  }
});


const dots = document.querySelectorAll('.l-complex__body-dot');

document.addEventListener('click', function(event) {
  const previousActiveBlock = document.querySelector(".l-complex__body-hidden.active");

  if (previousActiveBlock) {
    previousActiveBlock.classList.remove("active");
  }
  infoContainer.classList.remove('active');
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

    const infoId = el.getAttribute("data-info");
    showInfoBlock(infoId);
  });
});


const infoContainer = document.querySelector(".l-mob-info-container");
const infoBlocks = document.querySelectorAll(".l-complex__body-hidden");
const closeBtn = document.getElementById("complex-body-close");

closeBtn.addEventListener('click', function(e) {
  e.preventDefault();
  const previousActiveBlock = document.querySelector(".l-complex__body-hidden.active");

  if (previousActiveBlock) {
    previousActiveBlock.classList.remove("active");
  }
  infoContainer.classList.remove('active');
});

function showInfoBlock(infoId) {
  
  // Находим предыдущий активный блок
  const previousActiveBlock = document.querySelector(".l-complex__body-hidden.active");

  if (previousActiveBlock) {
    previousActiveBlock.classList.remove("active");
  }

  // Находим соответствующий блок по его id
  const infoBlock = document.getElementById(infoId);

  // Проверяем, существует ли блок и добавляем класс "active" к нему
  if (infoBlock) {
    infoBlock.classList.add("active");
    infoContainer.classList.add('active');
  }
}

function moveInfoBlocks() {
  // Проверяем ширину экрана
  if (window.innerWidth <= 768) {
    // Перебираем все infoBlocks и перемещаем их в соответствующие infoContainers
    infoBlocks.forEach((infoBlock, index) => {
      infoContainer.appendChild(infoBlock);
    });
  }
}

// Вызываем функцию при загрузке страницы и при изменении размера окна
moveInfoBlocks();
window.addEventListener("resize", moveInfoBlocks);




$("[name='tel']").mask("+7 (999) 999-99-99");

function indexPagePopularsTab() {
  const $btns1 = $('.l-popular-solutions__tabs.popular li');
  const $tabs1 = $('.popular .l-popular-solutions__cards-tab');

  $btns1.on('click', function() {
    $btns1.removeClass('active');
    $(this).addClass('active');

    const tabToShow1 = $(this).data('popul');
    const $tab1 = $('#' + tabToShow1);

    $tabs1.removeClass('active');
    $tab1.addClass('active');

    $tabs1.fadeOut(200, function() {
      $tab1.fadeIn(200);
    });
  });
}

indexPagePopularsTab();

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


const myModal = new HystModal({
  linkAttributeName: "data-hystmodal",
  // настройки (не обязательно), см. API
});

$('.l-modal select').select2({
  minimumResultsForSearch: Infinity,
  dropdownAutoWidth: true,
  dropdownPosition: 'below'
});
const radio1 = $("input#time-now");
const radio2 = $("input#time-exactly");
const mySelect = $(".l-modal .select2");

radio1.click(function() {
  mySelect.hide();
});

radio2.click(function() {
  mySelect.show();
});

//mob modal
$('.modal-content .clear').click(function(e) {
  e.preventDefault();
  $('input[name="q"]').val('');
});

$('.l-mob-modal__form select').select2({
  minimumResultsForSearch: Infinity,
  dropdownAutoWidth: true,
  dropdownPosition: 'below'
});
const radio1Mob = $("input#time-now--mob");
const radio2Mob = $("input#time-exactly--mob");
const mySelectMob = $(".l-mob-modal__form .select2");

radio1Mob.click(function() {
  mySelectMob.hide();
});

radio2Mob.click(function() {
  mySelectMob.show();
});

function openModal(modal, closeModalButton) {
  modal.style.display = "flex";
  document.body.classList.add("modal-open");
  setTimeout(() => {
    modal.classList.add("open");
  }, 10);
}

function closeModal(modal, closeModalButton) {
  modal.classList.remove("open");
  document.body.classList.remove("modal-open");
  setTimeout(() => {
    modal.style.display = "none";
  }, 500);
}

const openModalButton = document.getElementById("openModalButton");
const modalContainer = document.getElementById("callMemModalMob");
const closeModalButton = document.getElementById("closeModalButton");
openModalButton.addEventListener("click", (e) => {
  e.preventDefault();
  openModal(modalContainer, closeModalButton);
});
closeModalButton.addEventListener("click", (e) => {
  e.preventDefault();
  closeModal(modalContainer, closeModalButton);
});

const openSearchModalButton = document.getElementById("openSearchModalButton");
const modalSearchContainer = document.getElementById("searchModalMob");
const closeSearchModalButton = document.getElementById("closeSearchModalButton");
openSearchModalButton.addEventListener("click", (e) => {
  e.preventDefault();
  openModal(modalSearchContainer, closeSearchModalButton);
});
closeSearchModalButton.addEventListener("click", (e) => {
  e.preventDefault();
  closeModal(modalSearchContainer, closeSearchModalButton);
});

const openAdressesModalButton = document.getElementById("openAdressesModalButton");
const modalAdressesContainer = document.getElementById("adressesModalMob");
const closeAdressesModalButton = document.getElementById("closeAdressesModalButton");
const closeAdressesModalButton2 = document.querySelector("#adressesModalMob .arrow");

openAdressesModalButton.addEventListener("click", (e) => {
  e.preventDefault();
  openModal(modalAdressesContainer, closeAdressesModalButton);
});
closeAdressesModalButton.addEventListener("click", (e) => {
  e.preventDefault();
  closeModal(modalAdressesContainer, closeAdressesModalButton);
});
closeAdressesModalButton2.addEventListener("click", (e) => {
  e.preventDefault();
  closeModal(modalAdressesContainer, closeAdressesModalButton2);
});








document.addEventListener("DOMContentLoaded", function(event) {
  ymaps.ready(init);

  function init() {
    var myMap = new ymaps.Map("map", {
      center: [55.839792, 37.490164],
      zoom: 16,
      controls: ['zoomControl'],
      behaviors: ["default", "scrollZoom"]
    });
    var myPlacemark1 = new ymaps.Placemark(
      [55.839792, 37.490164], 
      {balloonContent: 'Москва, БЦ Водный, Головинское шоссе 5а'},
    );
    var myPlacemark2 = new ymaps.Placemark(
      [55.751904, 37.671029], 
      {balloonContent: 'ARTPLAY, Нижняя Сыромятническая ул.10,стр.3'},
    );
    var myPlacemark3 = new ymaps.Placemark(
      [55.892158, 37.714204], 
      {balloonContent: 'Мытищи, 3-я крестьянская, с 23'},
    );
    var myPlacemark4 = new ymaps.Placemark(
      [55.595521, 37.745466], 
      {balloonContent: 'МО, Ленинский р-н, пос Развилка, вл 8, оф 35'},
    );
    myMap.behaviors.disable("scrollZoom");
    myMap.geoObjects.add(myPlacemark1);
    myMap.geoObjects.add(myPlacemark2);
    myMap.geoObjects.add(myPlacemark3);
    myMap.geoObjects.add(myPlacemark4);
  }
});