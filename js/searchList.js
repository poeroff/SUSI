const results = document.querySelector(".results");
const IMG_URL = "https://image.tmdb.org/t/p/w500/";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOTIwODAzOWU5MmQ3MTAzMGE4Yzc3NWYzY2M5NTcwZSIsInN1YiI6IjY1MmYzMzJjMGNiMzM1MTZmZWM5Y2IxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1CikEcFIiKNs6E-gxClYCOhIjhOblDVhaixt2Iv1n28",
  },
};

let moviesArr = [];
let keyword;

const getMoiveListByKeywordAndPage = async (keyword, page = 1) => {
  //   $tbody.innerHTML = "";
  const searchList = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=en-US&page=${page}`,
    options
  );
  const jsonData = await searchList.json();
  //   let { total_pages } = jsonData;
  const { results } = jsonData;
  results.forEach((movie) => {
    const { title, overview, poster_path } = movie;
    paintCard(title, overview, poster_path);
    console.log(movie);
  });
  console.log(results);
};

const paintCard = (titleParam, overviewParam, poster_path) => {
  if(poster_path){
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
    movieTitle.innerHTML = `<h2>${titleParam}</h2>`;
    releaseDate.innerText = "2023.10.24";
    overview.innerHTML = `<p>${overviewParam}</p>`;
    moviePoster.innerHTML = `<img src="${IMG_URL + poster_path}" alt="" />`;
  
    title.appendChild(movieTitle);
    title.appendChild(releaseDate);
    details.appendChild(title);
    details.appendChild(overview);
    poster.appendChild(moviePoster);
    wrapper.appendChild(poster);
    wrapper.appendChild(details);
    card.appendChild(wrapper);
    results.append(card);

  }


};

/*
                <div>
                  <a href="" class="result">
                    <h2>제목</h2>
                  </a>
                </div>
                <span class="release_date">October 24, 2023</span>
              </div>


*/

// 현 위치가 search.html일 경우, 검색 키워드 받아옴
if (window.location.href.includes("search.html")) {
  pureURL = window.location.href;
  console.log(pureURL)
  const urlParams = new URLSearchParams(window.location.search);
  keyword = urlParams.get("keyword");
  console.log(keyword);
} else {
  false;
}

getMoiveListByKeywordAndPage(keyword);
