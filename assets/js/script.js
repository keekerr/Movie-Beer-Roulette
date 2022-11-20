// image link - use poster_path

var movieTitle = $('.movieTitle');
var moviePoster = $('.moviePoster')

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}



var theMovieDb = {
    apiKey: "a704608e266b5b21760a7bf37c54c312",
    defaultUrl: "https://api.themoviedb.org/3/",
    timeout: 5000,
    language: "en-US"
}
// fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${theMovieDb.apiKey}&language=en-US&region=US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${getRandomInt(500)}&with_genres=Action&with_watch_monetization_types=flatrate`)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data)
//         console.log(data.results[getRandomInt(19)])
//         document.getElementById("title").innerHTML +=
//         "  " + data.poster_path;
//         }); 


function getMovie() {
    var movieQuery = `https://api.themoviedb.org/3/discover/movie?api_key=${theMovieDb.apiKey}&language=en-US&region=US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${getRandomInt(500)}&with_genres=Action&with_watch_monetization_types=flatrate`;
    movieTitle.empty();
    $.ajax({
        url: movieQuery,
        method: 'GET',
    }).then(function (response){
        var movieRespone = response.results[getRandomInt(19)];
        var posterImage = `https://image.tmdb.org/t/p/original/${movieRespone.poster_path}`;
        console.log(movieRespone);
        movieTitle.text(`Here is your movie: ${movieRespone.original_title}`);
        moviePoster.attr('src', posterImage)
        console.log(movieRespone.original_title)
    })

}

getMovie();