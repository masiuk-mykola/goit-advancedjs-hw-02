import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

const makePromise = ({ delay, shouldResolve }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve();
        iziToast.success({
          title: '✅',
          message: `Fulfilled promise in ${delay}ms`,
          position: 'topRight',
        });
      } else {
        reject();
        iziToast.error({
          title: '❌',
          message: `Rejected promise in ${delay}ms`,
          position: 'topRight',
        });
      }
    }, delay);
  });
};

const formData = { delay: null, state: null };

form.addEventListener('input', handleInput);
form.addEventListener('submit', handleSubmit);

function handleInput(event) {
  const { name, value } = event.target;
  formData[name] = value;
}

function handleSubmit(event) {
  event.preventDefault();
  form.reset();
  makePromise({
    delay: formData.delay,
    shouldResolve: formData.state === 'fulfilled' ? true : false,
  });
  formData.delay = null;
  formData.state = null;
}
