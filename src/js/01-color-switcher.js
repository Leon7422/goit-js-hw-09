const refs = {
  buttonStart: document.querySelector('[data-start]'),
  buttonStop: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};
refs.buttonStop.setAttribute('disabled', '');
refs.buttonStart.addEventListener('click', itsShowTime);
refs.buttonStop.addEventListener('click', stopShowTime);
let intervalForShowTime;

function itsShowTime() {
  intervalForShowTime = setInterval(createRandomBackground, 1000);
  refs.buttonStart.setAttribute('disabled', '');
  refs.buttonStop.removeAttribute('disabled');
}

function stopShowTime() {
  clearInterval(intervalForShowTime);
  refs.body.style.backgroundColor = '#fafafa';
  refs.buttonStart.removeAttribute('disabled');
  refs.buttonStop.setAttribute('disabled', '');
}

function createRandomBackground() {
  const randomColor = getRandomHexColor();
  refs.body.style.backgroundColor = randomColor;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
