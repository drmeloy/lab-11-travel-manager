require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Trip = require('../lib/models/Trip');

describe('trips routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  const createTrip = async() => {
    const trip = await Trip.create({
      name: 'Eurotrip',
      location: 'Europe',
      startDate: 'December 21st, 2019',
      endDate: 'January 6th, 2020'
    });

    return trip;
  };

  it('gets all trips', async() => {
    await createTrip();
    await createTrip();

    return request(app)
      .get('/api/v1/trips')
      .then(res => {
        expect(res.body).toHaveLength(2);
      });
  });

  it('gets a trip by id', async() => {
    const trip = await createTrip();

    return request(app)
      .get(`/api/v1/trips/${trip._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: trip._id.toString(),
          name: 'Eurotrip',
          location: 'Europe',
          startDate: 'December 21st, 2019',
          endDate: 'January 6th, 2020',
          __v: 0
        });
      });
  });

  it('creates a trip', () => {
    return request(app)
      .post('/api/v1/trips')
      .send({
        name: 'Eurotrip',
        location: 'Europe',
        startDate: 'December 21st, 2019',
        endDate: 'January 6th, 2020'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Eurotrip',
          location: 'Europe',
          startDate: 'December 21st, 2019',
          endDate: 'January 6th, 2020',
          __v: 0
        });
      });
  });

  it('updates a trip', async() => {
    const trip = await createTrip();

    return request(app)
      .patch(`/api/v1/trips/${trip._id}`)
      .send({ location: 'Spain' })
      .then(res => {
        expect(res.body).toEqual({
          _id: trip._id.toString(),
          name: 'Eurotrip',
          location: 'Spain',
          startDate: 'December 21st, 2019',
          endDate: 'January 6th, 2020',
          __v: 0
        });
      });
  });

  it('deletes a trip', async() => {
    const trip = await createTrip();

    return request(app)
      .delete(`/api/v1/trips/${trip._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: trip._id.toString(),
          name: 'Eurotrip',
          location: 'Europe',
          startDate: 'December 21st, 2019',
          endDate: 'January 6th, 2020',
          __v: 0
        });
      });
  });
});
