const divider = document.querySelector(".divider");
const left = document.querySelector(".left");
const right = document.querySelector(".right");

// fetch 옵션
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMGY3ZWNlZmNlOGE5OTkzMjcxNjgzYTNmOWU4YWRlNyIsInN1YiI6IjY1MmYzNDA4YTgwMjM2MDBmZDJkNDlmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1rrCh0VRmKqEgle1KUg65DcMvhupvRf-ZPyDLm_5-DA'
    }
};

const API_URL = "https://api.themoviedb.org/3/movie/";


let movieInfo = [];

// 영화 정보 받기
async function getMovieListFromDB(id) {
try {    
    const response = await fetch(API_URL + id, options)
    const jsonData = await response.json();
    movieInfo.push(jsonData['title'], jsonData['vote_average'], jsonData['overview'], jsonData['poster_path']);
    }
catch (error) {
    console.error(error);
    }
};
getMovieListFromDB(240)
.then(()=> {
    // 이미지와 기타 영화 정보 웹페이지에 출력
    left.innerHTML = `<img class= "image" src="https://image.tmdb.org/t/p/w500/${movieInfo[3]}">`;
    const image = document.querySelector(".image");
    image.style.width = '300px';
    image.style.height = '270px';
    const p1 = document.createElement('p');
    right.appendChild(p1);
    p1.innerHTML = `${movieInfo[0]}`;
    p1.style.fontSize = '50px';
    
    
    const p2 = document.createElement('p');
    right.appendChild(p2);
    p2.innerHTML = `overview : ${movieInfo[2]}`;
    p2.style.fontSize = '20px';
    
    const p3 = document.createElement('p');
    right.appendChild(p3);
    p3.innerHTML = `voteAverage : ${movieInfo[1]}`;
    p3.style.fontSize = '18px';

})














    

