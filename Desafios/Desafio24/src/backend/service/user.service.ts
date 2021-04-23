module.exports = {
    logOut: (req, res) => {
        req.session.destroy()
        req.send("Logout Success")
    }
}