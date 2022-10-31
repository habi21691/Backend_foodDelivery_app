const express=require('express')
const app=express()
const mongoss=require('mongoose')
const bodyParse=require('body-parser')
const path=require('path')
require('dotenv').config()


const cors=require('cors')


const routeUrls=require('./router/route')

app.use(bodyParse.json())
app.use(bodyParse.urlencoded({extended:false}))
app.use("upload",express.static(path.join(__dirname,'upload')))

app.use(express.json())
app.use(cors())
app.use('/api',routeUrls)


mongoss.connect('mongodb+srv://habtemariam:vZByrZCsG8LaKXUT@mern.2e1gmj9.mongodb.net/Food_Delivery?retryWrites=true&w=majority',()=>app.listen(process.env.PORT || 5000,console.log("server is up and runnig")))
