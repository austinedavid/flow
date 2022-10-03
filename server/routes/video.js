const express = require('express')
const route = express.Router()
const {verification} = require('../verification')
const {createVideo, getVideo, deleteVideo} = require('../controllers/video')


// @here we create our videos, get and delete our videos
// @and middleware is applied to all to make sure a user is verified

// @creating a video using a post request
route.post('/createVideo', verification, createVideo)

// @getting the created videos
route.get('/getVideo', getVideo)

// @delete a created video
route.delete('/deleteVideo/:id', verification, deleteVideo)

module.exports = route