var movieTitle = $('.movieTitle');
var moviePoster = $('.moviePoster')
var movieDescription = $('.movieDescription');
var movieLink = $('.movieLink');
var movieGenres = $('.movieGenres');
var apiKey = "a704608e266b5b21760a7bf37c54c312";

// getRandomInt is used to generate a random number, we're using it both to give us a random page, and random object from that page (this selects the actual movie that's displayed.) -JL
// Source for getRandomInt: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random -JL
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
// Source: https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// function getMovie() {
//     var movieQuery = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&region=US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${getRandomInt(500)}&with_genres=Action&with_watch_monetization_types=flatrate`;
//     movieTitle.empty();
//     movieDescription.empty();
//     $.ajax({
//         url: movieQuery,
//         method: 'GET',
//     }).then(function (response){
//         var movieRespone = response.results[getRandomInt(19)];
//         var posterImage = `https://image.tmdb.org/t/p/original/${movieRespone.poster_path}`;
//         var whereToWatch = `https://www.themoviedb.org/movie/${movieRespone.id}${movieRespone.original_title}/watch`
//         fetch(`https://api.themoviedb.org/3/movie/${movieRespone.id}?api_key=${apiKey}&language=en-US`).then(response => response.json()).then(function (data) {movieGenres.append(data.genres[0].name)});
//         console.log(movieRespone);
//         movieTitle.text(`Here is your movie: ${movieRespone.original_title}`);
//         moviePoster.attr('src', posterImage);
//         movieLink.attr('href', whereToWatch);
//         $('.result-container').append(movieLink);
//         movieDescription.text(`Movie Description: ${movieRespone.overview}`);
//         console.log(movieRespone.original_title)
//         console.log(movieRespone.overview);
//     })
// }

// getMovie();

var randomYear = randomIntFromInterval(1970, 1979);
// console.log(randomYear);

function getMovieByYear() {
    var movieQuery = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&region=US&include_adult=false&include_video=false&page=1&year=${randomYear}`;
    movieTitle.empty();
    movieDescription.empty();
    $.ajax({
        url: movieQuery,
        method: 'GET',
    }).then(function (response){
        var movieRespone = response.results[getRandomInt(19)];
        var posterImage = `https://image.tmdb.org/t/p/original/${movieRespone.poster_path}`;
        var whereToWatch = `https://www.themoviedb.org/movie/${movieRespone.id}${movieRespone.original_title}/watch`
        fetch(`https://api.themoviedb.org/3/movie/${movieRespone.id}?api_key=${apiKey}&language=en-US`).then(response => response.json()).then(function (data) {movieGenres.append(data.genres[0].name)});
        movieTitle.text(`Here is your movie: ${movieRespone.original_title}`);
        moviePoster.attr('src', posterImage);
        movieLink.attr('href', whereToWatch);
        $('.result-container').append(movieLink);
        movieDescription.text(`Movie Description: ${movieRespone.overview}`);
        console.log(movieRespone.original_title)
    })
}

$('.testBtn').click(function (e) { 
    e.preventDefault();
    getMovieByYear();
    console.log(randomYear);
});
