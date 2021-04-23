const carritoService = require('../service/carrito.service')

module.exports = (app) => {
    app.route('/carrito')
        .get(carritoService.getAll)
        .post(carritoService.create)
    app.route('/carrito/:id')
        .get(carritoService.getOne)
        .post(carritoService.addOne)
        .patch(carritoService.updateOne)
    
}