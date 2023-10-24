
const handleSearchClick = async (event) => {
    event.preventDefault();
    movieList.innerHTML = "";
    let inputVal = searchInput.value;
    try {
      const searched = totalArr.filter((element) => {
        return element.title.toLowerCase().includes(inputVal.toLowerCase());
      });
      paintPage(searched);
    } catch (error) {
      console.error(error);
    }
  };