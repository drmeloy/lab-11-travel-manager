require('dotenv').config();

const mongoose = require('mongoose');
const app = require('../lib/app');
const request = require('supertest');
const connect = require('../lib/utils/connect');
const Activity = require('../lib/models/Activity');
const Trip = require('../lib/models/Trip');

describe('activities routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  let trip;
  beforeEach(async() => {
    trip = await Trip.create({
      name: 'Eurotrip',
      location: 'Europe',
      startDate: 'December 21st, 2019',
      endDate: 'January 6th, 2020'
    });
  });
  

  const createActivity = async() => {
    return await Activity.create({
      tripId: trip._id,
      activity: 'Whale watching',
      date: 'December 25th, 2019',
      time: '11:00am',
      location: 'London',
    });
  };

  it('can create an activity', async() => {
    return request(app)
      .post('/api/v1/activities')
      .send({
        tripId: trip._id,
        activity: 'Whale watching',
        date: 'December 25th, 2019',
        time: '11:00am',
        location: 'London'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          tripId: trip._id.toString(),
          activity: 'Whale watching',
          date: 'December 25th, 2019',
          time: '11:00am',
          location: 'London',
          weather: expect.any(String),
          __v: 0
        });
      });
  });

  it('can delete an activity', async() => {
    const activity = await createActivity();

    return request(app)
      .delete(`/api/v1/activities/${activity._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          tripId: trip._id.toString(),
          activity: 'Whale watching',
          date: 'December 25th, 2019',
          time: '11:00am',
          location: 'London',
          __v: 0
        });
      });
  });
});
