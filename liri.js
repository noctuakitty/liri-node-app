require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var dotEnv = require("dotenv");
var spotify = new Spotify(keys.spotify);
var inquirer = require("inquirer");
var fs = require('file-system');

var action = process.argv[2];
console.log("I have told LIRI too " + action);

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

function menu() {
    inquirer.prompt([
        {
            type:"list",
            message:"What type of search do you want?",
            choices:["spotify-this-song","concert-this","movie-this", "do-what-it-says"],
            name:"command"
        }
    ]).then(function(response){
        switch (response.command) {
            case "spotify-this-song":
                spotifythissong();
                break;
            case "concert-this":
                concertthis();
                break;
            case "movie-this":
                moviethis();
                break;
                //case "do-what-it-says":
                // dowhatitsays();
                //break;
            default:
                break;
        }
    }); 
}

function spotifythissong() {

    inquirer.prompt([
        {
            type:"input",
            message:"What song do you wanna search?",
            name:"search"
        }
    ]).then(function(response){
        console.log(response.search);
        spotify.search({
            type: 'track',
            query: response.search
        }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log("SPOTIFY: ")
            // Response 
            // console.log(data.tracks.items[0]);
            // Artist name
            console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
            // Song name
            console.log("Song: " + data.tracks.items[0].name);
            // Album name
            console.log("Album: " + data.tracks.items[0].album.name);
            // Preveiw link
            console.log("Preview: " + data.tracks.items[0].preview_url);
            inquirer.prompt([
                {
                    type:"confirm",
                    message:"Would you like to do another search?",
                    name:"search",
                    default:false
                }
            ]).then(function(response){
                if (response.search) {
                    menu();
                }else {
                    console.log("See ya next time!");
                }
            });
        });
    });

    
}

function concertthis() {
    inquirer.prompt([
        {
            type:"input",
            message:"What band you wanna search?",
            name:"search"
        }
    ]).then(function(response){
        queryURLone = "https://rest.bandsintown.com/artists/" + response.search + "/events?app_id=codingbootcamp";

        axios.get(queryURLone)
            .then(function (response) {
                console.log("BANDSINTOWN: ")
                // Repsonse
                // console.log(response.data[0]);
                // Venue Name
                console.log("Venue: " + response.data[0].venue.name);
                // Venue Location
                console.log("Venue Location: " + response.data[0].venue.location);
                // Date of Event
                var formatDate = moment(response.data[0].datetime).format('MMMM Do YYYY, h:mm:ss a');
                console.log("Date: " + formatDate);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
                inquirer.prompt([
                    {
                        type:"confirm",
                        message:"Would you like to do another search?",
                        name:"search",
                        default:false
                    }
                ]).then(function(response){
                    if (response.search) {
                        menu();
                    }else {
                        console.log("See ya next time!");
                    }
                });
            });     
            
    });
}

function moviethis() {
    inquirer.prompt([
        {
            type:"input",
            message:"What movie you wanna search?",
            name:"search"
        }
    ]).then(function(response){
    var queryURLtwo = "https://www.omdbapi.com/?t=" + response.search + "&apikey=trilogy";

    axios.get(queryURLtwo)
        .then(function (response) {
            console.log("OMDB: ")
            // Response
            // console.log(response.data);
            // Title
            console.log("Title: " + response.data.Title);
            // Year
            console.log("Year: " + response.data.Year);
            // IMDB Rating
            console.log("IMDB Rating: " + response.data.imdbRating);
            // Rotten Tomatoes Rating 
            console.log(response.data.Ratings[1]);
            // Counrty Produced
            console.log("Country Produced: " + response.data.Country);
            // Lanuage 
            console.log("Language: " + response.data.Language);
            // Plot 
            console.log("Plot: " + response.data.Plot);
            // Actors
            console.log("Actors: " + response.data.Actors);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
            inquirer.prompt([
                {
                    type:"confirm",
                    message:"Would you like to do another search?",
                    name:"search",
                    default:false
                }
            ]).then(function(response){
                if (response.search) {
                    menu();
                }else {
                    console.log("See ya next time!");
                }
            });
        });
    });
}

var doWhatItSays = function() {
    fs.readFile("random.txt", "utf8", function(error, data) {
      console.log(data);
  
      var dataArr = data.split(",");
  
      if (dataArr.length === 2) {
        pick(dataArr[0], dataArr[1]);
      } else if (dataArr.length === 1) {
        pick(dataArr[0]);
      }
    });
  };


menu();