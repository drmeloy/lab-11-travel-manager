const { Router } = require('express');
const Trip = require('../models/Trip');

module.exports = Router()
  .get('/', (req, res) => {
    let query = {};
    if(req.query.location){
      query = { 'location': req.query.location };
    }
    Trip
      .find(query)
      .then(trips => res.send(trips));
  })
  .get('/:id', (req, res) => {
    Trip
      .findById(req.params.id)
      .then(trip => res.send(trip));
  })
  .post('/', (req, res) => {
    Trip
      .create(req.body)
      .then(trip => res.send(trip));
  })
  .patch('/:id', (req, res) => {
    Trip
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(trip => res.send(trip));
  })
  .delete('/:id', (req, res) => {
    Trip
      .findByIdAndDelete(req.params.id)
      .then(trip => res.send(trip));
  });
