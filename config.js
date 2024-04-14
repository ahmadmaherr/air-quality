require('dotenv').config();

const databaseConfig = {
	uri: process.env.MONGO_URI,
	databaseName: process.env.DATABASE_NAME,
};

const serverConfig = {
	iqairApiKey: process.env.IQAIR_API_KEY,
	port: process.env.PORT,
};

module.exports = { databaseConfig, serverConfig };
