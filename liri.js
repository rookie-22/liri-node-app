require("dotenv").config();
var axios = require("axios");
var moment = require("moment");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var command = process.argv[2];

switch(command) {
    case 'concert-this':
        findConcert()
    break;

    case 'spotify-this-song':
        findMusic()   
    break;

    case 'movie-this' :
        findMovies()
    break;

    case 'do-what-it-says' :
        findRandom()
    break;
    default:
        console.log("invalid command and keyword")
}

function findConcert() {
    var artist = process.argv.slice(3).join(" ");
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(queryURL).then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
            console.log("=========================");
            console.log("Artist: " + artist)
            console.log("Name of Venue: " + response.data[i].venue.name);
            console.log("Location: " + response.data[i].venue.city);
            console.log("Date of Event: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
            console.log("=========================");
        }
    })
    .catch(function (err) {
        console.error('Error occured: ' + err);
    }) 
}

function findMusic() {
    var song = process.argv.slice(3).join(" ");

    if (!song) {
        spotify.search({
            type: "track",
            query: "The Sign",
            limit: 1
        }).then(function (data) {
                console.log("=========================");   
                console.log("Artist(s): " + data.tracks.items[0].album.artists[0].name);
                console.log("Track: " + data.tracks.items[0].name);
                console.log("Preview Song: " + data.tracks.items[0].preview_url);
                console.log("Album: " + data.tracks.items[0].album.name);
                console.log("=========================");
        })
        .catch(function (err) {
            console.error('Error occured: ' + err);
        })
    } else {
        spotify.search({
            type: "track",
            query: song,
            limit: 1
        }).then(function (data) {
                console.log("=========================");   
                console.log("Artist(s): " + data.tracks.items[0].album.artists[0].name);
                console.log("Track: " + data.tracks.items[0].name);
                console.log("Preview Song: " + data.tracks.items[0].preview_url);
                console.log("Album: " + data.tracks.items[0].album.name);
                console.log("=========================");
        })
        .catch(function (err) {
            console.error('Error occured: ' + err);
        })
    }
}

function findMovies() {
    var movieName = process.argv.slice(3).join(" ");
    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    if (!movieName) {
    var queryURL = "http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&apikey=trilogy";

    axios.get(queryURL).then(function(response) {
        console.log("=========================");
        console.log("Title: " + "Mr. Nobody");
        console.log("Release Year: " + response.data.Year);
        console.log("IMDB Rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        console.log("Country of Production: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
        console.log("=========================");
    })
    } else {
    axios.get(queryURL).then(function(response) {
        console.log("=========================");
        console.log("Title: " + movieName);
        console.log("Release Year: " + response.data.Year);
        console.log("IMDB Rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        console.log("Country of Production: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
        console.log("=========================");
    })
    }
}

function findRandom() {
    fs.readFile("./random.txt", "utf8",  (error, data) => {
        if  (error) throw error 

        let splitData = data.split(",");
        var commandRan = splitData[0];
        var info = splitData[1];

        if(commandRan === 'spotify-this-song') {
        spotify
            .search({
                type: "track",
                query: info,
                limit: 1
            })
            .then(function (data) {
                    console.log("=========================");
                    console.log("Artist(s): " + data.tracks.items[0].album.artists[0].name);
                    console.log("Track: " + data.tracks.items[0].name);
                    console.log("Preview Song: " + data.tracks.items[0].preview_url);
                    console.log("Album: " + data.tracks.items[0].album.name);
                    console.log("=========================");
            })
            .catch(function (err) {
                console.error('Error occurred: ' + err);
            });

        }
        

    })
}