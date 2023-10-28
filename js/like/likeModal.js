let FAVORITES = "favorites";
const likeBtn = document.querySelector(".likeBtn");
const likeBody = document.querySelector(".likeBody");
const deleteBtn = document.querySelector("#deleteBtn");
let favoriteArr = [];

if (localStorage.getItem(FAVORITES) !== null) {
  const parsedFavoriteArr = JSON.parse(localStorage.getItem(FAVORITES));
  favoriteArr = parsedFavoriteArr;
}

const drawModal = (title, id) => {
  const div = document.createElement("div");
  const a = document.createElement("a");
  const button = document.createElement("button");
  div.className = "likeMovieWrapper";
  div.dataset.id = id;
  button.innerText = "❌";
  button.id = "deleteBtn";
  a.href = `./detail-page.html?type=movie&id=${id}`;
  a.innerHTML = `<span class="movie-title">${title}</span>`;
  div.append(a);
  div.appendChild(button);
  likeBody.append(div);
};

const handleLikeBtnClick = () => {
  favoriteArr.forEach((movie) => {
    const { title, id } = movie;
    drawModal(title, id);
  });
};

const handleDelBtnClick = (event) => {
  console.log(event.target);
};

likeBtn.addEventListener("click", handleLikeBtnClick);
document.addEventListener("click", (event) => {
  if (event.target && event.target.id === "deleteBtn") {
    event.target.parentNode.remove();
    id = event.target.parentNode.dataset.id;
    favoriteArr = favoriteArr.filter((movie) => movie.id !== id);
    localStorage.setItem(FAVORITES, JSON.stringify(favoriteArr));
  }
});
