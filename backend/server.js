require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const appRoutes = require('./routes/workout.js')

//express app
const app = express()

//middleware
app.use(express.json())
app.use ((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/workouts',appRoutes)

//db connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to database, listening port', process.env.PORT, '..')
        })
    })
    .catch((error) => {
        console.log(error)
    })

