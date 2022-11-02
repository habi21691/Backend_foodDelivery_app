
const express = require("express");
const app = express();
const http = require("http");
const mongoss = require("mongoose");
const bodyParse = require("body-parser");
// const path = require("path");

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
app.use(function (req, res, next) {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'none'; font-src 'self'; img-src 'self'; script-src 'none';  frame-src 'self';style-src 'self' unsafe-inline;"
  );
  next();
});

app.use("/api", routeUrls);

app.use(helmet());

app.use(middleware.notFound);
app.use(middleware.errorHandler);

const server = http.createServer(app);
mongoss.connect(
  "mongodb+srv://habtemariam:vZByrZCsG8LaKXUT@mern.2e1gmj9.mongodb.net/Food_Delivery?retryWrites=true&w=majority",
  () =>
    server.listen(
      process.env.PORT || 5000,
      console.log("server is up and runnig")
    )
);


