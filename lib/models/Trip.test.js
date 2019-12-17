const Trip = require('./Trip');

describe('Trip model', () => {
  it('has a required name field', () => {
    const trip = new Trip({
      location: 'Europe',
      startDate: 'December 21st, 2019',
      endDate: 'January 1st, 2020'
    });

    const { errors } = trip.validateSync();

    expect(errors.name.message).toEqual('Path `name` is required.');
  });

  it('has a required location field', () => {
    const trip = new Trip({
      name: 'Eurotrip',
      startDate: 'December 21st, 2019',
      endDate: 'January 1st, 2020'
    });

    const { errors } = trip.validateSync();

    expect(errors.location.message).toEqual('Path `location` is required.');
  });

  it('has a required startDate field', () => {
    const trip = new Trip({
      name: 'Eurotrip',
      location: 'Europe',
      endDate: 'January 1st, 2020'
    });

    const { errors } = trip.validateSync();

    expect(errors.startDate.message).toEqual('Path `startDate` is required.');
  });

  it('has a required endDate field', () => {
    const trip = new Trip({
      name: 'Eurotrip',
      location: 'Europe',
      startDate: 'January 1st, 2020'
    });

    const { errors } = trip.validateSync();

    expect(errors.endDate.message).toEqual('Path `endDate` is required.');
  });
});
