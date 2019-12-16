const { Router } = require('express');
const Activity = require('../models/Activity');
const getWeather = require('../middleware/getWeather');

module.exports = Router()
  .post('/', getWeather, (req, res, next) => {    
    const weather = req.weather;
    Activity
      .create({
        ...req.body,
        weather
      })
      .then(activity => res.send(activity))
      .catch(next);
  })
  .delete('/:id', (req, res) => {
    Activity
      .findByIdAndDelete(req.params.id)
      .then(activity => res.send(activity));
  });
