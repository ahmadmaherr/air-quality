const { Router } = require('express');
const airQualityRoutes = require('./airQuality.routes');

const routes = Router();

routes.use('/air-quality', airQualityRoutes);

module.exports = routes;
