const $results = document.querySelector(".results");
const wrapper = document.querySelector(".wrapper");
const pagination = document.querySelector(".pagination");
const pageBtns = document.querySelectorAll("button");
let totalPage;
const shownPageCnt = 10;
const lastPageGroup = Math.ceil(totalPage / shownPageCnt);
const IMG_URL = "https://image.tmdb.org/t/p/w500/";
let moviesArr = [];
let keyword;

const getMovieListByPage = (e) => {
  let page = e.target.dataset.id;
  const link = pureURL;
  const url = new URL(link);
  const urlParams = url.searchParams;
  urlParams.append("page", page);
  getMoiveListByKeywordAndPage(keyword, page);
};

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOTIwODAzOWU5MmQ3MTAzMGE4Yzc3NWYzY2M5NTcwZSIsInN1YiI6IjY1MmYzMzJjMGNiMzM1MTZmZWM5Y2IxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1CikEcFIiKNs6E-gxClYCOhIjhOblDVhaixt2Iv1n28",
  },
};

const firstAndLastPageNum = (currentPageGroup, lastPageGroup) => {
  let firstPage = (currentPageGroup - 1) * shownPageCnt + 1;
  let lastPage =
    currentPageGroup === lastPageGroup // 현재 페이지 그룹이 마지막 페이지 그룹이라면 나머지
      ? totalPage
      : currentPageGroup * shownPageCnt;

  return { firstPage, lastPage };
};

const getMoiveListByKeywordAndPage = async (keyword, page = 1) => {
  $results.innerHTML = "";

  const searchList = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=en-US&page=${page}`,
    options
  );
  const jsonData = await searchList.json();
  let { results, total_pages } = jsonData;
  totalPage = total_pages;
  console.log(totalPage);
  const shownPageCnt = 10;
  const lastPageGroup = Math.ceil(totalPage / shownPageCnt);
  let currentPage = page;
  let currentPageGroup = Math.ceil(currentPage / shownPageCnt);
  console.log("currentPageGroup : " + currentPageGroup);
  console.log("lastPageGroup : " + lastPageGroup);
  let { firstPage, lastPage } = firstAndLastPageNum(
    currentPageGroup,
    lastPageGroup
  );
  results.forEach((movie) => {
    const { title, overview, poster_path, id, release_date } = movie;
    paintCard(title, overview, poster_path, id, release_date);
  });
  pageBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (e.target.className === "prev") {
        console.log("clicked prev");
        currentPageGroup = currentPageGroup <= 1 ? 1 : currentPageGroup - 1;
        console.log(currentPageGroup);
        const { firstPage, lastPage } = firstAndLastPageNum(
          currentPageGroup,
          lastPageGroup
        );
        paintPages(firstPage, lastPage);
        return;
      } else if (e.target.className === "next") {
        currentPageGroup =
          currentPageGroup >= lastPageGroup
            ? lastPageGroup
            : currentPageGroup + 1;
        const { firstPage, lastPage } = firstAndLastPageNum(
          currentPageGroup,
          lastPageGroup
        );
        paintPages(firstPage, lastPage);
        return;
      }
    });
  });
  paintPages(firstPage, lastPage);
};

const paintPages = (firstPage, lastPage) => {
  pagination.innerHTML = "";
  for (let i = firstPage; i <= lastPage; i++) {
    let li = document.createElement("li");
    li.className = "page";
    li.dataset.id = i;
    li.innerHTML = `<a href="#">${i}</a>`;
    li.addEventListener("click", (e) => {
      currentPage = parseInt(e.target.innerText);
      getMoiveListByKeywordAndPage(keyword, currentPage);
    });
    pagination.append(li);
  }
};

const paintCardDetail = (titleParam, overviewParam, id, url, release_date) => {
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
  movieTitle.href = `./detail-page.html?type=movie&id=${id}`;
  releaseDate.innerText = release_date;
  overview.innerHTML = `<p>${overviewParam}</p>`;
  moviePoster.innerHTML = `<img src="${url}" alt="" />`;
  moviePoster.href = `./detail-page.html?type=movie&id=${id}`;
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

const paintCard = (
  titleParam,
  overviewParam,
  poster_path,
  id,
  release_date
) => {
  if (poster_path) {
    let url = IMG_URL + poster_path;
    paintCardDetail(titleParam, overviewParam, id, url, release_date);
  } else {
    let url = "./assets/imgs/noimage.jpg";
    paintCardDetail(titleParam, overviewParam, id, url, release_date);
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

paintPages();
getMoiveListByKeywordAndPage(keyword);
