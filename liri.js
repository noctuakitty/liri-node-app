require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var dotEnv = require("dotenv");
var spotify = new Spotify(keys.spotify);

var action = process.argv[2];
console.log("I have told LIRI too " + action);

//bandsintown api call "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

// var Spotify = require('node-spotify-api');

// var spotify = new Spotify(keys.spotify);

// spotify.search({
//     type: 'track',
//     query: 'the sign'
// }, function (err, data) {
//     if (err) {
//         return console.log('Error occurred: ' + err);
//     }
//     console.log(data.tracks.items[0]);
//     //artist name
//     console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
//     //song name
//     console.log("Song: " + data.tracks.items[0].name);
//     //album name
//     console.log("Album: " + data.tracks.items[0].album.name);
//     //preveiw link
//     console.log("Preview: " + data.tracks.items[0].preview_url);
// });
// var artist = "icp"

// axios.get('https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp')
//     .then(function (response) {
//         // handle success
//         console.log(response.data[0]);
//         console.log(response.data[0].)
//     })
//     .catch(function (error) {
//         // handle error
//         console.log(error);
//     })
//     .finally(function () {
//         // always executed
//     });

// * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie