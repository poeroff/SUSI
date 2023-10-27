// Video를 불러오기 위한 Open API
const divider = document.querySelector(".divider");
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const image = document.querySelector(".image");
const p0 = document.querySelector(".p0");

// fetch 옵션
let tvDetailInfo = async (tv_id) => {
    const tvActorUrl = `https://api.themoviedb.org/3/tv/${tv_id}`;
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMDkzNzRjY2EyNTc1NjM4ZDEwMDk3NzAzYjFhODliYSIsInN1YiI6IjY1MmZiZWRkYTgwMjM2MDBmZDJkOWY0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ga70Ew8jOvgDuOUzMiuJgfI8GjGGypablmY74WjMtUs",
        },
    };
    const res = await fetch(tvActorUrl, options);
    const data = await res.json();
    if (res.ok) {
        return data;
    } else {
        throw Error(data);
    }
};
const drawTvInfo = async () => {
    try {
        // const urlParams = new URLSearchParams(window.location.search);
        // let movieId = urlParams.get("id");
        // movieInfoArr(movieId);
        const totallActorFunc = await tvDetailInfo(9477);
        console.log(totallActorFunc);
        const tvActorInfoPath = totallActorFunc.poster_path;
        const tvActorInfoName = totallActorFunc.name;
        const tvActorInfoOverview = totallActorFunc.overview;
        const tvActorInfoVote = totallActorFunc.vote_average;
        // ===============================
        const tvTitleImage = document.querySelector(".imageTv");
        const tvTitleH = document.querySelector(".tvTitle");
        const tvTitleP = document.querySelector(".tvOverView");
        tvTitleH.innerText = tvActorInfoName;
        tvTitleP.innerText = tvActorInfoOverview;
        tvTitleImage.setAttribute("src", `https://image.tmdb.org/t/p/w500/${tvActorInfoPath}`);
        throw erro;
    } catch {
        image.setAttribute(
            "src",
            `https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.pinimg.com%2F736x%2Ff3%2Ffc%2Ffe%2Ff3fcfe3bb9539323c8d62aa105b15563.jpg&type=a340`
        );
        p0.innerHTML = "The information could not be retrieved.";
    }
};

drawTvInfo();

// const paintTvInfo = (tvInfo) => {
//     // 이미지와 기타 영화 정보 웹페이지에 출력
//     console.log(tvInfo);
//     // 이미지가 존재할 때
//     if (tvInfo[0] !== undefined) {
//         image.setAttribute("src", `https://image.tmdb.org/t/p/w500/${tvInfo[0]}`);
//         p1.innerHTML = `${tvInfo[1]}`;
//         // p2.innerHTML = `평점 : ${tvInfo[3]}`;
//         p3.innerHTML = ` ${tvInfo[2]}`;

//         // 이미지가 존재하지 않을 때
//     } else if (tvInfo[0] === undefined) {
//         image.setAttribute(
//             "src",
//             `https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.pinimg.com%2F736x%2Ff3%2Ffc%2Ffe%2Ff3fcfe3bb9539323c8d62aa105b15563.jpg&type=a340`
//         );
//         p0.innerHTML = "The information could not be retrieved.";
//     }
// };
// -------------------------------------------------------------------
// -------------------------------------------------------------------
// -------------------------------------------------------------------
// -------------------------------------------------------------------

// const post = async (movie_id) => {
//     const url = `https://api.themoviedb.org/3/movie/${movie_id}/videos`;
//     const options = {
//         method: "GET",
//         headers: {
//             accept: "application/json",
//             Authorization:
//                 "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMDkzNzRjY2EyNTc1NjM4ZDEwMDk3NzAzYjFhODliYSIsInN1YiI6IjY1MmZiZWRkYTgwMjM2MDBmZDJkOWY0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ga70Ew8jOvgDuOUzMiuJgfI8GjGGypablmY74WjMtUs",
//         },
//     };
//     const res = await fetch(url, options);
//     const data = await res.json();
//     if (res.ok) {
//         return data;
//     } else {
//         throw Error(data);
//     }
// };

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

let tvActor = async (movie_id) => {
    const tvActorUrl = `https://api.themoviedb.org/3/tv/${movie_id}/credits?language=en-US`;
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMDkzNzRjY2EyNTc1NjM4ZDEwMDk3NzAzYjFhODliYSIsInN1YiI6IjY1MmZiZWRkYTgwMjM2MDBmZDJkOWY0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ga70Ew8jOvgDuOUzMiuJgfI8GjGGypablmY74WjMtUs",
        },
    };
    const res = await fetch(tvActorUrl, options);
    const data = await res.json();
    console.log(data);
    if (res.ok) {
        return data;
    } else {
        throw Error(data);
    }
};
const drawActorInfo = async () => {
    // const urlParams = new URLSearchParams(window.location.search);
    // let movieId = urlParams.get("id");
    // movieInfoArr(movieId);
    let totallActorFunc = await tvActor(9477);
    let totallActorArr = Array.from(totallActorFunc.cast);
    console.log(totallActorArr);
    totallActorArr.splice(10);
    totallActorArr.map((actor) => {
        const actorUrl = "https://image.tmdb.org/t/p/w200";
        let actorPath = actor.profile_path;
        let actorName = actor.name;
        let actorUrlPath = actorPath ? actorUrl + actorPath : "./assets/imgs/noimage.jpeg";
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
        actorCharacterTitle.innerText = "Character:";
        actorPotoCharacter.innerText = actorCharacter;
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
