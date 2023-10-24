// get trending movie of the day
import { options } from "./options.js";

const $carousel = document.querySelector(".carousel");
const IMG_URL = "https://image.tmdb.org/t/p/w500/";

// 화면에 그려주기
const paintCard = (backdrop_path, title, vote_average, id) => {
  let carouselLi = document.createElement("li");
  carouselLi.innerHTML = `<div class="img">
    <img src=${IMG_URL + backdrop_path} alt="img" draggable="false" />
  </div>
    <h2>${title}</h2>
    <span>${vote_average}</span>
    <button class="custom-btn btn-3 idBtn" onClick="alert('영화 id: ${id}')">
      <span>Check ID</span>
  </button>`;
  carouselLi.classList.add("card");
  $carousel.append(carouselLi);
};

// 처음 페이지 로드될 때 trending 20개 받아옴
const init = async () => {
  try {
    const trendings = await fetch(
      "https://api.themoviedb.org/3/trending/movie/day",
      options
    );
    const jsonData = await trendings.json();
    const { results } = jsonData;
    results.forEach((movie) => {
      const { backdrop_path, id, title, vote_average } = movie;
      paintCard(backdrop_path, title, vote_average, id);
    });
  } catch (error) {
    console.error("error", error);
  }
};

init();
