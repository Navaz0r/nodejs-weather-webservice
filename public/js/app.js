/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable consistent-return */
/* eslint-disable max-len */

/* eslint-disable linebreak-style */
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message1');
const messageTwo = document.querySelector('#message2');
const weatherIcon = document.getElementById('weatherinfo').getElementsByTagName('img');
const tempratureInfo = document.getElementById('weatherinfo').getElementsByTagName('h4');

messageOne.textContent = 'Loading..';
messageOne.textContent = '';

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const url = `/weather?address=${search.value}`;
  fetch(url).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        weatherIcon[0].src = data.icon;
        tempratureInfo[0].textContent = `T: ${data.temprature}°`;
        tempratureInfo[1].textContent = `F: ${data.feelslike}°`;
        messageTwo.textContent = data.result;
        document.getElementById('message3').textContent = '(T = Temprature | F = Feelslike)';
      }
    });
  });
});
