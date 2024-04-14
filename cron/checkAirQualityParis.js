const CronJob = require('cron').CronJob;
const axios = require('axios');
const { serverConfig } = require('../config');
const AirQuality = require('../models/AirQuality');


// Cron job to run every minute
const checkAirQualityParis = () => {
	new CronJob('* * * * *', async function () {
        console.log('checking air quality at Paris is running');

        try {
            const response = await axios.get(
              `http://api.airvisual.com/v2/nearest_city?lat=48.856613&lon=2.352222&key=${serverConfig.iqairApiKey}`
            );
        
            let existingRecord = await AirQuality.findOne({ 
              timestamp: response.data.data.current.pollution.ts 
            });

            if(!existingRecord){
              await AirQuality.create({
                city: response.data.data.city,
                timestamp: response.data.data.current.pollution.ts,
                aqius: response.data.data.current.pollution.aqius,
                mainus: response.data.data.current.pollution.mainus,
                aqicn: response.data.data.current.pollution.aqicn,
                maincn: response.data.data.current.pollution.maincn
              })

              console.log('Air quality data saved successfully');
            }else{
              console.log('Data already exist');
            }
        

          } catch (error) {
            console.log('Error fetching or saving air quality data:', error);
          }

}, null, true, 'Etc/UTC');}

module.exports = { checkAirQualityParis };



