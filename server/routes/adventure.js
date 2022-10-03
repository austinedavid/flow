const express = require('express')
const route = express.Router()
const {verification} = require('../verification')
const {createAdventure, getAdventure, updateAdventure, deleteAdventure} = require('../controllers/adventure')

// @below we create our routes for adventures
// @we also have a route specific middleware to verify if the user is signed in before making request

// @createing an adventure
route.post('/createAdventure', verification, createAdventure)

// @get all post that is created
route.get('/getAdventure', getAdventure)

// @update a particular adventure
route.put('/updateAdventure/:id', verification, updateAdventure)

// @delete a particular adventure
route.delete('/deleteAdventure/:id', verification, deleteAdventure)


module.exports = route