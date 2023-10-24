const paintCard = (backdrop_path, title,  id) => {
    let movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    movieCard.dataset.id = id;
    movieCard.innerHTML = `<img src="https://image.tmdb.org/t/p/w500/${backdrop_path}" alt="${title}">
    <h3 class="movie-title">${title}</h3>`;
    movieList.append(movieCard);
  };