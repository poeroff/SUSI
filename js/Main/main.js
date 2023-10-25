import * as dom from "./dom.js"

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
   
    dom.paintPage("Top_movie", false,movieData[0])
    dom.paintPage("Live_movie", false,movieData[1])
    dom.paintPage("Upcoming", false,movieData[2])
    dom.paintPage("Popular_moive", false,movieData[3])
    dom.paintPage("Top_Tv",true,movieData[4])
    dom.paintPage( "popular_Tv",true,movieData[5])
    dom.paintPage( "Live_Tv",true,movieData[6])
    dom.paintPage( "Upcoming_Tv",true,movieData[7])

  } catch (error) {
    console.error(error);
  }
};

window.addEventListener("load", init);
