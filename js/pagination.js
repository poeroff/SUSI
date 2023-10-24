import { options } from "./options.js";
const IMG_URL = "https://image.tmdb.org/t/p/w500/";
const $tbody = document.querySelector("tbody");

// movieList Page
const pagination = document.querySelector(".pagination");

// prevPage, nextPage 2개 빼줘야 함
const pageNumbers = pagination ? pagination.childElementCount - 2 : 0;
const pageBtns = document.querySelectorAll(".pageBtn");

let totalPageNum = 0;
let pureURL;
let keyword;
const shownPageNum = 3; // 페이지네이션 보이는 개수 3개

// 페이지네이션 페이지 번호 클릭 시 , 페이지 번호에 따른 영화 리스트 받아오기
const getMovieListByPage = (e) => {
  let page = e.target.dataset.id;
  const link = pureURL;
  const url = new URL(link);
  const urlParams = url.searchParams;
  urlParams.append("page", page);
  getMoiveListByKeywordAndPage(keyword, page);
};

// 영화 리스트 그려주는 함수
const paintSearchMovieList = (title, overview, id, poster_path) => {
  let tr = document.createElement("tr");
  tr.innerHTML = `
  <th scope="row">
  <a class="movie-title" href="./search.html?id=${id}"
  >${title}</a
<
</th>
  <td>
  <div class="img">
  <img src=${
    poster_path ? IMG_URL + poster_path : "./assets/imgs/noimage.jpeg"
  } alt="img" />
</div>
</td>
  <td colspan="2">${overview}</td>`;
  $tbody.append(tr);
};

const paintPagination = (number, direction) => {
  const pageLink = number.querySelector(".page-link");
  if (direction === "Next") {
    if (Number(pageLink.innerHTML) + pageNumbers > totalPageNum) {
      return;
    } else {
      pageLink.dataset.id = Number(pageLink.dataset.id) + pageNumbers;
      console.log(pageLink);

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

// 테이블에 그려주는 함수

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

// movielist page
// 입력값과 페이지를 통해 db에서 영화 리스트 받아오기.
// 메인 페이지에서 키워드를 입력해 movielist.html로 이동할 시 page가 없으므로, 기본 1로 설정
const getMoiveListByKeywordAndPage = async (keyword, page = 1) => {
  $tbody.innerHTML = "";
  const searchList = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=en-US&page=${page}`,
    options
  );
  const jsonData = await searchList.json();
  let { total_pages } = jsonData;
  if (total_pages % shownPageNum) {
    total_pages += shownPageNum - (total_pages % shownPageNum);
  }
  totalPageNum = total_pages;
  const { results } = jsonData;
  console.log(results);
  if (results.length === 0) {
    alert("Sorry no info");
    return;
  }
  results.forEach((result) => {
    const { title, overview, id, poster_path } = result;
    paintSearchMovieList(title, overview, id, poster_path);
  });
};

// 현 위치가 movielist.html일 경우, 입력값 받아옴
if (window.location.href.includes("movielist.html")) {
  pureURL = window.location.href;
  const urlParams = new URLSearchParams(window.location.search);
  keyword = urlParams.get("keyword");
} else {
  false;
}

// 입력 키워드 또는 페이지에 따라 DB에 데이터 요청하기
getMoiveListByKeywordAndPage(keyword);
