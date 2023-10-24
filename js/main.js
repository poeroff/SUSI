const movieList = document.querySelector(".movie-list");
const searchBtn = document.getElementById("searchBtn");
const inputValue = document.getElementById("searchInput");
const LiveMovie = document.querySelector("Live-Movie")
const LIVEBUTTON = document.getElementById("Live")
const COMINGBUTTON = document.getElementById("UPCOMING")



LIVEBUTTON.addEventListener("click", () => {
  document.querySelector(".Live-Movie").style.display="flex";
  document.querySelector(".Upcoming-Movie").style.display="none";

})

COMINGBUTTON.addEventListener("click", () => {
  document.querySelector(".Live-Movie").style.display="none";
  document.querySelector(".Upcoming-Movie").style.display="flex";
})

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOTIwODAzOWU5MmQ3MTAzMGE4Yzc3NWYzY2M5NTcwZSIsInN1YiI6IjY1MmYzMzJjMGNiMzM1MTZmZWM5Y2IxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1CikEcFIiKNs6E-gxClYCOhIjhOblDVhaixt2Iv1n28",
  },
};

let totalArr = []

const getMovieListFromDB = async (url) => {
  try {
    const res = await fetch(url, options);
    const json = await res.json();
    const { results } = json;
    totalArr = results;
    return totalArr
  } catch (error) {
    console.error(error);
  }
};

const paintCard = (moviename, backdrop_path, title, id) => {
  if (moviename === "normal_movie") {
    let movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    movieCard.dataset.id = id;
    movieCard.innerHTML = `<img src="https://image.tmdb.org/t/p/w500/${backdrop_path}" alt="${title}">
    <h3 class="movie-title">${title}</h3>`;
    movieList.append(movieCard);
  }
  else if (moviename === "Live_movie") {

    let Livemovie = document.createElement("div");
    Livemovie.classList.add("movie-card");
    Livemovie.dataset.id = id;
    Livemovie.innerHTML = `<img src="https://image.tmdb.org/t/p/w500/${backdrop_path}" alt="${title}">
    <h3 class="movie-title">${title}</h3>`;
    console.log(Livemovie)
    document.querySelector(".Live-Movie").append(Livemovie);
    
    



  }
  else if (moviename === "Upcoming") {
    let Upcomingmovie = document.createElement("div");
    Upcomingmovie.classList.add("movie-card");
    Upcomingmovie.dataset.id = id;
    Upcomingmovie.innerHTML = `<img src="https://image.tmdb.org/t/p/w500/${backdrop_path}" alt="${title}">
    <h3 class="movie-title">${title}</h3>`;

    document.querySelector(".Upcoming-Movie").append(Upcomingmovie);

  
  }


};

const paintPage = (moviename, arr) => {
  arr.forEach((movie) => {
    const { backdrop_path, title, id } = movie;
    paintCard(moviename, backdrop_path, title, id);
  });
};

const handleSearchClick = async (event) => {
  event.preventDefault();
  movieList.innerHTML = "";
  let inputVal = searchInput.value;
  try {
    const searched = totalArr.filter((element) => {
      return element.title.toLowerCase().includes(inputVal.toLowerCase());
    });
    paintPage(searched);
  } catch (error) {
    console.error(error);
  }
};



const moviearray = ["https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1']
const init = async () => {
  const promises = moviearray.map(async (movie) => {
    const result = await getMovieListFromDB(movie);
    return result;
  });

  try {
    const movieData = await Promise.all(promises);
    console.log(movieData)
    paintPage("normal_movie", movieData[0]);
    paintPage("Live_movie", movieData[1]);
    paintPage("Upcoming", movieData[2]);

  } catch (error) {
    console.error(error);
  }
};

searchBtn.addEventListener("click", handleSearchClick);
window.addEventListener("load", init);
