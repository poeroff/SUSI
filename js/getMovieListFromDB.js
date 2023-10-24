

export async function getMovieListFromDB() {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOTIwODAzOWU5MmQ3MTAzMGE4Yzc3NWYzY2M5NTcwZSIsInN1YiI6IjY1MmYzMzJjMGNiMzM1MTZmZWM5Y2IxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1CikEcFIiKNs6E-gxClYCOhIjhOblDVhaixt2Iv1n28",
        },
    };

    let totalArr = [];
    try {
        const res = await fetch(
            "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
            options
        );
        const json = await res.json();
        const { results } = json;
        totalArr = results;
    } catch (error) {
        console.error(error);
    }
    return totalArr
   
};