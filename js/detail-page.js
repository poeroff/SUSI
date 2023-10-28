import { isMovieInFavorites } from "./like/like.js";

// Video를 불러오기 위한 Open API
const divider = document.querySelector(".divider");
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const image = document.querySelector(".image");
const p0 = document.querySelector(".p0");
const p1 = document.querySelector(".h1");
const p2 = document.querySelector(".p2");
const p3 = document.querySelector(".p3");

// 좋아요 체크
let FAVORITES = "favorites";
let favoriteArr = [];

if (localStorage.getItem(FAVORITES) !== null) {
  const parsedFavoriteArr = JSON.parse(localStorage.getItem(FAVORITES));
  favoriteArr = parsedFavoriteArr;
}

// fetch 옵션
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMGY3ZWNlZmNlOGE5OTkzMjcxNjgzYTNmOWU4YWRlNyIsInN1YiI6IjY1MmYzNDA4YTgwMjM2MDBmZDJkNDlmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1rrCh0VRmKqEgle1KUg65DcMvhupvRf-ZPyDLm_5-DA",
  },
};

const API_URL = "https://api.themoviedb.org/3/movie/";

let movieInfo = [];

const movieInfoArr = async (id) => {
  try {
    const response = await fetch(API_URL + id, options);
    const jsonData = await response.json();
    movieInfo.push(
      jsonData["poster_path"],
      jsonData["title"],
      jsonData["overview"],
      jsonData["vote_average"],
      jsonData["id"]
    );
    paintMovieInfo(movieInfo);
  } catch (error) {
    console.error(error);
  }
};

const paintMovieInfo = (movieInfo) => {
  console.log("movieInfo:");
  console.log(movieInfo);
  // 이미지와 기타 영화 정보 웹페이지에 출력
  // console.log(movieInfo);
  // 이미지가 존재할 때
  if (movieInfo[0] !== undefined) {
    image.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w500/${movieInfo[0]}`
    );

    // 좋아요 되어있는 영화인지 확인하고 있으면 빨강, 없으면 깨진하트

    p1.innerHTML = `${movieInfo[1]} ${
      isMovieInFavorites(favoriteArr, String(movieInfo[4]))
        ? '<button id="like">💔</button>'
        : '<button id="like">❤️</button>'
    }`;
    // p2.innerHTML = `평점 : ${movieInfo[3]}`;
    p3.innerHTML = ` ${movieInfo[2]}`;

    // 이미지가 존재하지 않을 때
  } else if (movieInfo[0] === undefined) {
    image.setAttribute(
      "src",
      `https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.pinimg.com%2F736x%2Ff3%2Ffc%2Ffe%2Ff3fcfe3bb9539323c8d62aa105b15563.jpg&type=a340`
    );
    p0.innerHTML = "The information could not be retrieved.";
  }
};

const post = async (movie_id) => {
  const url = `https://api.themoviedb.org/3/movie/${movie_id}/videos`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMDkzNzRjY2EyNTc1NjM4ZDEwMDk3NzAzYjFhODliYSIsInN1YiI6IjY1MmZiZWRkYTgwMjM2MDBmZDJkOWY0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ga70Ew8jOvgDuOUzMiuJgfI8GjGGypablmY74WjMtUs",
    },
  };
  const res = await fetch(url, options);
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw Error(data);
  }
};

const init = async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    let movieId = urlParams.get("id");
    movieInfoArr(movieId);
    let totallFunc = await post(movieId);
    let totallArr = Array.from(totallFunc.results);
    let filteredArr = totallArr.filter((movie) => {
      return movie.type === "Trailer";
    });
    let filteredArrMinus = filteredArr.slice(0, 1);
    filteredArrMinus.forEach((video) => {
      let videoUrl = `https://www.youtube.com/embed/${video.key}`;
      const videoElm = document.querySelector(".videoCss");
      const videoIframe = document.createElement("iframe");
      videoIframe.className = "video";
      videoIframe.setAttribute("width", 2000);
      videoIframe.setAttribute("height", 600);
      videoIframe.setAttribute("margin", "600px");
      videoIframe.setAttribute("allow", "fullscreen");
      videoIframe.setAttribute("src", videoUrl);
      videoElm.append(videoIframe);
    });
    throw error;
  } catch (e) {
    const errE = document.querySelector(".videoCss");
    const errIcon = document.createElement("i");
    errIcon.className = "fas fa-video-slash fa-4x";
    errE.append(errIcon);
  }
};

init();

let movieActor = async (movie_id) => {
  const url = `https://api.themoviedb.org/3/movie/${movie_id}/credits?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMDkzNzRjY2EyNTc1NjM4ZDEwMDk3NzAzYjFhODliYSIsInN1YiI6IjY1MmZiZWRkYTgwMjM2MDBmZDJkOWY0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ga70Ew8jOvgDuOUzMiuJgfI8GjGGypablmY74WjMtUs",
    },
  };
  const res = await fetch(url, options);
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw Error(data);
  }
};

const drawActorInfo = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  let movieId = urlParams.get("id");
  movieInfoArr(movieId);
  let totallActorFunc = await movieActor(movieId);
  // console.log(totallActorFunc);
  let totallActorArr = Array.from(totallActorFunc.cast);
  totallActorArr.splice(10);
  totallActorArr.map((actor) => {
    const actorUrl = "https://image.tmdb.org/t/p/w200";
    let actorPath = actor.profile_path;
    let actorName = actor.name;
    let actorUrlPath = actorPath
      ? actorUrl + actorPath
      : "./assets/imgs/noimage.jpg";
    let actorCharacter = actor.character;
    // =============================================
    const actorCard = document.querySelector(".actorView");
    const actorPotoImg = document.createElement("img");
    const actorPotoP = document.createElement("p");
    const actorPotoCharacter = document.createElement("p");
    const actorCharacterTitle = document.createElement("p");
    const actorPotoDiv = document.createElement("div");
    const errImgActor = "NO ACTOR IMG";
    actorPotoP.innerText = actorName;
    actorCharacterTitle.innerText = "Character:   " + actorCharacter;

    actorPotoDiv.className = "basket";
    actorPotoP.className = "actorRealNameWho";
    actorCharacterTitle.className = "actorWho";
    actorPotoCharacter.className = "actorWho";
    actorPotoImg.className = "actorPic";
    actorPotoImg.setAttribute("src", actorUrlPath);
    actorPotoImg.setAttribute("alt", errImgActor);
    actorPotoDiv.append(actorPotoCharacter);
    actorPotoDiv.prepend(actorCharacterTitle);
    actorPotoDiv.prepend(actorPotoP);
    actorPotoDiv.prepend(actorPotoImg);
    actorCard.append(actorPotoDiv);
  });
};

drawActorInfo();
