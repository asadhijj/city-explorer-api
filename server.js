require("dotenv").config();
const express = require("express"); //import express framework
const cors = require("cors");
const server = express();
const weatherDat = require("./assets/weather.json");
const Forecast = require("./Forecast");
server.use(cors());
const PORT = process.env.PORT;

// http://localhost:4000/weather?ser
server.get("/weather", (req, res) => {
  const searchQuery = req.query.searchQuery || "";

  const response = [];

  const cityData = weatherDat.find((e) => e["city_name"] === searchQuery);

  if (cityData) {
    cityData?.data.forEach((city) => {
      response.push(
        new Forecast(
          city["valid_date"],
          `Low of ${city["low_temp"]}, high of ${city["max_temp"]}, ${city.weather.description}`
        )
      );
    });
    res.json({ forecast: response, lon: cityData?.lon, lat: cityData?.lat });
  } else {
    res.sendStatus(404)
  }
});

server.listen(PORT || 4000, () => {
  console.log(`Hello, I am listening on ${PORT}`);
});
