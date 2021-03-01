const  http = require('http');
const { title } = require('process');
const server = http.createServer((req, res) => {
    //Here you write the code for the server
    function random(min,max) {
        return Math.floor(Math.random()* (max - min)) + min;
    }    

    let theObject = {
        id: random(1,10),
        title: 'Producto' + random(1,10),
        price: random(0,999999)/100,
        thumbnail: 'Foto' + random(1,10)
    }


    res.end(JSON.stringify(theObject))
})

server.listen(process.env.PORT, () => {
    console.log("Your app is listening on port " + listener.address().port);
  })