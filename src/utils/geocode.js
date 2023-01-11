const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?limit=1&access_token=pk.eyJ1IjoidHJldm9ya25vdHRzIiwiYSI6ImNsYzZzMjNoYTMwbjkzb3BqdzU4ajVvNGsifQ.zCDe0B4lA5AoXppoUwaYug'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback(('Error: ' + error), undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location.', undefined);
        } else {
            const arr = body.features[0];

            callback(undefined, {
                latitude: arr.center[1],
                longitude: arr.center[0],
                location: arr.place_name
            });
        }
    });
};

module.exports = geocode;