//Imports
import express from 'express'

//Express Initializing
const app = express();
const port: number = 8000;

app.use(express.json())
app.use(express.urlencoded( {extended:true } ))

////Routers
//Products Main
app.use('/api', require('../routes/products'))

//Public
app.use(express.static('public'))

//Listen
app.listen(port, () => {
    console.log(`Running on port ${port}`)
})