// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const settings = require('electron-settings');
settings.deleteAll();
setInterval(timerTick, 1000);

const otplib = require('otplib').default;
const authenticator = require('otplib/authenticator').default;

// let key
if (settings.has("items")) {
  const items = settings.get('items');
  for(let item of items) { // オブジェクトの中のプロパティ名を取り出す。
    document.getElementById('key1').innerText = item.key;
    const token = authenticator.generate(item.key);
    document.getElementById('t_pin').innerText = token;
    document.getElementById('t_name').innerText = item.name;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const key = document.getElementById('key');
  const name = document.getElementById('name');
  const submitButton = document.getElementById('submit');
 
  submitButton.addEventListener('click', () => {
    // document.getElementById('key1').innerText = key.value;
    // createPin(key.value);
    const token = authenticator.generate(key.value);
    document.getElementById('t_pin').innerText = token;
    document.getElementById('t_name').innerText = name.value;


    let items = settings.get('items');
    if (items) {
      items.push({'name': name.value, 'key': key.value});
    } else {
      items = [];
      items.push({'name': name.value, 'key': key.value});
    }
    settings.set('items', items);
  });
});

function timerTick() {
    const cowntdownEl = document.getElementById('cowntdown');
    var epoch = Math.round(new Date().getTime() / 1000.0);
    var countDown = 30 - (epoch % 30);
    if (epoch % 30 === 0) {
      if (settings.has("items")) {
        const items = settings.get('items');
        for(let item of items) {
          const token = authenticator.generate(item.key);
          document.getElementById('t_pin').innerText = token;
        }
      }
    }
    document.getElementById('cowntdown').innerText = countDown

}