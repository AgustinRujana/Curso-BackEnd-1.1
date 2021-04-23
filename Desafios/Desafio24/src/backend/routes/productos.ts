const productosService = require('../service/products.service')

module.exports = (app) => {
    app.route('/productos')
        .get(productosService.getAll)
        .post(productosService.create)
    app.route('/productos/:id')
        .get(productosService.getOne)
        .delete(productosService.deleteOne)
    app.route('/productos/:id/:value')
        .patch(productosService.patchOne)
    
}