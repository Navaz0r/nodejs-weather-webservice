/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable consistent-return */
/* eslint-disable max-len */

/* eslint-disable linebreak-style */
console.log('Client side javascript file is loaded successfully.');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message1');
const messageTwo = document.querySelector('#message2');

messageOne.textContent = 'Loading..';
messageOne.textContent = '';

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const url = `http://localhost:3000/weather?address=${search.value}`;
  fetch(url).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecastData;
      }
    });
  });
});
