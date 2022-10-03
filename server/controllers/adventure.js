const Adventure = require('../models/adventure')

// @here we create the adventures needed

// @creating controller for creating adventure
 const createAdventure = async(req, res, next)=>{
    try {
        const adventure = new Adventure({...req.body, userId: req.user.id})
        await adventure.save()

        res.status(200).json(adventure)
    } catch (error) {
        next(error)
    }
}

// @creating controller for getting adventure
const getAdventure = async(req, res, next)=>{
    try {
        const adventure = await Adventure.find()

        res.status(200).json(adventure.sort((a,b)=>b.createdAt - a.createdAt))
    } catch (error) {
        next(error)
    }
}

// @creating controller for updating adventure
const updateAdventure = async(req, res, next)=>{
    try {
        const adventure = await Adventure.findById(req.params.id)
        if(!adventure){
            return res.send('this adventures does not exist')
        }
        if(req.user.id === adventure.userId){
           const updatedAdventure =  await Adventure.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
           return res.status(200).json("you have successfully updated your adventure")
        }else{
            res.status(404).send("you can only update your adventures")
        }
        
    } catch (error) {
        next(error)
    }
}

// @creating controller for deleting adventure
const deleteAdventure = async(req, res, next)=>{
    try {
        const adventure = await Adventure.findById(req.params.id)
        if(!adventure){
            return res.send("this adventure does not exist")
        }
        if(req.user.id === adventure.userId){
            await Adventure.findByIdAndRemove(req.params.id)

            res.status(200).send('adventure deleted successfully!!')
        }else{
            res.status(404).send("you can only delete your adventures")
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {deleteAdventure,updateAdventure, getAdventure, createAdventure}