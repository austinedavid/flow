const mongoose = require("mongoose") ;

const pictureSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    desc:{
        type: String,
        required: true
    },
    likes:{
        type: [String],
        default: []
    },
    dislikes: {
        type: [String],
        default: []
    }
}, {timestamps: true})

module.exports = mongoose.model('pictures', pictureSchema)