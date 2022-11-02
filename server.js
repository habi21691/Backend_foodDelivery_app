
const express = require("express");
const app = express();
const http = require("http");
const mongoss = require("mongoose");
const bodyParse = require("body-parser");
// const path = require("path");
const morgan = require('morgan')

require("dotenv").config();
const cors = require("cors");

const helmet = require("helmet");

const compression = require("compression");

app.use(compression())


const routeUrls = require("./router/route");
const middleware = require('./middleware')

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));
app.use("upload", express.static("upload"));

app.use(express.json());
app.use(cors(
  {
    origin:'*',
    credentials:true
  }
));

app.use((req,res,next)=>
{
  console.log(req)
    res.header('Access-Control-Allow-Origin','*');
    res.header(
        'Access-Control-Allow-headers',
        'Origin,X-Requested-With,Content-Type,Accept,Authorization'
        );

        if(req.method==='OPTIONS')
        {
            res.header('Accept-Control-Methods','PUT,POST,PATCH,DELETE,GET');
            return res.status(200).json({

            })
        }
        next();
});

app.use(morgan('dev'))
// app.use(function (req, res, next) {
//   res.setHeader(
//     'Content-Security-Policy',
//     "default-src 'none'; font-src 'self'; img-src 'self'; script-src 'none';  frame-src 'self';style-src 'self' 'unsafe-inline';"
//   );
//   next();
// });

app.use("/api", routeUrls);

app.use(helmet());

app.use(middleware.notFound);
app.use(middleware.errorHandler);

const server = http.createServer(app);


// mongoss.Promise=global.Promise;
// mongoss.set('useNewUrlParser',true);
// mongoss.set('useFindAndModify',false);
// mongoss.set('useCreateIndex',true);
// mongoss.set('useUnifiedTopology',true);

mongoss.connect(
  "mongodb+srv://habtemariam:vZByrZCsG8LaKXUT@mern.2e1gmj9.mongodb.net/Foood_Delivery?retryWrites=true&w=majority",
  () =>
    server.listen(
      process.env.PORT || 5000,
      console.log("server is up and runnig")
    )
);


