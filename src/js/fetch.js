// import imgCardTpl from '../templates/photo-card.hbs';

// const galleryRef = document.querySelector('.gallery');
// const page = 1;
// const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=1&per_page=12`;
// const option = {
//   headers: {
//     authorization: '20762651-8afef8984095b4948176f683e',
//   },
// };

// export default function fetchImgCard(searchQuery) {
//   fetch(url, option)
//     .then(response => {
//       return response.json();
//     })
//     .then(imgCard => {
//       const markup = imgCardTpl(imgCard);
//       galleryRef.innerHTML = markup;
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }
import debounce from 'lodash.debounce';
import NewsApiService from './apiService';
import imgCardTpl from '../templates/photo-card.hbs';

const galleryRef = document.querySelector('.gallery');
const inputRef = document.querySelector('#search-form input[name=query]');
const buttonRef = document.querySelector('.btn-load-more');
const newsApiService = new NewsApiService();

inputRef.addEventListener('input', debounce(onSearch, 1000));
buttonRef.addEventListener('click', onLoadMore);
// const options = {
//   headers: {
//     Authorization: '20762651-8afef8984095b4948176f683e',
//   },
// };
//key=20762651-8afef8984095b4948176f683e

function onSearch(event) {
  event.preventDefault();
  newsApiService.query = event.target.value;
  newsApiService.resetPage();
  newsApiService.fetchArticles().then(hits => {
    const markup = imgCardTpl(hits);
    galleryRef.innerHTML = markup;
  });

  //fetchImgCard(searchQuery);
}
function onLoadMore() {
  newsApiService.fetchArticles().then(hits => {
    const markup = imgCardTpl(hits);
    galleryRef.insertAdjacentHTML('beforeend', markup);
    window.scrollBy(0, window.innerHeight);
  });
  //fetchImgCard(searchQuery);
}
