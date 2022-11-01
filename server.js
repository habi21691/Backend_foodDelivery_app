const express = require('express')
const app=express()
const mongoss=require('mongoose')
const bodyParse=require('body-parser')
const path=require('path')
require('dotenv').config()

const helmet = require("helmet");




const cors=require('cors')


const routeUrls=require('./router/route')

// app.use(helmet());
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({extended:false}))
app.use("upload",express.static('upload'))

app.use(
    bodyParse.json({
      type: [
        'application/json',
        'application/csp-report',
        'application/reports+json',
      ],
    })
  );
  
app.use(express.json())
app.use(cors())
app.use('/api',routeUrls)

app.use(
    helmet.contentSecurityPolicy({
      useDefaults: false,
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ['self', "https://mui.com/"],
        scriptSrc: ["'self'", "https://mernfood-delivery.onrender.com"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    })
  );
mongoss.connect('mongodb+srv://habtemariam:vZByrZCsG8LaKXUT@mern.2e1gmj9.mongodb.net/Food_Delivery?retryWrites=true&w=majority',()=>app.listen(process.env.PORT || 5000,console.log("server is up and runnig")))
