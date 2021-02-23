const sectionCountries = document.querySelector('.countries');

async function getCountriesAll(url) {
    const responseFetch = await fetch(url);
    const fetchJson = await responseFetch.json();
    for(i=0; i <= 7; i++) {
        createdDiv(fetchJson[i])
    }
}

function createdDiv(countrie) {
    const div = document.createElement('div');
    div.innerHTML = innerHtmlCountrie(countrie);
    sectionCountries.appendChild(div);
}

function innerHtmlCountrie(countrie) {
    const html = `
    <div class="image-container">
        <img src="${countrie.flag}">
    </div>
    <div class="countrie-information">
        <h1>${countrie.name}</h1>
        <h2>Population: <p>${countrie.population}</p></h2>
        <h2>Region: <p>${countrie.region}</p></h2>
        <h2>Capital: <p>${countrie.capital} </p></h2>
    </div>
    `;
    return html;
}

const urlAll = 'https://restcountries.eu/rest/v2/all';
getCountriesAll(urlAll);

function cleanInnerHtml() {
    sectionCountries.innerHTML = "";
}
// pegar país através do nome no input
const searchInput = document.querySelector('.search-input');
async function searchCountrie(){
   if(searchInput.value.length > 1) {
    cleanInnerHtml();
    sectionCountries.classList.add('active');
       const searchFetch = await fetch(`https://restcountries.eu/rest/v2/name/${searchInput.value}`);
       const searchJson = await searchFetch.json();
       createdDiv(searchJson[0]);
   } else if(searchInput.value.length <= 0){
    cleanInnerHtml();
    sectionCountries.classList.remove('active');
    getCountriesAll(urlAll);
   }
}
searchInput.addEventListener('change', searchCountrie);

// filtrar paises por região
const selectRegion = document.querySelector('select');

async function filterRegion(event) {
    if(event.target.value.length > 0) {
    sectionCountries.classList.remove('active');
    const regionFetch = await fetch(`https://restcountries.eu/rest/v2/region/${event.target.value}`)
    const regionJson = await regionFetch.json();
    cleanInnerHtml();
    regionJson.forEach(countrie => {
        createdDiv(countrie);
    })
    } else if(event.target.value === "") {
        cleanInnerHtml();
        getCountriesAll(urlAll);
    }
}
selectRegion.addEventListener('change',filterRegion)