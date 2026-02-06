const express = require("express")
const axios = require("axios")

const router = express.Router()

router.get("/current", async(req, res)=>{
    try{
        const {city} = req.query;

        if(!city){
            return res.status(400).json({
                message:"City query parameter is required"
            });
        }
        const url = `https://api.openweathermap.org/data/2.5/weather`;

        const response = await axios.get(url, {
            params: {
                q:city,
                appid:process.env.WEATHER_API_KEY,
                units:"metric"
            }
        });
        const data = response.data;

        res.json({
            city:data.name,
            temperature:data.main.temp,
            condition:data.weather[0].description,
            humidity:data.main.humidity,
            windSpeed:data.wind.speed
        });
    }catch(error){
        if(error.response){
            return res.status(404).json({
                message:"city not found"
            });
        }
        res.status(500).json({
            message:"error fetching weather data",
            error: error.message
        });
    }
});

module.exports = router;
