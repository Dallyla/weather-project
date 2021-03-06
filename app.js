const express = require('express');
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

//fetching data of the input city
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const query = req.body.cityName;
    const apiKey = "8e0433b72fbd15267664fef865ea6e06";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit+"";
    https.get(url, function(response) {
        console.log(response.statusCode);

        //https.get response
        response.on("data", function(data) {                                   
            //parsing the data we've got
            const weatherData = JSON.parse(data);

            const temp = weatherData.main.temp;
            console.log(temp);

            const weatherDescription = weatherData.weather[0].description;
            console.log(weatherDescription);

            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";

            //app.get response
            //rendering the data into the main page
            res.write("<p>The weather is currently" +weatherDescription+ ".</p>");
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius.</h1>"); 
            res.write("<img src="+imageURL+">");
            res.send();
        });
    });
})


    

app.listen(3000, function() {
    console.log("Server is running on port 3000.");
});
