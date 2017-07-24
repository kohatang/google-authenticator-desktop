// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const settings = require('electron-settings');

setInterval(timerTick, 1000);

let key
if (settings.has("key")) {
  key = settings.get('key')
  document.getElementById('key').value = key;
  createPin(key)
}

document.addEventListener('DOMContentLoaded', () => {
  const key = document.getElementById('key');
  const submitButton = document.getElementById('submit');
 
  submitButton.addEventListener('click', () => {
    createPin(key.value);
  });
 

});
function createPin(key) {
    const otplib = require('otplib').default;
    const authenticator = require('otplib/authenticator').default;

    const token = authenticator.generate(key);

    document.getElementById('pin').innerText = token;
    settings.set('key', key);
}

function timerTick() {
    const cowntdownEl = document.getElementById('cowntdown');
    var epoch = Math.round(new Date().getTime() / 1000.0);
    var countDown = 30 - (epoch % 30);
    if (epoch % 30 === 0) {
        createPin(settings.get('key'))
    }

    document.getElementById('cowntdown').innerText = countDown

}