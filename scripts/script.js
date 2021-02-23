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


// função de pesquisar um paises através do input
const searchInput = document.querySelector('.search-input');

async function searchCountrie(){
   if(searchInput.value.length > 1) {
    sectionCountries.innerHTML = "";
    sectionCountries.classList.add('active');
       const searchFetch = await fetch(`https://restcountries.eu/rest/v2/name/${searchInput.value}`);
       const searchJson = await searchFetch.json();
       createdDiv(searchJson[0]);
   } else if(searchInput.value.length <= 0){
    sectionCountries.innerHTML = "";
    sectionCountries.classList.remove('active');
    getCountriesAll(urlAll);
   }
}

searchInput.addEventListener('change', searchCountrie);
