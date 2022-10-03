const mongoose = require("mongoose") ;

const videoSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    videoUrl:{
        type: String,
        required: true
    },
    desc:{
        type: String,
        required: true
    },
    likes:{
        type:[String],
        default: []
    },
    dislikes: {
        type: [String],
        default: []
    }
},{timestamps: true})

module.exports =  mongoose.model('video', videoSchema)