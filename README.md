# Movie-Roulette
## Table of Contents

* [Description](#description)
* [Code Examples](#code-examples)
* [Important links](#important-links)
* [Languages Used](#languages-used)
* [Contributors](#contributer)

## Description
The purpose of this project was to create an application that presented the user with a randomized movie title and beer name. The following list shows an example of the criteria used to complete this project.

- When the user clicks the generate button, they are presented with both a movie title and a beer name.

-When the user is presented with their movie and beer suggestion, they are able to see a description of the suggestions, and a link to find the suggested movie online.
 
- When the user clicks the like button on the movie and/or beer suggestion, the suggestion is then sent to local storage that is rendered under the previous likes seciton of the page.

-When the user selects a decade filter for the move, they are presented with a randomized movie suggestion from the selected decade.

-Successful implementation of the CSS framework "bulma".

-Successful implementation of interactive elements.

Have a clean repository that meets quality coding standards (file structure, naming conventions, follows best practices for class/id-naming conventions, indentation, quality comments, etc.).

Have a quality README (with unique name, description, technologies used, screenshot, and link to deployed application).

## Code Examples

Example of code used to implement bulma

```js
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.2.0/css/fontawesome.min.css"
    />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"
    />
    <link rel="stylesheet" href="./assets/css/styles.css" />
    <title>Movie and Beer Roulette</title>
  </head>
  <body class="bg-img">
    <section class="section ">
      <div class="container">
        <nav class="header has-background-black has-text-centered">
```

Example of code used to implement the randomization of the movie and beer APIs

```js
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
```

Example of code used to create the Local Storage Element

```js
$('#likeMovie').click(function(){
    storageMovie.push(currentMovieTitle);
    localStorage.setItem("movieTitles", JSON.stringify(storageMovie));
    saveMovie();
});
```

```js
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
```
## Important Links
[GitHub Repository](https://github.com/keekerr/Movie-Beer-Roulette)

[Deployed Application](https://github.com/keekerr/Movie-Beer-Roulette/deployments/activity_log?environment=github-pages)

![Image of Deployed Application](https://github.com/keekerr/Movie-Beer-Roulette/blob/main/assets/images/Example.PNG?raw=true)

## Languages Used

![HTML Badge](https://th.bing.com/th/id/OIP._Ik4_2kbAUkc8WfirxFSLwHaHa?w=100&h=120&c=7&r=0&o=5&pid=1.7)
![CSS Badge](https://th.bing.com/th/id/OIP.bVCzXbidOak-TcOhmW0QTAHaHa?pid=ImgDet&w=100&h=120&c=7)
![Java Script Badge](https://www.simpleimageresizer.com/_uploads/photos/6e0fb386/68747470733a2f2f656e637279707465642d74626e302e677374617469632e636f6d2f696d616765733f713d74626e3a414e6439476351492d79727530675f5f6d327574627561627a4b6647426c4e4c4965326168626c4a626726757371703d4_100x120.png)

## Contributors

Keeley Kerr - [GitHub](https://github.com/keekerr)

Josh Lemmond - [GitHub](https://github.com/Joshvuh)

Denart Ifurung - [Github](https://github.com/difurung)

Shaniya Kindle - [GitHub](https://github.com/Skindle)

Robert McMullen - [GitHub](https://github.com/ItsssBobby)

