const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  }
});

schema.virtual('activities', {
  ref: 'Activity',
  localField: '_id',
  foreignField: 'tripId'
});

module.exports = mongoose.model('Trip', schema);
