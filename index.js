
'use strict';

var appe = require('connect')();
var http = require('http');
var cors = require('cors');
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var fs = require('fs');
var serverPort = 8080;

const express=require('express');
const mongoose=require('mongoose');
const app=express();
const dotenv=require('dotenv');
const bodyParser=require('body-parser');
dotenv.config();
app.use(bodyParser.json());
/*
require('dotenv/config');
*/
//import routes
const postRoute=require('./routes/post');
app.use('/posts',postRoute);


//routes
app.get('/',(req,res)=>{

  res.send('We are on home');


});

mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser:true},()=>console.log('connected to db'));


// swaggerRouter configuration
var options = {
  swaggerUi: '/swagger.json',
  controllers: './controllers',
  useStubs: process.env.NODE_ENV === 'development' ? true : false // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync('./api/swagger.yaml', 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  app.use(cors());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());


  //app.listen(8080,()=>console.log('Server in up and running'));
  // Start the server
  http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
  });
});
