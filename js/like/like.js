let FAVORITES = "favorites";
let favoriteArr = [];

const urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("id");
let type = urlParams.get("type");

if (localStorage.getItem(FAVORITES) !== null) {
  const parsedFavoriteArr = JSON.parse(localStorage.getItem(FAVORITES));
  favoriteArr = parsedFavoriteArr;
}

export const isMovieInFavorites = (favoriteArr, id) => {
  // 내가 좋아요 누른 영화인지 확인
  // 영화가 좋아요 리스트에 있는지 어떻게 확인할 것인가?
  let newArr = favoriteArr.filter((movie) => movie.id !== id); // 누른 영화가 좋아요 표시 된 것이라면, newArr.length === favorieArr - 1

  if (favoriteArr.length === 0) {
    console.log("영화 없어요");
    return true;
  } else if (favoriteArr.length === newArr.length) {
    console.log("영화 없어요");
    return true;
  } else {
    console.log("영화 있어요");
    return false;
  }
};

const saveFavories = (favoriteArr) => {
  localStorage.setItem(FAVORITES, JSON.stringify(favoriteArr));
  console.log("저장완료!");
};

document.addEventListener("click", (event) => {
  // click btn 찾음
  if (event.target && event.target.id === "like") {
    console.log(event.target.childNodes.item(0).data);
    let title = event.target.parentNode.childNodes.item(0).data;
    if (isMovieInFavorites(favoriteArr, id)) {
      // 영화 없는 경우
      let movie = {
        title,
        id,
        type,
      };
      favoriteArr.push(movie);
      event.target.childNodes.item(0).data = "❤️";
      saveFavories(favoriteArr);
    } else {
      // 영화 있는 경우
      favoriteArr = favoriteArr.filter((movie) => movie.id !== id);
      event.target.childNodes.item(0).data = "💔";
      saveFavories(favoriteArr);
    }
  }
});
