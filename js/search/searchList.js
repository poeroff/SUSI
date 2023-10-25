const $results = document.querySelector(".results");
const buttons = document.querySelector(".buttons"); // 페이지 버튼을 담을 것
const IMG_URL = "https://image.tmdb.org/t/p/w500/";
let moviesArr = [];
let keyword;
// movieList Page
const pagination = document.querySelector(".pagination");

// prevPage, nextPage 2개 빼줘야 함
const pageNumbers = pagination ? pagination.childElementCount - 2 : 0;
const pageBtns = document.querySelectorAll(".pageBtn");

let totalPageNum = 0;
const shownPageNum = 5; // 페이지네이션 보이는 개수 5개

const getMovieListByPage = (e) => {
  let page = e.target.dataset.id;
  const link = pureURL;
  const url = new URL(link);
  const urlParams = url.searchParams;
  urlParams.append("page", page);
  getMoiveListByKeywordAndPage(keyword, page);
};

const paintPagination = (number, direction) => {
  const pageLink = number.querySelector(".page-link");
  if (direction === "Next") {
    if (Number(pageLink.innerHTML) + pageNumbers > totalPageNum) {
      return;
    } else {
      pageLink.dataset.id = Number(pageLink.dataset.id) + pageNumbers;

      pageLink.innerHTML = Number(pageLink.innerHTML) + pageNumbers;
    }
  } else if (direction === "Previous") {
    if (Number(pageLink.innerHTML) - pageNumbers <= 0) {
      return;
    } else {
      pageLink.innerHTML = Number(pageLink.innerHTML) - pageNumbers;
    }
  }
};

const pageNumber = document.getElementsByClassName("pageNumber");
for (const number of pageNumber) {
  number.addEventListener("click", getMovieListByPage);
}
const handlePageBtnClick = (e) => {
  e.preventDefault();
  for (const number of pageNumber) {
    const direction = e.target.innerHTML;
    paintPagination(number, direction);
  }
};

pageBtns.forEach((pageBtn) =>
  pageBtn.addEventListener("click", handlePageBtnClick)
);

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOTIwODAzOWU5MmQ3MTAzMGE4Yzc3NWYzY2M5NTcwZSIsInN1YiI6IjY1MmYzMzJjMGNiMzM1MTZmZWM5Y2IxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1CikEcFIiKNs6E-gxClYCOhIjhOblDVhaixt2Iv1n28",
  },
};

const getMoiveListByKeywordAndPage = async (keyword, page = 1) => {
  $results.innerHTML = "";

  const searchList = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=en-US&page=${page}`,
    options
  );
  const jsonData = await searchList.json();
  let { results, total_pages } = jsonData;
  const lastPage = total_pages;
  if (total_pages % shownPageNum) {
    total_pages += shownPageNum - (total_pages % shownPageNum);
  }
  totalPageNum = total_pages;
  if (results.length === 0) {
    alert("Sorry no info");
    getMoiveListByKeywordAndPage(keyword, lastPage);
    alert(`Last page : ${lastPage}`);
    return;
  }

  results.forEach((movie) => {
    const { title, overview, poster_path, id } = movie;
    paintCard(title, overview, poster_path, id);
  });
};

const paintCardDetail = (titleParam, overviewParam, id, url) => {
  let card = document.createElement("div");
  card.classList.add("card");
  let wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");
  let poster = document.createElement("div");
  poster.classList.add("poster");
  let moviePoster = document.createElement("a");
  moviePoster.classList.add("movie-poster");
  moviePoster.classList.add("result");

  let details = document.createElement("div");
  details.classList.add("details");
  let title = document.createElement("div");
  title.classList.add("title");
  let movieTitle = document.createElement("a");
  movieTitle.classList.add("movie-title");
  movieTitle.classList.add("result");
  let releaseDate = document.createElement("span");
  releaseDate.className = "release_date";

  let overview = document.createElement("div");
  movieTitle.innerHTML = `<h1>${titleParam}</h1>`;
  movieTitle.href = `./detail-page.html?id=${id}`;
  releaseDate.innerText = "2023.10.24";
  overview.innerHTML = `<p>${overviewParam}</p>`;
  moviePoster.innerHTML = `<img src="${url}" alt="" />`;
  moviePoster.href = `./detail-page.html?id=${id}`;
  title.appendChild(movieTitle);
  title.appendChild(releaseDate);
  details.appendChild(title);
  details.appendChild(overview);
  poster.appendChild(moviePoster);
  wrapper.appendChild(poster);
  wrapper.appendChild(details);
  card.appendChild(wrapper);
  $results.append(card);
};

const paintCard = (titleParam, overviewParam, poster_path, id) => {
  if (poster_path) {
    let url = IMG_URL + poster_path;
    paintCardDetail(titleParam, overviewParam, id, url);
  } else {
    let url = "./assets/imgs/noimage.jpeg";
    paintCardDetail(titleParam, overviewParam, id, url);
  }
};

// 현 위치가 search.html일 경우, 검색 키워드 받아옴
if (window.location.href.includes("search.html")) {
  pureURL = window.location.href;
  const urlParams = new URLSearchParams(window.location.search);
  keyword = urlParams.get("keyword");
} else {
  false;
}

getMoiveListByKeywordAndPage(keyword);
