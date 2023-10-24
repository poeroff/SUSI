const movieList = document.querySelector(".movie-list");
const searchBtn = document.getElementById("searchBtn");
const inputValue = document.getElementById("searchInput");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOTIwODAzOWU5MmQ3MTAzMGE4Yzc3NWYzY2M5NTcwZSIsInN1YiI6IjY1MmYzMzJjMGNiMzM1MTZmZWM5Y2IxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1CikEcFIiKNs6E-gxClYCOhIjhOblDVhaixt2Iv1n28",
  },
};

let totalArr = [];

const getMovieListFromDB = async () => {
  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      options
    );
    const json = await res.json();
    const { results } = json;
    totalArr = results;
  } catch (error) {
    console.error(error);
  }
};

const paintCard = (backdrop_path, title,  id) => {
  let movieCard = document.createElement("div");
  movieCard.classList.add("movie-card");
  movieCard.dataset.id = id;
  movieCard.innerHTML = `<img src="https://image.tmdb.org/t/p/w500/${backdrop_path}" alt="${title}">
  <h3 class="movie-title">${title}</h3>`;
  movieList.append(movieCard);
};

const paintPage = (arr) => {
  arr.forEach((movie) => {
    const { backdrop_path, title, overview, vote_average, id } = movie;
    paintCard(backdrop_path, title, overview, vote_average, id);
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

const init = async () => {
  try {
    await getMovieListFromDB();
    paintPage(totalArr);
  } catch (error) {
    console.error(error);
  }
};

searchBtn.addEventListener("click", handleSearchClick);
window.addEventListener("load", init);
