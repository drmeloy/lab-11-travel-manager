const { retrieveWeather } = require('../services/weather');

module.exports = (req, res, next) => {
  const { location } = req.body;
  retrieveWeather(location)  
    .then(weather => {
      
      req.weather = weather;
      
      next();
    });
};
