// * кастомный скролл. для плавной работы необходимо html добавить свойство  scroll-behavior: smooth;
// * работает быстрее swiper, плавность не поддерживается safary
let currentScrollPosition = 0;
const hightWindow = document.documentElement.clientHeight;
const scrollHeight = Math.max(
  document.body.scrollHeight,
  document.documentElement.scrollHeight,
  document.body.offsetHeight,
  document.documentElement.offsetHeight,
  document.body.clientHeight,
  document.documentElement.clientHeight
);

const numberOfCards = Math.floor(scrollHeight / hightWindow);

let timerScroll;
let timerSmallScroll;
let isScroll = true;
let isTouch = false;
let delta1 = 0;
let activCardNumber = 0;

const cards = document.querySelectorAll('.header, .project, .footer');
cards[0].scrollIntoView(false);
console.log('cards: ', cards);

const scroll = (delta, delay) => {
  console.log('delta: ', delta);
  clearTimeout(timerSmallScroll);
  clearTimeout(timerScroll);

  timerScroll = setTimeout(() => {
    isScroll = true;
    isTouch = false;
    delta1 = 0;
  }, delay);

  if (isScroll) {
    if (Math.abs(delta) <= 30) {
      window.scrollBy({
        top: delta,
      });

      timerSmallScroll = setTimeout(() => {
        window.scrollTo(
          0,
          cards[activCardNumber].getBoundingClientRect().top +
            window.pageYOffset
        );
      }, delay);
      return;
    }

    if (delta > 30) {
      activCardNumber++;
    }

    if (delta < -30) {
      activCardNumber--;
    }

    activCardNumber = activCardNumber < 0 ? 0 : activCardNumber;
    activCardNumber =
      activCardNumber > cards.length - 1 ? cards.length - 1 : activCardNumber;
    console.log('activCardNumber: ', activCardNumber);

    isScroll = false;
    window.scrollTo(
      0,
      cards[activCardNumber].getBoundingClientRect().top + window.pageYOffset
    );
    console.log('cards[activCardNumber]: ', cards[activCardNumber]);
  }
};

window.addEventListener('wheel', (event) => {
  if (event.target.classList.contains('project_description-text')) {
    return;
  }
  scroll(event.deltaY, 50);
});

window.addEventListener('keyup', (event) => {
  if (event.code === 'ArrowUp' || event.code === 'PageUp') {
    scroll(-31, 100);
  }

  if (event.code === 'ArrowDown' || event.code === 'PageDown') {
    scroll(31, 100);
  }
});

window.addEventListener('pointerdown', () => {
  isTouch = true;
});

window.addEventListener('pointermove', (event) => {
  if (isTouch) {
    delta1 += -event.movementY * 4;
    scroll(delta1, 50);
  }
});
