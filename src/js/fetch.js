import NewsApiService from './apiService';
import imgCardTpl from '../templates/photo-card.hbs';

const galleryRef = document.querySelector('.gallery');
const seachFormRef = document.querySelector('#search-form');
const btnLoadMoreRef = document.querySelector('.btn-load-more');
const newsApiService = new NewsApiService();

seachFormRef.addEventListener('submit', onSearch);
btnLoadMoreRef.addEventListener('click', onLoadMore);

function onSearch(event) {
  event.preventDefault();
  newsApiService.query = event.currentTarget.elements.query.value;
  newsApiService.resetPage();
  newsApiService
    .fetchArticles()
    .then(hits => {
      const markup = imgCardTpl(hits);
      galleryRef.innerHTML = markup;
    })
    .catch(error => {
      console.log(error);
    });
}
function onLoadMore() {
  newsApiService
    .fetchArticles()
    .then(hits => {
      const markup = imgCardTpl(hits);
      galleryRef.insertAdjacentHTML('beforeend', markup);
      scrollToNewElements();
    })
    .catch(error => {
      console.log(error);
    });
}

function scrollToNewElements() {
  const totalScrollHeight = window.innerHeight - 57;
  console.log(totalScrollHeight);
  setTimeout(() => {
    window.scrollBy({
      top: totalScrollHeight,
      behavior: 'smooth',
    });
  }, 500);
}
