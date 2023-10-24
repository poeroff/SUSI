const LIVEBUTTON = document.getElementById("Live_movie")
const COMINGBUTTON = document.getElementById("UPCOMING_movie")
const TOPbtn = document.getElementById("Top_movie");
const Popularbtn = document.getElementById("Popular_movie");

const TopTvbtn = document.getElementById("Top_Tv");
const populartvbtn = document.getElementById("Popular_Tv")

const Livetvbtn = document.getElementById("Live_Tv")
const Comingtvbtn = document.getElementById("UPCOMING_Tv")


Livetvbtn.addEventListener("click", () => {
    document.querySelector(".Live_Tv-list").style.display = "flex";
    document.querySelector(".Upcoming_Tv-list").style.display = "none";

})

Comingtvbtn.addEventListener("click", () => {
    document.querySelector(".Live_Tv-list").style.display = "none";
    document.querySelector(".Upcoming_Tv-list").style.display = "flex";

})


populartvbtn.addEventListener("click", () => {
    document.querySelector(".popular_Tv_list").style.display = "flex";

    document.querySelector(".Tv-list").style.display = "none";

})
TopTvbtn.addEventListener("click", () => {
    document.querySelector(".Tv-list").style.display = "flex";
    document.querySelector(".popular_Tv_list").style.display = "none";

})

TOPbtn.addEventListener("click", () => {
    document.querySelector(".movie-list").style.display = "flex";
    document.querySelector(".popular_movie").style.display = "none";

})

Popularbtn.addEventListener("click", () => {
    document.querySelector(".movie-list").style.display = "none";
    document.querySelector(".popular_movie").style.display = "flex";
})

LIVEBUTTON.addEventListener("click", () => {
    document.querySelector(".Live-Movie").style.display = "flex";
    document.querySelector(".Upcoming-Movie").style.display = "none";

})

COMINGBUTTON.addEventListener("click", () => {
    document.querySelector(".Live-Movie").style.display = "none";
    document.querySelector(".Upcoming-Movie").style.display = "flex";
})