const https = require('https')
require('dotenv').config();
const express = require('express')
const app = express()


const appId = process.env.API_KEY
console.log("Env var :", appId)


app.get('/weather', (req,res) => {
    //Check if long & lat are provided on get method.
    if(!req.query.lat || !req.query.long){
        return res.status(401).send({
            error: "Long & Lat have to be provided as request query."
        })
    }

    //Get data from Openweather API
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + req.query.lat + "&lon=" + req.query.long + "&appid=" + appId + "&units=metric";
    https.get(url, (response) => {
        if (response.statusCode === 200) {
            response.on("data", (data) => {
                const weatherData = JSON.parse(data);
                res.send({data: weatherData})
            })
        } else {
            console.log("Error, try again later & verify your internet connexion")
        }
    })
})


app.listen(8080, () => {
    console.log("Serveur à l'écoute")
})
