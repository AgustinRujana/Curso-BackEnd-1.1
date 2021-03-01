//Imports
import express from 'express'
import handlebars from 'express-handlebars'


//Express Initialization
const app = express();
const port: number = 8000;

app.use(express.json())
app.use(express.urlencoded( {extended:true } ))

//Handlebars Initialization
app.engine('hbs', handlebars({
    extname:'.hbs',
    defaultLayout:'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}))
app.set('views', './src/views')
app.set('view engine', 'hbs')

////Routers
//Products Main
app.use('/', require('../routes/products'))

//Public
app.use(express.static('public'))

//Listen
app.listen(port, () => {
    console.log(`Running on port ${port}`)
})