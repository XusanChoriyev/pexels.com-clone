//563492ad6f91700001000001e288c68e2d0e4b5b9c8b0a690f4087cc
//Selectors
const auth = "563492ad6f91700001000001e288c68e2d0e4b5b9c8b0a690f4087cc";
const galary = document.querySelector(".galary");
const form = document.querySelector(".search-form");
const searchInput = document.querySelector(".search-input");

let fetchLink;
let searchValue;
let page = 1;
const more = document.querySelector(".more");
let currentSearch;

//Eventlisteners
searchInput.addEventListener("input", updatedInput);
form.addEventListener("click", (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
});

more.addEventListener("click", loadMore);


function updatedInput(e) {
  searchValue = e.target.value;
}

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization:auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

//generated pictures
function generatedPictures(data) {
  data.photos.forEach((photo) => {
    const galaryImg = document.createElement("div");
    galaryImg.classList.add("galary-img");
    galaryImg.innerHTML = `
        <div class="galary-info">
            <p>${photo.photographer}</p>
            <a href="${photo.src.large}" target="_blank">Download</a>
        </div>
        <img src="${photo.src.large}"></img>
    `;
    galary.appendChild(galaryImg);
  });
}

//cruated function
async function cruatedPhotos() {
  fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
  const data = await fetchApi(fetchLink);
  generatedPictures(data);
}
cruatedPhotos();

function clear() {
  galary.innerHTML = "";
  searchInput.innerHTML = "";
}

async function searchPhotos(query) {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;
  const data = await fetchApi(fetchLink);
  generatedPictures(data);
}

//Load More
async function loadMore() {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  generatedPictures(data);
}
