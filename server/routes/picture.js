const express = require('express')
const route = express.Router()
const {verification} = require('../verification')
const {createPix, getPix, deletePix, getOnePix} = require('../controllers/picture')

// @here we make a post to create a picture
// @and the personcreating the picture must be signed in
// @that is why we make use of the route specific middleware

// @create post
route.post('/createPix', verification, createPix )

// @get post
route.get('/getPix',  getPix)

// @ here we get a particular pix with id
route.get('/getOnePix/:id', getOnePix)

// @delete a post
route.delete('/deletePix/:id', verification, deletePix)

module.exports = route