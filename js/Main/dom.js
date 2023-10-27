export function paintCard(moviename, isvalid, backdrop_path, title, id, name) {
  if (moviename === "Top_movie" || moviename === "Top_Tv") {
    let movieCard = document.createElement("div");

    movieCard.classList.add("movie-card");
    movieCard.dataset.id = id;
    movieCard.dataset.type = isvalid ? "TV" : "MOVIE"; // isvalid면 TV

    movieCard.innerHTML = `<a href="${
      isvalid
        ? "./tv-detail-page.html?type=tv"
        : "./detail-page.html?type=movie"
    }&id=${id}"><img src="https://image.tmdb.org/t/p/w500/${backdrop_path}" alt="${
      isvalid ? name : title
    }">
      <h3 class="movie-title">${isvalid ? name : title}</h3></a>`;
    var valid = isvalid ? ".Tv-list " : ".movie-list";
    document.querySelector(valid).append(movieCard);
  } else if (moviename === "Live_movie" || moviename === "Live_Tv") {
    let Livemovie = document.createElement("div");
    Livemovie.classList.add("movie-card");
    Livemovie.dataset.id = id;
    Livemovie.dataset.type = isvalid ? "TV" : "MOVIE";
    Livemovie.innerHTML = `<a href="${
      isvalid
        ? "./tv-detail-page.html?type=tv"
        : "./detail-page.html?type=movie"
    }&id=${id}"><img src="https://image.tmdb.org/t/p/w500/${backdrop_path}" alt="${
      isvalid ? name : title
    }">
      <h3 class="movie-title">${isvalid ? name : title}</h3></a>`;

    let valid = isvalid ? ".Live_Tv-list" : ".Live-Movie";
    document.querySelector(valid).append(Livemovie);
  } else if (moviename === "Upcoming" || moviename === "Upcoming_Tv") {
    let Upcomingmovie = document.createElement("div");
    Upcomingmovie.classList.add("movie-card");
    Upcomingmovie.dataset.id = id;
    Upcomingmovie.dataset.type = isvalid ? "TV" : "MOVIE";

    Upcomingmovie.innerHTML = `<a href="${
      isvalid
        ? "./tv-detail-page.html?type=tv"
        : "./detail-page.html?type=movie"
    }&id=${id}"><img src="https://image.tmdb.org/t/p/w500/${backdrop_path}" alt="${
      isvalid ? name : title
    }">
      <h3 class="movie-title">${isvalid ? name : title}</h3></a>`;
    let valid = isvalid ? ".Upcoming_Tv-list" : ".Upcoming-Movie";

    document.querySelector(valid).append(Upcomingmovie);
  } else if (moviename === "Popular_moive" || moviename === "popular_Tv") {
    let Popularmovie = document.createElement("div");
    Popularmovie.classList.add("movie-card");
    Popularmovie.dataset.id = id;
    Popularmovie.dataset.type = isvalid ? "TV" : "MOVIE";
    Popularmovie.innerHTML = `<a href="${
      isvalid
        ? "./tv-detail-page.html?type=tv"
        : "./detail-page.html?type=movie"
    }&id=${id}"><img src="https://image.tmdb.org/t/p/w500/${backdrop_path}" alt="${
      isvalid ? name : title
    }">
      <h3 class="movie-title">${isvalid ? name : title}</h3></a>`;
    let valid = isvalid ? ".popular_Tv_list" : ".popular_movie";

    document.querySelector(valid).append(Popularmovie);
  }
}

export function paintPage(moviename, isvalid, arr) {
  arr.forEach((movie) => {
    const { backdrop_path, title, id, name } = movie;
    paintCard(moviename, isvalid, backdrop_path, title, id, name);
  });
}
