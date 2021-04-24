module.exports = {
    checkIn: (req, res) => {
        let userName = req.cookies.Usuario
        req.cookies.Usuario ? res.render("login", {nombre : userName}) : res.redirect('/login')
    },

    goToLogin: (req, res) => {
        res.sendFile('pages/login.html', {root: './public'})
    },

    logInComplete: (req, res) => {
        let { userName } = req.body
        res.cookie('Usuario', userName, {maxAge: 60000}).render("login", {nombre : userName})
    },

    logout: (req, res) => {
        let userName = req.cookies.Usuario
        res.clearCookie('Usuario').render("logout", {nombre: userName})
    }
}