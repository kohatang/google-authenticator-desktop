// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const settings = require('electron-settings')
// settings.deleteAll()
setInterval(timerTick, 1000)
console.log('upadte test')

const otplib = require('otplib').default
const authenticator = require('otplib/authenticator').default

// let key
if (settings.has("items")) {
  const items = settings.get('items')
  for(let item of items) {
    // document.getElementById('key1').innerText = item.key
    const token = authenticator.generate(item.key)
    var tableRef = document.getElementById("myTable").getElementsByTagName('tbody')[0]
    // Insert a row in the table at the last row
    var newRow   = tableRef.insertRow(tableRef.rows.length)

    // Insert a cell in the row at index 0
    var newCell1  = newRow.insertCell(0)
    var newCell2 = newRow.insertCell(1)
    var newCell3 = newRow.insertCell(2)

    // Append a text node to the cell
    // var newText  = document.createTextNode('New row')
    newCell1.innerHTML = item.name
    newCell2.innerHTML = token
    newCell3.innerHTML = '<div class="delete"> \
          <a class="btn-floating waves-effect waves-light red"><i class="material-icons">clear</i></a> \
        </div>'
    document.getElementsByClassName('delete')[document.getElementsByClassName('delete').length - 1].addEventListener('click', deleteData)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const key = document.getElementById('key')
  const name = document.getElementById('name')
  const submitButton = document.getElementById('submit')
  const deleteButtons = document.getElementById('delete')
 
  submitButton.addEventListener('click', () => {
    // document.getElementById('key1').innerText = key.value
    // createPin(key.value)
    const token = authenticator.generate(key.value)
    // document.getElementById('t_pin').innerText = token
    // document.getElementById('t_name').innerText = name.value
    var tableRef = document.getElementById("myTable").getElementsByTagName('tbody')[0]
    // Insert a row in the table at the last row
    var newRow   = tableRef.insertRow(tableRef.rows.length)

    // Insert a cell in the row at index 0
    var newCell1  = newRow.insertCell(0)
    var newCell2 = newRow.insertCell(1)
    var newCell3 = newRow.insertCell(2)

    // Append a text node to the cell
    // var newText  = document.createTextNode('New row')
    newCell1.innerHTML = name.value
    newCell2.innerHTML = token
    newCell3.innerHTML = '<div class="delete"> \
          <a class="btn-floating waves-effect waves-light red"><i class="material-icons">clear</i></a> \
        </div>'
    document.getElementsByClassName('delete')[document.getElementsByClassName('delete').length - 1].addEventListener('click', deleteData)
    let items = settings.get('items')
    if (items) {
      items.push({'name': name.value, 'key': key.value})
    } else {
      items = []
      items.push({'name': name.value, 'key': key.value})
    }
    settings.set('items', items)

    key.value = ''
    name.value = ''
  })
})

function deleteData() {
  // console.log(this)
  //console.log($(this).parent().parent().index())
  let items = settings.get('items')
  items.splice($(this).parent().parent().index(), 1)
  settings.set('items', items)
  console.log(items)
  var tableRef = document.getElementById("myTable").getElementsByTagName('tbody')[0]
  tableRef.deleteRow($(this).parent().parent().index())
}

function timerTick() {
    const cowntdownEl = document.getElementById('cowntdown')
    var epoch = Math.round(new Date().getTime() / 1000.0)
    var countDown = 30 - (epoch % 30)
    if (epoch % 30 === 0) {
      if (settings.has("items")) {
        const items = settings.get('items')
        let i = 0
        for (let item of items) {
          const token = authenticator.generate(item.key)
          // document.getElementById('t_pin').innerText = token
          var tableRef = document.getElementById("myTable").getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i]
          tableRef.getElementsByTagName('td')[1].innerText = token
          i++
        }
      }
    }
    document.getElementById('cowntdown').innerText = countDown

}
