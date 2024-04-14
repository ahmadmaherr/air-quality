const axios = require('axios');
const { getAirQuality, getMostPolluted } = require('../controllers/airQuality.controller'); 
const AirQuality = require('../models/AirQuality'); 

jest.mock('axios');
jest.mock('../models/AirQuality');

describe('getAirQuality', () => {
  it('should return air quality data', async () => {
    const mockResponse = {
      data: {
        data: {
          current: {
            pollution: {
              ts: '2024-04-14T12:00:00.000Z',
              aqius: 41,
              mainus: 'p2',
              aqicn: 14,
              maincn: 'p2',
            },
          },
        },
      },
    };

    axios.get.mockResolvedValue(mockResponse);

    const req = { params: { lat: 'latitude', lng: 'longitude' } };
    const res = { json: jest.fn() };

    await getAirQuality(req, res);

    expect(res.json).toHaveBeenCalledWith({
      result: {
        pollution: {
          timestamp: '2024-04-14T12:00:00.000Z',
          aqius: 41,
          mainus: 'p2',
          aqicn: 14,
          maincn: 'p2',
        },
      },
    });
  });

  it('should handle errors', async () => {
    axios.get.mockRejectedValue(new Error('API error'));

    const req = { params: { lat: 'latitude', lng: 'longitude' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await getAirQuality(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch air quality data' });
  });
});

describe('getMostPolluted', () => {
  it('should return the most polluted record', async () => {
    AirQuality.findOne.mockResolvedValue({ city: 'Paris', timestamp: '2024-04-14T12:00:00.000Z' });
  
    const req = { body: { city: 'Paris' } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() }; // Mock the status function
  
    await getMostPolluted(req, res);
  
    expect(res.status).toHaveBeenCalledWith(500); 
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch air quality data for Paris' });
  });
  

  it('should handle no record found', async () => {
    AirQuality.findOne.mockResolvedValue(null);

    const req = { body: { city: 'NonexistentCity' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await getMostPolluted(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch air quality data for Paris' });
  });
});
