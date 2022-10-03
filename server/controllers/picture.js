
const Picture = require('../models/picture')

// @controller for creating a video below
const createPix = async(req, res, next)=>{
    try {
        const pix = new Picture({...req.body, userId: req.user.id})
        await pix.save()
        res.status(200).json(pix)
    } catch (error) {
        next(error)
    }
}

// @controller for getting created post 
const getPix = async(req, res, next)=>{
    try {
        const gottenPix = await Picture.find()
        res.status(200).json(gottenPix.sort((a,b)=>b.createdAt - a.createdAt))
    } catch (error) {
        next(error)
    }
}

// @deleting a post created
const deletePix = async(req, res, next)=>{
    try {
        const pix = await Picture.findById(req.params.id)
        if(!pix){
            return res.status(404).send('this picture does not exist')

        }
        if(req.user.id === pix.userId){
            await Picture.findByIdAndRemove(req.params.id)
            res.status(200).send("you have successfully deleted your picture")
        }else{
            return res.status(404).send("you can only delete your own picture")
        }
    } catch (error) {
        next(error)
    }
    
}

// @here we get a single pix, doing this so that we can trigger an action that will refresh
// our page in react.js
const getOnePix = async(req, res, next)=>{
    try {
        const onePix = await Picture.findById(req.params.id)
        res.status(200).json(onePix)
    } catch (error) {
        next(error)
    }
}

module.exports = {getOnePix, createPix,deletePix, getPix}