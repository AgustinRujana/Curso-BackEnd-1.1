//Imports
import express from 'express';
import { MongoDB } from './db/db';
import { user as User } from './db/model';
import passport from 'passport';
import bCrypt from 'bCrypt';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as FacebookStrategy } from 'passport-facebook'

const port: number = 8080;
const app = require('express')();
const httpServer = require('http').createServer(app);
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const HBSInitialize = require('./HbsInitialization')
const messageService = require('./services/messages.service')
const productoRoutes = require('./routes/products')
const userRoutes = require('./routes/user')


const io = require('socket.io')(httpServer);

const isValidPassword = (user, password) => {
    return bCrypt.compareSync(password, user.password);
}

const createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

passport.use('login', new LocalStrategy({
    passReqToCallBack: true
    }, (req, username, password, done) => {
        User.findOne( {'username': username}, (err, user) => {

            if(err) { return done(err) }

            if(!user) {
                console.log('User Not Found '+ username);
                return done(null, false)
            }

            if(!isValidPassword(user, password)) {
                console.log('Invalid PassWord');
                return done(null, false)
            }

            return done(null, user);
        })
    })
)

passport.use(new FacebookStrategy({
    clientID: 'What is this?',
    clientSecret: 'Or this',
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'emails'],
    scope: ['email']
  }, (accessToken, refreshToken, profile, done) => {
      let userProfile = profile;
      return done(null, userProfile);
  }));

passport.use('register', new LocalStrategy({
        passReqToCallback : true
    }, 
        (req, username, password, done) => {
            const findCreateUser = () => {
                User.findOne({'username': username}, (err, user) => {
                    if(err) {
                        console.log('Error in SignUp: ' + err)
                        return done(err);
                    }

                    if(!user) {
                        let newUser = new User();
                        newUser.username = username;
                        newUser.password = createHash(password)

                        newUser.save( (err) => {
                            if(err){
                                console.log('Error in Saving user: ' + err);
                                throw err;
                            }
                            console.log('User registration succesfull')
                            return done(null, newUser)
                        })
                    }

                    console.log('User already exists');
                    return done(null, false)
                });
            }
            process.nextTick(findCreateUser);
        }
    )
)

passport.serializeUser(function(user, done) {
    done(null, user._id);
});
   
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});


app.use(cookieParser());
app.use(session({
    store: MongoStore.create({
        mongoUrl:'mongodb+srv://agustin:Ar41735233@cluster0.5w5mk.mongodb.net/ecommerce?retryWrites=true&w=majority',
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true}
    }),
    secret: 'Da fuck is this',
    resave: false,
    saveUninitialized: false,
    ttl: 10 * 60
}))


app.use(passport.initialize());
app.use(passport.session());


app.use(express.json());
app.use(express.urlencoded( {extended:true } ));
app.use(express.static('public'));

//Routes
productoRoutes(app)
userRoutes(app)

//Handlebars
HBSInitialize(app)

//Io
messageService(io)

//Listen
httpServer.listen(port, async () => {
    console.log(`Running on port ${port}`)
    try {
        const mongo = new MongoDB('mongodb+srv://agustin:Ar41735233@cluster0.5w5mk.mongodb.net/ecommerce?retryWrites=true&w=majority')
        await mongo.connect()
        console.log('Base MongoDB conectada')
    }
    catch(error) {
        console.log(`Error en conexión de Base de datos: ${error}`)
    }
})