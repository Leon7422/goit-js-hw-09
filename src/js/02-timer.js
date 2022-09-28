import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';
import 'notiflix/dist/notiflix-3.2.5.min.css';
let selectFutureTime;
const daysField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minutesField = document.querySelector('[data-minutes]');
const secondsField = document.querySelector('[data-seconds]');
const inputDateArea = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('[data-start]');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      buttonStart.setAttribute('disabled', '');
      return Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      buttonStart.removeAttribute('disabled');
      Notiflix.Notify.success(
        'Date chosen correct. Press button "Start" for count down'
      );
    }

    selectFutureTime = selectedDates[0];
  },
};
buttonStart.setAttribute('disabled', '');
buttonStart.addEventListener('click', onStartBtnTimerStart);

flatpickr(inputDateArea, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function fillTimer({ days, hours, minutes, seconds }) {
  daysField.textContent = pad(days);
  hoursField.textContent = pad(hours);
  minutesField.textContent = pad(minutes);
  secondsField.textContent = pad(seconds);
}

function onStartBtnTimerStart() {
  fillTimer(convertMs(selectFutureTime - Date.now()));
  const interval = setInterval(() => {
    if (selectFutureTime.getTime() - 1000 < Date.now()) {
      clearTimeout(interval);
    }
    const updatedTime = convertMs(selectFutureTime - Date.now());
    fillTimer(updatedTime);
  }, 1000);
}

function pad(number) {
  return String(number).padStart(2, '0');
}
