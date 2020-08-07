const express = require('express');
const https = require("https");
const { response } = require("express");

const app = express();

app.get("/", function (req, res) {

    const url = "https://api.openweathermap.org/data/2.5/weather?q=New%20york&appid=8e0433b72fbd15267664fef865ea6e06&units=metric";
    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on("data", function(data) {                                   //https.get response
            const weatherData = JSON.parse(data);

            const temp = weatherData.main.temp;
            console.log(temp);

            const weatherDescription = weatherData.weather[0].description;
            console.log(weatherDescription);

            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";

            //app.get response
            res.write("<p>The weather is currently" +weatherDescription+ ".</p>");
            res.write("<h1>The temperature in London is " +temp+ " degrees Celcius.</h1>"); 
            res.write("<img src="+imageURL+">");
            res.send();
        });
    });

    
});



app.listen(3000, function() {
    console.log("Server is running on port 3000.");
});
