import passport from 'passport';


///////////////////////////////////////////////////////////
//                  Desafio 34                           //
///////////////////////////////////////////////////////////
import * as ethereal from '../services/emailer.service'

module.exports = {
    checkIn: (req, res) => {
        let userName = req.cookies.Usuario
        req.cookies.Usuario ? res.render("login", {nombre : userName}) : res.redirect('/login')
    },

    goToLogin: (req, res) => {
        if(req.isAuthenticated()) {
            res.render("login", {nombre: req.user.username})
        }
        res.sendFile('pages/login.html', {root: './public'})
    },

    logInComplete: (req, res) => {
        passport.authenticate('login', { failureRedirect: '/faillogin' }), (req,res) => {
            ethereal.enviarMail('Log In', `Ingresó ${req.user.displayName} en la fecha ${new Date().toLocaleString()}`, (err, info) => {
                if(err) console.log(err)
                else console.log(info)
            })
            res.redirect('/')        
        }
    },

    logOut: (req, res) => {
        let userName = req.cookies.Usuario
        req.logout()
        ethereal.enviarMail('Log Out', `Se desconecto ${req.user.displayName} en la fecha ${new Date().toLocaleString()}`, (err, info) => {
            if(err) console.log(err)
            else console.log(info)
        })
        res.render("logout", {nombre: userName})
    },

    failLogin: (req, res) => {
        res.render('loginError', {})
    },

    registerForm: (req, res) => {
        res.sendFile('pages/register.html', {root: './public'})
    },

    registerUser: (req, res) => {
        passport.authenticate('register', { failureRedirect: '/failregister' }), (req,res) => {
            res.redirect('/') 
        }
    },

    failRegister: (req, res) => {
        res.render("registerError",  {})
    },

    facebookLogIn: (req, res) => {
        passport.authenticate('facebook')
    },

    facebookCallback:(req, res) => {
        passport.authenticate('facebook', { successRedirect: '/login', failureRedirect: '/faillogin' })
    }
}