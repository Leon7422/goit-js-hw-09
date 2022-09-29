import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const refs = {
  form: document.querySelector('.form'),
  submitBtn: document.querySelector('button'),
};

refs.form.addEventListener('submit', onSubmit);
function onSubmit(e) {
  e.preventDefault();
  const delayValue = e.currentTarget.elements.delay.value;
  const stepValue = e.currentTarget.elements.step.value;
  const amountValue = e.currentTarget.elements.amount.value;
  for (let i = 0; i < amountValue; i += 1) {
    createPromise(i + 1, Number(delayValue) + Number(i * stepValue));
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  })
    .then(({ position, delay }) => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
