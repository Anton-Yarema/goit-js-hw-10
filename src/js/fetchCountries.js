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
    .then(dataCountry => {
      if (dataCountry === undefined) {
        Notiflix.Notify.failure('Oops, something went wrong');
        return [];
      }
      return dataCountry;
    })
    .catch(() => {
      Notiflix.Notify.failure('Oops, something went wrong');
      return [];
    });
}


export default { fetchCountries };
