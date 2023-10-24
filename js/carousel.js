const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper i");
// const firstCardWidth = carousel.querySelector(".card").offsetWidth; hard coding 지양..
const firstCardWidth = 280;
const carouselChildrens = [...carousel.children];
const idBtn = document.querySelector(".idBtn");

let isDragging = false;
let startX;
let startScrollLeft;

// Add event listner for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
  });
});

const startDrag = (e) => {
  if (!isDragging) {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
  } else {
    isDragging = false;
    carousel.classList.add("dragging");
  }
};

const infiniteScroll = () => {
  // If the carousel is at the beginning, scroll to the end
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
  // If the carousel is at the end, scroll to the beginning
  else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
};

carousel.addEventListener("mousedown", startDrag);
carousel.addEventListener("scroll", infiniteScroll);
