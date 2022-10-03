const express = require('express')
const {verification} = require('../verification.js')
const {updateUser,likeVideo, likePicture, dislikePicture, dislikeVideo, getUser} = require('../controllers/user')
const route = express.Router()

// @here we create and update request to the database
// user can update their profiles after loging in

// @updating our user
route.put('/update/:id', verification, updateUser)

// @to make likeupdate to video
route.put('/videolike/:videoId', verification, likeVideo)

// @to make a dislike to video
route.put('/videodislike/:videoId', verification, dislikeVideo)

// @to make a like update to our pictures
route.put('/picturelike/:pictureId', verification, likePicture)

// @to make a dislike to our pictures
route.put('/picturedislike/:pictureId', verification, dislikePicture)

// @to find a particular user, using his or her id
route.get('/getUser/:id', getUser )


module.exports = route