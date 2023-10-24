const searchBtn = document.querySelector(".searchBtn");
const searchInput = document.querySelector(".searchInput");

const handleSearchBtnClick = (e) => {
  e.preventDefault();

  if (searchInput.value === "") {
    alert("키워드를 입력해주세요");
    return;
  } else {
    window.location.href = `./movielist.html?keyword=${searchInput.value}`;
  }
};

searchBtn.addEventListener("click", handleSearchBtnClick);
