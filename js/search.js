const searchButton = document.querySelector("#searchBtn");
const searchInput = document.querySelector("#searchInput");

const handleSearchBtnClick = (e) => {
  e.preventDefault();
  if (searchInput.value.trim() === "") {
    alert("키워드를 입력해주세요");
    searchInput.value = "";
    return;
  } else {
    window.location.href = `./search.html?keyword=${searchInput.value}`;
  }
};

searchButton.addEventListener("click", handleSearchBtnClick);
