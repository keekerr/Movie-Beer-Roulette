var movieTitle = $('.movieTitle');
var moviePoster = $('.moviePoster')
var movieDescription = $('.movieDescription');
var movieLink = $('.movieLink');
var movieGenres = $('.movieGenres');
var apiKey = "a704608e266b5b21760a7bf37c54c312";
var randomYear;
var storedMovies = [];
var storedBeer = [];
var movie = '';

// punkAPI Vars
var startBtn = $('.btn')
var beerName = $('.beerTitle')
var descriptionDisplay = $('.beerDescription')
var beerPoster = $('.beer5Poster')

// getRandomInt is used to generate a random number, we're using it both to give us a random page, and random object from that page (this selects the actual movie that's displayed.) -JL
// Source for getRandomInt: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random -JL
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
// Source: https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function getBeer() {
    fetch('https://api.punkapi.com/v2/beers/random')
    .then(response => {
        return response.json()
    })
    .then(data => {
        var name = data[0].name
        var description = data[0].description
        var id = data[0].id
        var beerImage = data[0].image_url

        if(!beerImage){
        beerPoster.attr('src' , 'https://via.placeholder.com/600x600/000000/6e0000?text=No+Image+Available')
        } else {
        beerPoster.attr('src' , beerImage)
        }
        beerName.text(`Beer Name: ${name}`)
        descriptionDisplay.text(`Beer Description: ${description}`)
    })
}

// Main function to pull a random movie, pulling from TheMovieDb API. The second pull in this function is for the genre, the main method of pulling we're using only gives us a genre ID, and not the actual genre. The second pull is only grabbing the movie's genre for us and then appending it to the page.
function getMovie() {
    var movieQuery = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&region=US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${getRandomInt(500)}&with_genres=Action&with_watch_monetization_types=flatrate`;
    movieTitle.empty();
    movieDescription.empty();
    movieGenres.empty();
    $.ajax({
        url: movieQuery,
        method: 'GET',
    }).then(function (response){
        var movieRespone = response.results[getRandomInt(19)];
        var posterImage = `https://image.tmdb.org/t/p/original/${movieRespone.poster_path}`;
        var whereToWatch = `https://www.themoviedb.org/movie/${movieRespone.id}${movieRespone.original_title}/watch`
        fetch(`https://api.themoviedb.org/3/movie/${movieRespone.id}?api_key=${apiKey}&language=en-US`).then(response => response.json()).then(function (data) {movieGenres.append('Genre: ' + data.genres[0].name)});
        movieTitle.text(`${movieRespone.original_title}`);
        moviePoster.attr('src', posterImage);
        movieLink.attr('href', whereToWatch);
        $('.result-container').append(movieLink);
        movieDescription.text(`Movie Description: ${movieRespone.overview}`);
    })
}

function getMovieByYear() {
    var movieQuery = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&region=US&include_adult=false&include_video=false&page=1&year=${randomYear}`;
    movieTitle.empty();
    movieDescription.empty();
    movieGenres.empty();
    $.ajax({
        url: movieQuery,
        method: 'GET',
    }).then(function (response){
        var movieRespone = response.results[getRandomInt(19)];
        var posterImage = `https://image.tmdb.org/t/p/original/${movieRespone.poster_path}`;
        var whereToWatch = `https://www.themoviedb.org/movie/${movieRespone.id}${movieRespone.original_title}/watch`
        fetch(`https://api.themoviedb.org/3/movie/${movieRespone.id}?api_key=${apiKey}&language=en-US`).then(response => response.json()).then(function (data) {movieGenres.append('Genre: ' + data.genres[0].name)});
        movieTitle.text(`${movieRespone.original_title}`);
        moviePoster.attr('src', posterImage);
        movieLink.text('Click here to see where you can watch this movie!')
        movieLink.attr('href', whereToWatch);
        $('.result-container').append(movieLink);
        movieDescription.text(`Movie Description: ${movieRespone.overview}`);
    })
}

$('.byYearBtn').click(function (e) { 
    e.preventDefault();
    getMovieByYear();
    getBeer();
});


$('#generateBtn').click(function(e) {
    e.preventDefault;
    getMovie();
    getBeer();
})

$('.likeButtonMovie').click(function(e) {
    e.preventDefault;

    if(!movieTitle) {
        return;
    };

    // storedMovies.push($('.movieTitle').textcontent);
    // console.log(storedMovies);
    localStorage.setItem('movie', $('.movieTitle').text());
})
