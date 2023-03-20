import Notiflix from 'notiflix';
const BASE_URL = 'https://restcountries.com/v3.1';

function fetchCountries(searchQuerry) {
  return fetch(
    `${BASE_URL}/name/${searchQuerry}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(dataCountry => dataCountry)
    .catch(() =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
}

export default { fetchCountries };
