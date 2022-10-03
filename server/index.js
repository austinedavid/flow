const express = require("express");
const dotenv = require("dotenv")
const cors = require("cors")
const mongoose = require("mongoose")
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const pixRoute = require('./routes/picture')
const videoRoute = require('./routes/video')
const adventureRoute = require('./routes/adventure')

dotenv.config()

// grabbing hold of our express
const app = express()

// connecting our database
const dbConnection = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB__URL).then(()=>console.log('database connected successfully'))
    } catch (error) {
        console.log(error)
    }
}

// creating a port for our api
const PORT = process.env.PORT || 5000

// creating our middlewares here
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 
  }

app.use(express.json())

app.use(cookieParser())
app.use(cors(corsOptions))





// our whole api routes
app.use('/app', authRoute)
app.use('/app', userRoute)
app.use('/app', pixRoute)
app.use('/app', videoRoute)
app.use('/app', adventureRoute)

// error handling middleware
app.use((err, req, res, next)=>{
    const status = err.status || "404";
    const message = err.message || "please check your credentials and try again"

    return res.status(status).json({
        success: false,
        status,
        message
    })
})

// api host listening
app.listen(PORT, ()=>{
    dbConnection()
    console.log(`app is running on port: ${PORT}`)
})