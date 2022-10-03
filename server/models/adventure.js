const mongoose = require("mongoose") ;

const advdentureSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    imgUrl:{
        type: String,
        required: true
    },
    heading: {
        type: String,
        required: true,
    },
    desc:{
        type: String,
        required: true,
    }
}, {timestamps: true})

module.exports =  mongoose.model('adventures', advdentureSchema)