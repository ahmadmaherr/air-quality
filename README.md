## This project is built with

- Node.js
- MongoDB
- Mongoose 
- Express
- Jest

## Get Started

This project require some prequesites and dependencies to be installed, you can find the instructions below:

> To get a local copy, follow these next steps:

## Install

1. Clone the repo with the command:

   git clone https://github.com/ahmadmaherr/air-quality
   

2. Install dependencies:

   npm install


3. Create databases:

   - Make sure MongoDB is installed on your machine and is running on port 27017 respectively and then run the following command on your command line befire running the project:

    mongod


5. Enviromental Variables Set up:

   - Here are the environmental variables that needs to be set in a .env file. This is the default setting that I used for development, but you can change it to what works for you:


      PORT=3000
      
      IQAIR_API_KEY=c68d32f8-4838-4ec7-8589-dd614b26fd23
      
      MONGO_URI=mongodb://localhost:27017/airQualityDB 
      
      DATABASE_NAME=airQualityDB


6. Run server using the following command:
      
    npm run start

## Testing

Run tests using the following command:
      
    npm test

## Database Management with Mongoose

I used Mongoose as my Object-Relational Mapping (ORM) tool for interacting with our MongoDB database.

#### Ports

- Server runs on port `3000`
- Database on port `27017`

### Database Schemas

#### Air Quality Schema

| Field       | Type   | Description                                   |
|-------------|--------|-----------------------------------------------|
| city        | String | Name of the city                              |
| aqius       | Number | Air Quality Index (AQI) for the United States |
| mainus      | String | Main pollutant for the United States          |
| aqicn       | Number | Air Quality Index (AQI) for China             |
| maincn      | String | Main pollutant for China                      |
| timestamp   | Date   | Timestamp indicating the data collection time |

### Endpoints:

#### 1. Get Air Quality Data
- **Endpoint:** `GET /api/air-quality/:lat/:lng`
- **Description:** Retrieve air quality data for a specific location using latitude and longitude.
- **Expected Output (Example):**
  ```json
    {
        "status": 200,
        "result": {
            "pollution": {
            "timestamp": "2024-04-14T12:00:00.000Z",
            "aqius": 41,
            "mainus": "p2",
            "aqicn": 14,
            "maincn": "p2"
            }
        }
    }
  ```

#### 2. Get Most Polluted Record
- **Endpoint:** `GET /api/air-quality/most-polluted`
- **Description:** Retrieve the timestamp of the most polluted record.
- **Expected Output (Example):**
  ```json
    {
        "status": 200,
        "result": {
            "timestamp": "2024-04-14T12:00:00.000Z"
        }
    }
  ```

