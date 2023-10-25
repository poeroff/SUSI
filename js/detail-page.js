// Video를 불러오기 위한 Open API
const divider = document.querySelector(".divider");
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const image = document.querySelector(".image");
const p0 = document.querySelector(".p0");
const p1 = document.querySelector(".h1");
const p2 = document.querySelector(".p2");
const p3 = document.querySelector(".p3");

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
        movieInfo.push(jsonData["poster_path"], jsonData["title"], jsonData["overview"], jsonData["vote_average"]);
        paintMovieInfo(movieInfo);
    } catch (error) {
        console.error(error);
    }
};



const paintMovieInfo = (movieInfo) => {
    // 이미지와 기타 영화 정보 웹페이지에 출력
    console.log(movieInfo);
    // 이미지가 존재할 때
    if (movieInfo[0] !== undefined) {
        image.setAttribute("src", `https://image.tmdb.org/t/p/w500/${movieInfo[0]}`);
        p1.innerHTML = `${movieInfo[1]}`;
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

// let filteredArr = totallArr.filter((movie) => {
//   return movie.type === "Trailer";
// });
// console.log(filteredArr); --------> fillter인 array값만 불러온다! 그중에 첫번째 해당하는 key value값만 호출
// let filteredArrMinus = filteredArr.slice(0, 1);
// filteredArrMinus.forEach((video) => {
//   let videoUrl = `https://www.youtube.com/embed/${video.key}`;
//   const videoElm = document.querySelector(".videoCss");
//   const videoIframe = document.createElement("iframe");
//   videoIframe.className = "video";
//   videoIframe.setAttribute("width", 800);
//   videoIframe.setAttribute("height", 600);
//   videoIframe.setAttribute("margin", "600px");
//   videoIframe.setAttribute("allow", "fullscreen");
//   videoIframe.setAttribute("src", videoUrl);
//   videoElm.append(videoIframe);
// }); => init 함수 안으로 리팩토링
