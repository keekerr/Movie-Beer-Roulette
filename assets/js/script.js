var movieTitle = $('.movieTitle');
var moviePoster = $('.moviePoster')
var movieDescription = $('.movieDescription');
var movieLink = $('.movieLink');
var movieGenres = $('.movieGenres');
var apiKey = "a704608e266b5b21760a7bf37c54c312";

// punkAPI Vars
var startBtn = $('.btn')
var beerName = $('.beerTitle')
var descriptionDisplay = $('.beerDescription')
var beerPoster = $('.beer5Poster')

// getRandomInt is used to generate a random number, we're using it both to give us a random page, and random object from that page (this selects the actual movie that's displayed.)
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
    

function getMovie() {
    var movieQuery = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&region=US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${getRandomInt(500)}&with_genres=Action&with_watch_monetization_types=flatrate`;
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
        console.log(movieRespone);
        movieTitle.text(`Here is your movie: ${movieRespone.original_title}`);
        moviePoster.attr('src', posterImage);
        movieLink.attr('href', whereToWatch);
        $('.result-container').append(movieLink);
        movieDescription.text(`Movie Description: ${movieRespone.overview}`);
        console.log(movieRespone.original_title)
        console.log(movieRespone.overview);
    })
}

getMovie();
  
    function getBeer(e) {
    //   e.preventDefault()
  
      fetch('https://api.punkapi.com/v2/beers/random')
        .then(response => {
          return response.json()
        })
        .then(data => {
          console.log(data)
          var name = data[0].name
          var description = data[0].description
          var id = data[0].id
          var beerImage = data[0].image_url

          if(!beerImage){
            beerPoster.attr('src' , 'https://via.placeholder.com/200')
          } else {
            beerPoster.attr('src' , beerImage)
          }
          beerName.text(`Beer Name: ${name}`)
          descriptionDisplay.text(`Beer Description: ${description}`)
        })
    }
  
    // startBtn.addEventListener('click', getData)
    getBeer()
