const socket = io();
const formProducts = document.getElementById('inputForm');
const inputProduct = document.getElementsByClassName('inputProduct');
const cuerpoTablaProducts = document.getElementById('cuerpoTablaProducts')

const messagesForm = document.getElementById('messagesForm')
const inputMessage = document.getElementsByClassName('inputMessage')
const cuerpoTablaMsg = document.getElementById('cuerpoTablaMsg')

//let sessionId = localStorage.getItem('sessionId')

formProducts.addEventListener('submit', (e) =>{
    e.preventDefault()
    let productoNuevo = { title: inputProduct[0].value, price: inputProduct[1].value, thumbnail: inputProduct[2].value}

    socket.emit('Producto Nuevo', productoNuevo)

    for (let i = 0; i < 3; i++) {
        inputProduct[i].value = ''
    } 
})

// Date
let date = new Date()

let day = date.getDate()
let month = date.getMonth() + 1
let year = date.getFullYear()
let h = date.getHours();
let m = date.getMinutes();
let s = date.getSeconds();

m/10 > 1 ? m = m : m = `0${m}`
s/10 > 1 ? s = s : s = `0${s}`

month < 10 ? dateMessage = `${day}/0${month}/${year} ` : dateMessage = `${day}/${month}/${year} `
let messageTime = `${h}:${m}:${s}`

let finishDate = dateMessage + messageTime

//Messages
messagesForm.addEventListener('submit', (event) => {
    event.preventDefault()
    socket.emit('message', {
        email: inputMessage[0].value ,
        date: finishDate,
        msg: inputMessage[1].value
    })
    inputMessage[1].value = ''
})

socket.on('message', (msg) =>{
    let lineaNueva = document.createElement('tr')
    lineaNueva.innerHTML = `<td><span class="mail">${msg.email}</span><span class="fecha"> [${msg.date}] </span><span class="mensaje">${msg.msg}</span></td>`
    cuerpoTablaMsg.appendChild(lineaNueva)
})

socket.on('Mensajes Anteriores', (msg) =>{
    msg.forEach(element => {
        let lineaNueva = document.createElement('tr')
        lineaNueva.innerHTML = `<td><span class="mail">${element.email}</span><span class="fecha"> [${element.date}] </span><span class="mensaje">${element.msg}</span></td>`
        cuerpoTablaMsg.appendChild(lineaNueva)
    })
})

socket.on('Producto Nuevo', (prod) =>{
    let lineaNueva = document.createElement('tr')
    lineaNueva.innerHTML = `<td><img height=75px src="${prod.thumbnail}" alt="${prod.title}"></td><td>${prod.title}</td><td>${prod.price}</td>`
    cuerpoTabla.appendChild(lineaNueva)
})