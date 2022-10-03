const User = require('../models/user')
const Video = require('../models/video')
const Picture = require('../models/picture')

// @here we create the controller for the user updates

const updateUser = async(req, res, next)=>{
    if(req.user.id === req.params.id){
       try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
            res.status(200).json(updatedUser)
       } catch (error) {
        next(error)
       }
    }
    else{
        return res.send('you can only update your account')
    }
}  

// @to like video controller
const likeVideo = async(req, res, next)=>{
    const id = req.user.id
    const videoId = req.params.videoId

    try {
        await Video.findByIdAndUpdate(videoId, {
           $addToSet:{likes: id},
           $pull:{dislikes: id}
        }
            )
        res.status(200).send("you have successfully liked the video")
    } catch (error) {
        next(error)
    }
}

// @to dislike the video controller
const dislikeVideo = async(req, res, next)=>{
    const id = req.user.id
    const videoId = req.params.videoId

    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet:{dislikes: id},
            $pull:{likes: id}
        })

        res.status(200).send('you have successfully disliked the video')
    } catch (error) {
        next(error)
    }
}

// @to like a picture controller
const likePicture = async(req, res, next)=>{
    const id = req.user.id
    const pictureId = req.params.pictureId

    try {
        await Picture.findByIdAndUpdate(pictureId, {
            $addToSet: {likes: id},
            $pull: {dislikes: id}
        })

        res.status(200).send('you have successfully like the picture')
        
    } catch (error) {
        next(error)
    }
}

const dislikePicture = async(req, res, next)=>{
    const id = req.user.id
    const pictureId = req.params.pictureId

    try {
        await Picture.findByIdAndUpdate(pictureId, {
            $addToSet:{dislikes: id},
            $pull:{likes: id}
        })

        res.status(200).send('you successfully dislike the picture')
        
    } catch (error) {
        next(error)
    }
}

// @this is the controller to get a particular use
const getUser = async(req, res, next)=>{
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

module.exports = {getUser, likePicture, dislikePicture,dislikeVideo, likeVideo, updateUser}