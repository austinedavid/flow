const Video = require('../models/video')

// @creating a video in our video controller
const createVideo = async(req, res, next)=>{
    try {
        const video = new Video({...req.body, userId: req.user.id})
        await video.save()

        res.status(200).json(video)
    } catch (error) {
        next(error)
    }
}

// @getting our created videos
const getVideo  = async(req, res, next)=>{
    try {
        const videos = await Video.find()
        
        res.status(200).json(videos.sort((a,b)=> b.createdAt - a.createdAt))
    } catch (error) {
        next(error)
    }
}

// @deleting our created videos
const deleteVideo = async(req, res, next)=>{
    try {
        const video = await Video.findById(req.params.id)
        if(!video){
            return res.status(404).send("video does not exist!!")
        }
        if(req.user.id === video.userId){
            await Video.findByIdAndRemove(req.params.id)

            res.status(200).send('video deleted successfully')
        }else{
            return res.status(404).send('you can only delete a video you created!!')
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {deleteVideo,createVideo,getVideo}