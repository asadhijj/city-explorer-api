require("dotenv").config();
const express = require("express"); //import express framework
const cors = require("cors");
const server = express();
const getWeather=require('./Forecast')
const getMovies =require ('./Movies')
server.use(cors());
const PORT = process.env.PORT;


//http://localhost:PORT/weather?lon=lon&lat=lat
server.get('/weather', getWeather);

//http://localhost:PORT/Movies?searchQuery=searchQuery
server.get('/Movies', getMovies)





server.listen(PORT || 4000, () => {
  console.log(`Hello, I am listening on ${PORT}`);
});
