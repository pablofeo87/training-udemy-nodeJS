const yargs = require('yargs');
const axios = require('axios');

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

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response)=>{
    if(response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find that address.');
    }
    var latitude = response.data.results[0].geometry.location.lat;
    var longitude = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/35e08f93b06135a540ebfd36f94412b6/${latitude},${longitude}`;
    console.log(response.data.results[0].formatted_address);

    return axios.get(weatherUrl);

}).then((response) => {
    var temperatue = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.temperature;

    console.log(`It's currently ${temperatue}. If feels like ${apparentTemperature}`);
}).catch((e) => {
    if(e.code === 'ENOTFOUND'){
        console.log('Unable to connect to API servers');
    } else {
        console.log(e.message);
    }
});

// axios.get(geocodeUrl).then((response)=>{
//     console.log(response.data);
// }).catch((error) => {
//     if(error.code === 'ENOTFOUND'){
//         console.log('Unable to connect to API servers');
//     }
// });