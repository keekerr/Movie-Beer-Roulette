var movieTitle = $('.movieTitle');
var moviePoster = $('.moviePoster')
var movieDescription = $('.movieDescription');
var movieLink = $('.movieLink');
var movieGenres = $('.movieGenres');
var apiKey = "a704608e266b5b21760a7bf37c54c312";
var randomYear;
var storageMovie = [];
var currentMovieTitle = ""

// punkAPI Vars
var startBtn = $('.btn')
var beerName = $('.beerTitle')
var descriptionDisplay = $('.beerDescription')
var beerPoster = $('.beer5Poster')
var storageBeer = [];
var currentBeerName = ""

// getRandomInt is used to generate a random number, we're using it both to give us a random page, and random object from that page (this selects the actual movie that's displayed.) -JL
// Source for getRandomInt: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random -JL
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
// randomIntFromInterval is what we're using to pull movies by decade, this is taking the two integers set within the HTML (See the input buttons). Sourced from StackOverflow -JL
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
        var beerImage = data[0].image_url

        if(!beerImage){
        beerPoster.attr('src' , 'https://via.placeholder.com/600x600/000000/6e0000?text=No+Image+Available')
        } else {
        beerPoster.attr('src' , beerImage)
        }
        beerName.text(`Beer Name: ${name}`)
        descriptionDisplay.text(`Beer Description: ${description}`)
        currentBeerName = data[0].name
    }
)}

// Main function to pull a random movie, pulling from TheMovieDb API. The second pull in this function is for the genre, the main method of pulling we're using only gives us a genre ID, and not the actual genre. -JL
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
        movieTitle.text(`Here is your movie: ${movieRespone.original_title}`);
        moviePoster.attr('src', posterImage);
        movieLink.attr('href', whereToWatch);
        $('.result-container').append(movieLink);
        movieDescription.text(`Movie Description: ${movieRespone.overview}`);
        currentMovieTitle = movieRespone.original_title
    })
}

// Function used to get movie by decade, the main method of pulling did not allow for filtering by year in a way that would work, so I had to create another function for this specifically. -JL
// Using randomIntFromInterval for the decade range, and then getRandomInt to give us a random movie from that decade. -JL
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
        movieTitle.text(`Here is your movie: ${movieRespone.original_title}`);
        moviePoster.attr('src', posterImage);
        movieLink.text('Click here to see where you can watch this movie!')
        movieLink.attr('href', whereToWatch);
        $('.result-container').append(movieLink);
        movieDescription.text(`Movie Description: ${movieRespone.overview}`);
        currentMovieTitle = movieRespone.original_title;
    
    })
}

// Generates a movie by decade, which decade is depending on which button is clicked. Also generates a random beer. -JL
$('.byYearBtn').click(function (e) { 
    e.preventDefault();
    getMovieByYear();
    getBeer();
});

// Generates a random movie and beer. -JL
$('#generateBtn').click(function(e) {
    e.preventDefault;
    getMovie();
    getBeer();
})

// Local Storage Button for Movie
// Local Storage Button
var movieList = $('#movieList');

$('#likeMovie').click(function(){
    storageMovie.push(currentMovieTitle);
    localStorage.setItem("movieTitles", JSON.stringify(storageMovie));
    saveMovie();
});

// Local Storage Button for Beer
$('.likeBeer').click(function(){
    storageBeer.push(currentBeerName);
    localStorage.setItem("beerNames", JSON.stringify(storageBeer));
    saveBeer();
}) 

// Render Likes to screen
// forloop with search likes.

function saveMovie() {
    movieLikes = JSON.parse(localStorage.getItem("movieTitles"))
    //Populates movie ul
    movieList.empty()
    if(!movieLikes) {
        return;
    }
    for(var i = 0; i < movieLikes.length; i += 1)
    {    
    var liTag = document.createElement('li');
    liTag.textContent =  movieLikes[i];
    $(movieList).append(liTag);  
    }        
}
saveMovie();

var beerList = $('#beerList');
// Render likes for beer
function saveBeer() {
    beerLikes = JSON.parse(localStorage.getItem("beerNames"))
    beerList.empty()
    if(!beerLikes) {
        return;
    }
    for(var i = 0; i < beerLikes.length; i += 1)
    {    
    var liTag = document.createElement('li');
    liTag.textContent =  beerLikes[i];
    $(beerList).append(liTag);  
    }        
}
saveBeer()

// Function runs on page load, since we are using an empty array to push favorited beer and movies, then pushing them to local storage, we have to set storageMovie and storageBeer respectively on refresh. This way the arrays are not empty after refresh, and we do not lose out previously saved movies in local storage when we save another beer or movie to favorites. -JL
function init() {
    var previousMovieFavorites = JSON.parse(localStorage.getItem('movieTitles'));
        if(previousMovieFavorites !== null) {
            storageMovie = previousMovieFavorites
        };
    var previousBeerFavorites = JSON.parse(localStorage.getItem('beerNames'));
        if(previousBeerFavorites !== null) {
            storageBeer = previousBeerFavorites
        };
}

init();