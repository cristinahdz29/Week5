//getting container div
//will append our data to this
let content = document.getElementById("content");
let featuredDiv = document.getElementById("featuredDiv");

//make request to get JSON file
let request = new XMLHttpRequest();
request.open("GET", "https://www.omdbapi.com/?s=Batman&apikey=564727fa");

request.addEventListener("load", function () {
  //return JSON file in object format
  let result = JSON.parse(this.responseText);
  //console.log(result.Search) -->this gives us array inside object

  result.Search.forEach(function (movie) {
    //console.log(movie.Title)
    let divMovieInfo = document.createElement("div");
    divMovieInfo.className = "movieInfoDiv";

    let img = document.createElement("img");
    img.className = "posterImage";
    img.setAttribute("src", movie.Poster);

    let imageDiv = document.createElement("div");
    imageDiv.className = "imageDiv";
    imageDiv.appendChild(img);

    let a = document.createElement("a");
    a.className = "movieLink";
    a.innerHTML = movie.Title;
    a.setAttribute("href", "#");
    a.addEventListener("click", function () {
      details(movie.imdbID);
    });

    let linkDiv = document.createElement("div");
    linkDiv.className = "linkDiv";
    linkDiv.appendChild(a);

    divMovieInfo.appendChild(imageDiv);
    divMovieInfo.appendChild(linkDiv);

    content.appendChild(divMovieInfo);
  });
});

request.send();

//make a function that will be called later

function details(imdbID) {
  //url with api key to get detailed batman movies
  console.log(imdbID);
  let detailedBatmanUrl = `http://www.omdbapi.com/?i=${imdbID}&apikey=564727fa`;

  //call a new GET request
  let reqDetailedBatman = new XMLHttpRequest();
  reqDetailedBatman.open("GET", detailedBatmanUrl);

  reqDetailedBatman.send();

  reqDetailedBatman.addEventListener("load", function () {
    let moviesFeature = JSON.parse(this.responseText);
      console.log(moviesFeature)

    if (featuredDiv.children.length) {
      let oldFeaturedImageDiv = document.getElementsByClassName(
        "featuredImageDiv"
      );
        let oldFeaturedInfoDiv = document.getElementsByClassName(
        "featuredInfoDiv"
      );
        oldFeaturedImageDiv[0].remove();
        oldFeaturedInfoDiv[0].remove();
    }

    let featuredImageDiv = document.createElement("div");
    featuredImageDiv.className = "featuredImageDiv";

    let featuredImage = document.createElement("img");
    featuredImage.className = "featuredImage";
    featuredImage.setAttribute("src", moviesFeature.Poster);
    featuredImageDiv.appendChild(featuredImage);

    let featuredInfoDiv = document.createElement("div");
    featuredInfoDiv.className = "featuredInfoDiv";

    let pTitle = document.createElement("p");
    pTitle.className = "title";
    pTitle.innerHTML = `Title: ${moviesFeature.Title}`;
    featuredInfoDiv.appendChild(pTitle);

    let pYear = document.createElement("p");
    pYear.className = "year";
    pYear.innerHTML = `Year: ${moviesFeature.Year}`;
    featuredInfoDiv.appendChild(pYear);

    let pRated = document.createElement("p");
    pRated.className = "rated";
    pRated.innerHTML = `Rating: ${moviesFeature.Rated}`;
    featuredInfoDiv.appendChild(pRated);

    let pReleased = document.createElement("p");
    pReleased.className = "released";
    pReleased.innerHTML = `Released: ${moviesFeature.Released}`;
    featuredInfoDiv.appendChild(pReleased);

    let pDirector = document.createElement("p");
    pDirector.className = "director";
    pDirector.innerHTML = `Director: ${moviesFeature.Director}`;
    featuredInfoDiv.appendChild(pDirector);

    featuredDiv.appendChild(featuredImageDiv);
    featuredDiv.appendChild(featuredInfoDiv);
  });
}
