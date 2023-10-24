const movieList = document.querySelector(".movie-list");
const searchBtn = document.getElementById("searchBtn");
const inputValue = document.getElementById("searchInput");
const LiveMovie = document.querySelector("Live-Movie")


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

const paintCard = (moviename, isvalid, backdrop_path, title, id,name) => {
  console.log(moviename)
  if (moviename === "Top_movie" || moviename === "Top_Tv") {
    let movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    movieCard.dataset.id = id;
    movieCard.innerHTML = `<img src="https://image.tmdb.org/t/p/w500/${backdrop_path}" alt="${isvalid ? name : title}">
    <h3 class="movie-title">${isvalid ? name : title}</h3>`;
    var valid = isvalid ?   ".Tv-list " : ".movie-list";
    document.querySelector(valid).append(movieCard);
  }
  else if (moviename === "Live_movie" || moviename === "Live_Tv") {

    let Livemovie = document.createElement("div");
    Livemovie.classList.add("movie-card");
    Livemovie.dataset.id = id;
    Livemovie.innerHTML = `<img src="https://image.tmdb.org/t/p/w500/${backdrop_path}" alt="${isvalid ? name : title}">
    <h3 class="movie-title">${isvalid ? name : title}</h3>`;

    let valid = isvalid ? ".Live_Tv-list" : ".Live-Movie";
    document.querySelector(valid).append(Livemovie);
  }
  else if (moviename === "Upcoming" || moviename === "Upcoming_Tv") {
    let Upcomingmovie = document.createElement("div");
    Upcomingmovie.classList.add("movie-card");
    Upcomingmovie.dataset.id = id;
    
    Upcomingmovie.innerHTML = `<img src="https://image.tmdb.org/t/p/w500/${backdrop_path}" alt="${isvalid ? name : title}">
    <h3 class="movie-title">${isvalid ? name : title}</h3>`;
    let valid = isvalid ? ".Upcoming_Tv-list" :".Upcoming-Movie"
   
    document.querySelector(valid).append(Upcomingmovie);
  }
  else if (moviename === "Popular_moive" || moviename === "popular_Tv") {
  
    let Popularmovie = document.createElement("div");
    Popularmovie.classList.add("movie-card");
    Popularmovie.dataset.id = id;
    Popularmovie.innerHTML = `<a href=""><img src="https://image.tmdb.org/t/p/w500/${backdrop_path}" alt="${isvalid ? name : title}">
    <h3 class="movie-title">$${isvalid ? name : title}</h3></a>`;
    let valid = isvalid ? ".popular_Tv_list" : ".popular_movie";
   
    document.querySelector(valid).append(Popularmovie);
  }
};

const paintPage = ( moviename,isvalid, arr) => {
  arr.forEach((movie) => {
    const { backdrop_path, title, id ,name} = movie;
    paintCard(moviename, isvalid, backdrop_path, title, id,name);
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






const moviearray = ["https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", 
'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', 
'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', 
'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1',
'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1',
'https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1',
'https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1'

]
const init = async () => {
  const promises = moviearray.map(async (movie) => {
    const result = await getMovieListFromDB(movie);
    return result;
  });

  try {
    const movieData = await Promise.all(promises);
    console.log(movieData)
    paintPage("Top_movie", false,movieData[0])
    paintPage("Live_movie", false,movieData[1])
    paintPage("Upcoming", false,movieData[2])
    paintPage("Popular_moive", false,movieData[3])
    paintPage("Top_Tv",true,movieData[4])
    paintPage( "popular_Tv",true,movieData[5])
    paintPage( "Live_Tv",true,movieData[6])
    paintPage( "Upcoming_Tv",true,movieData[7])

  } catch (error) {
    console.error(error);
  }
};

searchBtn.addEventListener("click", handleSearchClick);
window.addEventListener("load", init);
