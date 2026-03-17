import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { addLeadingZero, convertMs } from './utils';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose,
};

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const resetBtn = document.querySelector('button[data-reset]');
const daysValue = document.querySelector('span[data-days]');
const hoursValue = document.querySelector('span[data-hours]');
const minutesValue = document.querySelector('span[data-minutes]');
const secondsValue = document.querySelector('span[data-seconds]');

let userSelectedDate = '';
let intervalId = null;
let leftTime = 0;

flatpickr('input[type="text"]', options);

function onClose(selectedDates) {
  const currentTime = Date.now();
  const selectedTime = new Date(selectedDates[0]).getTime();

  const diffTime = selectedTime - currentTime;
  if (diffTime <= 0) {
    startBtn.setAttribute('disabled', true);
    iziToast.error({
      title: 'Oops',
      message: 'Please choose a date in the future',
      position: 'topRight',
    });
  } else {
    startBtn.removeAttribute('disabled');
    userSelectedDate = diffTime;
  }
}

startBtn.addEventListener('click', handleStartClick);
stopBtn.addEventListener('click', handleStopClick);
resetBtn.addEventListener('click', handleResetClick);

function handleStartClick() {
  startBtn.setAttribute('disabled', true);
  resetBtn.setAttribute('disabled', true);
  stopBtn.removeAttribute('disabled');

  leftTime = userSelectedDate;

  intervalId = setInterval(() => {
    leftTime -= 1000;
    if (leftTime <= 0) handleResetClick();
    render(leftTime);
  }, 1000);
}

function handleStopClick() {
  startBtn.removeAttribute('disabled');
  resetBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', true);

  userSelectedDate = leftTime;
  clearInterval(intervalId);
}

function handleResetClick() {
  resetBtn.setAttribute('disabled', true);
  stopBtn.setAttribute('disabled', true);
  startBtn.setAttribute('disabled', true);

  render(0);
  userSelectedDate = '';
  clearInterval(intervalId);
  intervalId = null;
}

function render(leftTime) {
  const { days, hours, minutes, seconds } = convertMs(leftTime);

  daysValue.textContent = addLeadingZero(String(days));
  hoursValue.textContent = addLeadingZero(String(hours));
  minutesValue.textContent = addLeadingZero(String(minutes));
  secondsValue.textContent = addLeadingZero(String(seconds));
}
