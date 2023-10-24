const paintPage = (arr) => {
    arr.forEach((movie) => {
      const { backdrop_path, title, overview, vote_average, id } = movie;
      paintCard(backdrop_path, title, overview, vote_average, id);
    });
  };