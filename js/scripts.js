const pageSlider = new Swiper('.page', {
  //переназначаем стандартные классы
  wrapperClass: 'page__wrapper',
  slideClass: 'screen',
  //направление слайда
  direction: 'vertical',
  //количество слайдов для паказа
  slidesPerView: 'auto',
  //включаем паралакс
  parallax: true,
  //управление клавиатурой
  keyboard: {
    enabled: true,
    onlyInViewport: true,
    pageUpDown: true,
  },
  //колёсико
  mousewheel: {
    //чувствительсноть
    sensitivity: 0.7,
  },
  speed: 700,
  //обновление слайдера
  observer: true,
  observeParents: true,
  observeSlideChildren: true,
  //отмена начальной инициализации
  init: false,
  //отмена загрузки изображений
  preloadImages: false,
  lazy: {
    // подгружать на старте переключения
    loadOnTransitionStart: true,
    //подгружать следующий и предыдущий слайд
    loadPrevNext: true,
  },
  //следить за видимыми слайдами
  watchSlidesProgress: true,
  //добавления класса видимым слайдам
  watchSlidesVisibility: true,

  on: {
    init: function () {
      setTimeout(() => {
        setScrollType();
      }, 500);
    },
    resize: function () {
      setScrollType();
    },
  },
});

pageSlider.init();

function setScrollType() {
  pageSlider.params.freeMode.enabled = false;

  pageSlider.slides.forEach((slide) => {
    const slideContent = slide.querySelector(
      '.header__context, .project__content'
    );
    if (slideContent) {
      const slideContentHeight = slideContent.offsetHeight;

      if (slideContentHeight > document.documentElement.clientHeight) {
        pageSlider.params.freeMode.enabled = true;
        removeParalax();
      }
    }
  });
}

function removeParalax() {
  const position = document.querySelectorAll('[data-swiper-parallax]');
  const opacity = document.querySelectorAll('[data-swiper-parallax-opacity]');
  const duration = document.querySelectorAll('[data-swiper-parallax-duration]');

  if (position) {
    position.forEach((elem) => {
      elem.dataset.swiperParallax = 0;
    });
  }

  if (opacity) {
    opacity.forEach((elem) => (elem.dataset.swiperParallaxOpacity = 1));
  }

  if (duration) {
    duration.forEach((elem) => (elem.dataset.swiperParallaxDuration = 0));
  }
}
