const { Router } = require('express');
const Activity = require('../models/Activity');

module.exports = Router()
  .post('/', (req, res) => {
    Activity
      .create(req.body)
      .then(activity => res.send(activity));
  })
  .delete('/:id', (req, res) => {
    Activity
      .findByIdAndDelete(req.params.id)
      .then(activity => res.send(activity));
  });
