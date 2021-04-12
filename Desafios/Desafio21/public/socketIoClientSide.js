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
let Currentdate = new Date()

const dateformat = (data) => {
    return `${data.slice(0,10)} ${data.slice(11,19)}`
}

//Messages
messagesForm.addEventListener('submit', (event) => {
    event.preventDefault()
    socket.emit('message', {
        email: inputMessage[0].value ,
        date: Currentdate,
        msg: inputMessage[1].value
    })
    inputMessage[1].value = ''
})

socket.on('message', (msg) =>{
    let lineaNueva = document.createElement('tr')
    lineaNueva.innerHTML = `<td><span class="mail">${msg.email}</span><span class="fecha"> [${dateformat( msg.date )}] </span><span class="mensaje">${msg.msg}</span></td>`
    cuerpoTablaMsg.appendChild(lineaNueva)
})

socket.on('Mensajes Anteriores', (msg) =>{
    msg.forEach(element => {
        let lineaNueva = document.createElement('tr')
        lineaNueva.innerHTML = `<td><span class="mail">${element.email}</span><span class="fecha"> [${dateformat( element.date )}] </span><span class="mensaje">${element.msg}</span></td>`
        cuerpoTablaMsg.appendChild(lineaNueva)
    })
})

socket.on('Producto Nuevo', (prod) =>{
    let lineaNueva = document.createElement('tr')
    lineaNueva.innerHTML = `<td><img height=75px src="${prod.thumbnail}" alt="${prod.title}"></td><td>${prod.title}</td><td>${prod.price}</td>`
    cuerpoTabla.appendChild(lineaNueva)
})