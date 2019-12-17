const Activity = require('./Activity');
const Trip = require('./Trip');

describe('Activity model', () => {
  const trip = new Trip({
    name: 'Eurotrip',
    location: 'Europe',
    startDate: 'December 21st, 2019',
    endDate: 'January 1st, 2020'
  });

  it('has a required tripID field', () => {
    const activity = new Activity({
      activity: 'Whale watching',
      date: 'December 25th, 2019',
      time: '11:00am',
      location: 'The sea'
    });

    const { errors } = activity.validateSync();

    expect(errors.tripId.message).toEqual('Path `tripId` is required.');
  });

  it('has a required activity field', () => {
    const activity = new Activity({
      tripId: trip._id,
      date: 'December 25th, 2019',
      time: '11:00am',
      location: 'The sea'
    });

    const { errors } = activity.validateSync();

    expect(errors.activity.message).toEqual('Path `activity` is required.');
  });

  it('has a required date field', () => {
    const activity = new Activity({
      tripId: trip._id,
      activity: 'Whale watching',
      time: '11:00am',
      location: 'The sea'
    });

    const { errors } = activity.validateSync();

    expect(errors.date.message).toEqual('Path `date` is required.');
  });

  it('has a required time field', () => {
    const activity = new Activity({
      tripId: trip._id,
      activity: 'Whale watching',
      date: 'December 25th, 2019',
      location: 'The sea'
    });

    const { errors } = activity.validateSync();

    expect(errors.time.message).toEqual('Path `time` is required.');
  });

  it('has a required location field', () => {
    const activity = new Activity({
      tripId: trip._id,
      activity: 'Whale watching',
      date: 'December 25th, 2019',
      time: '11:00am'
    });

    const { errors } = activity.validateSync();

    expect(errors.location.message).toEqual('Path `location` is required.');
  });
});
