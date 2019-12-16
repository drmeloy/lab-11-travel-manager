const superagent = require('superagent');

const retrieveWeather = (location) => {
  return superagent
    .get(`https://www.metaweather.com/api/location/search/?query=${location}`)
    .then(response => {
      const [{ woeid }] = response.body;
      
      return woeid;
    })
    .then(woeid => {
      return superagent
        .get(`https://www.metaweather.com/api/location/${woeid}`)
        .then(response => {
          return response.body.consolidated_weather[0].weather_state_name;
        });
    });
};

module.exports = { retrieveWeather };
