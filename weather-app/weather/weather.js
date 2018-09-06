const request = require('request');

var getWeather = (latitude, longitude, callback) => {
    request({
        url: `https://api.darksky.net/forecast/35e08f93b06135a540ebfd36f94412b6/${latitude},${longitude}`,
        json: true
    }, (error, response, body) => {
        if(!error && response.statusCode === 200){
            callback(undefined, body.currently);
        }else{
            callback("Unable to fetch weather");
        }
    });
}

module.exports= {
    getWeather
}

