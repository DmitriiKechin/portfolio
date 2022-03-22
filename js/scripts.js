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

const scroll = (delta) => {
  clearTimeout(timerScroll);
  clearTimeout(timerSmallScroll);

  timerScroll = setTimeout(() => {
    isScroll = true;
  }, 50);

  if (isScroll) {
    if (Math.abs(delta) <= 30) {
      window.scrollTo({
        top: currentScrollPosition + event.deltaY,
      });
      timerSmallScroll = setTimeout(() => {
        window.scrollTo({ top: currentScrollPosition });
      }, 50);
      return;
    }

    if (delta > 30) {
      currentScrollPosition += hightWindow;
    }

    if (delta < -30) {
      currentScrollPosition -= hightWindow;
    }

    currentScrollPosition =
      currentScrollPosition < 0 ? 0 : currentScrollPosition;
    currentScrollPosition =
      currentScrollPosition > hightWindow * numberOfCards
        ? hightWindow * numberOfCards
        : currentScrollPosition;

    isScroll = false;
    window.scrollTo({ top: currentScrollPosition });
  }
};

document.body.style.overflow = 'hidden';
window.addEventListener('wheel', (event) => {
  scroll(event.deltaY);
});

window.addEventListener('keyup', (event) => {
  if (event.code === 'ArrowUp' || event.code === 'PageUp') {
    scroll(-31);
  }

  if (event.code === 'ArrowDown' || event.code === 'PageDown') {
    scroll(31);
  }
  console.log(event.code);
});
