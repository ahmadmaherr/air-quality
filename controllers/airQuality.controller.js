const axios = require('axios');
const { serverConfig } = require('../config');
const AirQuality = require('../models/AirQuality');


const getAirQuality = async (req, res) => {
    try {
        const { lat, lng } = req.params;
        const apiUrl = `http://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lng}&key=${serverConfig.iqairApiKey}`;

        const response = await axios.get(apiUrl);
        const airQualityData = response.data.data;
    
        res.json({
            "result": {
              "pollution": {
              "timestamp": airQualityData.current.pollution.ts,
              "aqius": airQualityData.current.pollution.aqius,
              "mainus": airQualityData.current.pollution.mainus,
              "aqicn": airQualityData.current.pollution.aqicn,
              "maincn": airQualityData.current.pollution.maincn
              }
            }
        });
      } catch (error) {
        console.log('Error fetching air quality data:', error);
        res.status(500).json({ 
          error: 'Failed to fetch air quality data' 
        });
      }
};

const getMostPolluted = async (req, res) => {
  try {

    AirQuality.findOne({ city: req.body.city })
    .sort({ aqius: -1 })
    .exec()
    .then((highestPollutionRecord) => {
      if (highestPollutionRecord) {
        res.json( {
          "result": highestPollutionRecord.timestamp
        });     
      } else {
        res.status(500).json({ 
          error: 'No existing record yet, try again in one minute' 
        });
      }
    })
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch air quality data for Paris' 
    });
  }
};

module.exports = { getAirQuality, getMostPolluted };