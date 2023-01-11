const request = require('request');

const forecast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=13e065c67ccf7bc946126e9ac5502273&query=' + lat + ',' + lon + '&units=f';
    request({ url, json: true }, (error, {body}) => { 
        if (error) {
            callback(('Error: ' + error), undefined);
        } else if (body.error) {
            callback(body.error, undefined);
        } else {
            const data = body.current;
            const temp = data.temperature;
            const feel = data.feelslike;
            callback(undefined, 'It is currently ' + temp + ' degrees out. It feels like ' + feel + ' degrees out.');
        }
    });
};

module.exports = forecast;
