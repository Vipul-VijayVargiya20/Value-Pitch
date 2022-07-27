const express = require('express')
const app = express()
const port = 3000
const userRoutes = require('./routes/userRoutes')
const mongoose = require('mongoose')
const multer = require('multer')


app.use(multer().any())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect('mongodb+srv://vipulvj19234:W0Q0qCoUzZOjj6nu@cluster0.rxqi0.mongodb.net/Valuepitch-db?authSource=admin&replicaSet=atlas-w6rrrs-shard-0&readPreference=primary&ssl=true', { useNewUrlParser: true })
    .then(_ => console.log(`DB Connected`))
    .catch(err => console.log(err))

app.use('/', userRoutes)

app.listen(port, _ => console.log(`server is listening On port ${port}`))