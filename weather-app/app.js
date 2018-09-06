const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

const argv =  yargs
    .options({
        address: {
            demand: true,
            alias: 'a',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help','h')
    .argv;

geocode.geocodeAddress(argv.address, (errorMessage, geocodeResults) => {
    if(errorMessage){
        console.log(errorMessage);
    } else {
        console.log(geocodeResults.address);
        weather.getWeather(geocodeResults.latitude, geocodeResults.longitude, (errorMessage, weatherResults) => {

            if(errorMessage){
                console.log(errorMessage);
            } else {
                console.log(`It's ${weatherResults.temperature} but feels like ${weatherResults.apparentTemperature}`)
            }

        });
    }
});

