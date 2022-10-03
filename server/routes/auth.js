const User = require('../models/user')
const express = require('express')
const route = express.Router()
const {createUser, signinUser, googleSignup} = require('../controllers/auth')


// @making a request to create user
route.post('/signup',createUser)

// @making a request to signin user
route.post('/signin', signinUser)

// @logging in with emails
route.post('/google', googleSignup)

module.exports = route