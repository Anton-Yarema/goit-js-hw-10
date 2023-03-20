import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';
import API from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;
let searchQuerry = '';

const refs = {
  searchInput: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.searchInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(searchQuerry) {
  searchQuerry = refs.searchInput.value.trim();
  if (searchQuerry === '') {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    return;
  }
  API.fetchCountries(searchQuerry).then(countries => renderMarkup(countries));
}

function renderMarkup(countries) {
  if (countries.length > 2 && countries.length < 10) {
    renderCountryList(countries);
  } else if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else {
    renderCountryInfo(countries);
  }
}

function renderCountryInfo(countries) {
  refs.countryList.innerHTML = '';
  const infoCard = countries
    .map(
      ({
        name: { official },
        flags: { svg },
        capital,
        population,
        languages,
      }) => {
        const language = Object.values(languages).join(', ');
        return `
       <div class="title-info__country">
       <img  src="${svg}" alt="${official}" width="40px" height="auto"/>
       <h2 class="title-country">${official}</h2>      
      </div>      
      <p class="title-country__item">Capital: <span class="title-country__value">${capital}</span></p>
      <p class="title-country__item">Population: <span class="title-country__value">${population}</span></p>
      <p class="title-country__item">Languages: <span class="title-country__value">${language}</span></p>
    `;
      }
    )
    .join();
  for (const country of countries) {
    refs.countryInfo.innerHTML = infoCard;
  }
}

function renderCountryList(countries) {
  refs.countryInfo.innerHTML = '';
  const listItems = countries
    .map(({ name: { official }, flags: { svg } }) => {
      return `<div class="country-item">
    <img src="${svg}" alt="${official}" width="40px" height="auto"/>
    <span class="country-name">${official}</span></div>`;
    })
    .join('');
  refs.countryList.innerHTML = listItems;
}
