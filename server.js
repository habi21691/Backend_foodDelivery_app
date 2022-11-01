const express = require('express')
const app=express()
const http = require('http')
const mongoss=require('mongoose')
const bodyParse=require('body-parser')
const path=require('path')
require('dotenv').config()
const fs = require('fs')

const helmet = require("helmet");

const server = http.createServer((req, res) => {
     fs.readFile('/api/feachingOrder')
    res.statusCode = 200;
    res.setHeader('Content-Type', 'aplication/json');
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.end('Hello World! I am your new NodeJS app! \n');
  });


const cors=require('cors')


const routeUrls=require('./router/route')

// app.use(helmet());
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({extended:false}))
app.use("upload",express.static('upload'))


  
app.use(express.json())
app.use(cors())
app.use('/api',routeUrls)


app.use(
    helmet.contentSecurityPolicy({
      useDefaults: false,
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://mernfood-delivery.onrender.com"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    })
  );

mongoss.connect('mongodb+srv://habtemariam:vZByrZCsG8LaKXUT@mern.2e1gmj9.mongodb.net/Food_Delivery?retryWrites=true&w=majority',()=>server.listen(process.env.PORT || 5000,console.log("server is up and runnig")))
