const mongoose = require('mongoose')

const AirQualitySchema = new mongoose.Schema({

    city: {
        type: String,
        required: true,
    },
    aqius: {
        type: Number,
        required: true,
    },
    mainus: {
        type: String,
        required: true,
    },
    aqicn: {
        type: Number,
        required: true,
    },
    maincn: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        required: true,
    }
});


module.exports = mongoose.model('AirQuality', AirQualitySchema)
