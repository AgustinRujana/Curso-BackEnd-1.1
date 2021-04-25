const userService = require('../services/user.service')


module.exports = (app) => {
    app.route('/')
        .get(userService.checkIn)
    app.route('/login')
        .get(userService.goToLogin)
        .post(userService.logInComplete)
    app.route('/logout')
       .get(userService.logout)
}