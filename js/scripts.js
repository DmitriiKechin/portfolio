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
        console.log(slideContent.children);
        pageSlider.params.freeMode.enabled = true;
      }
    }
  });
}
