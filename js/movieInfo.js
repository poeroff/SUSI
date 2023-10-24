import { options } from "./options.js";

const headTitle = document.querySelector("title");
const wrapper = document.querySelector(".wrapper");
const movieTitle = document.querySelector(".movieTitle");
const movieOverview = document.querySelector(".movieOverview");
const releasedDate = document.querySelector(".released_date");
const movieIdSpan = document.querySelector(".movieId");

let movieId;
const API_URL = "https://api.themoviedb.org/3/movie/";

// 영화 정보 받아오기
const getInfo = async (id) => {
  const response = await fetch(API_URL + id, options);
  const movieInfo = await response.json();
  console.log(movieInfo);
  const { title, overview, release_date, poster_path } = movieInfo;
  return { title, overview, release_date, poster_path };
};

// 영화 정보 그려주기
const paintMovieInfo = (title, overview, release_date) => {
  movieTitle.innerHTML = title;
  movieIdSpan.innerHTML = `Movie ID: ${movieId}`;
  movieOverview.innerHTML = overview;
  releasedDate.innerHTML = `Released ${release_date}`;
};

// 유튜브 영상 있으면, url받아오기
const getYoutubeUrl = async (movie_id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}/videos
  `,
    options
  );
  const json = await response.json();
  const { results } = json;
  return results;
};

const init = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  movieId = urlParams.get("id");
  const { title, overview, release_date, poster_path } = await getInfo(movieId);
  headTitle.innerText = `영화 콜렉션 - ${title}`;

  paintMovieInfo(title, overview, release_date);
  let vidsArr = await getYoutubeUrl(movieId);

  if (vidsArr.length === 0) {
    // let img = document.createElement("img");
    let img = new Image();
    img.src = poster_path
      ? `https://image.tmdb.org/t/p/w500/${poster_path}`
      : "./assets/imgs/noimage.jpeg";
    img.width = "280";
    img.height = "342";
    img.alt = "Sorry, NO IMAGE";
    wrapper.prepend(img);
  } else {
    let iframe = document.createElement("iframe");
    iframe.className = "preview";
    iframe.width = "560";
    iframe.height = "315";
    iframe.src = `https://www.youtube.com/embed/${vidsArr[0].key}`;
    iframe.title = title;
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    wrapper.prepend(iframe);
  }
};

window.addEventListener("load", init);
