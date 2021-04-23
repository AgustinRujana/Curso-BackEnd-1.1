const userService = require('../service/user.service')

module.exports = (app) => {
    app.route('/user/login')
        .post()
    app.route('/user/logout')
        .get(userService.logOut)

}