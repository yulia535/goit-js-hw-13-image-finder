// import imgCardTpl from '../templates/photo-card.hbs';

// const galleryRef = document.querySelector('.gallery');

// export default function fetchImgCard(searchQuery) {
//   const page = 1;
//   const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${page}&per_page=12&key=20762651-8afef8984095b4948176f683e`;
//   fetch(url)
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
export default class NewApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchArticles() {
    console.log(this);
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=20762651-8afef8984095b4948176f683e`;

    return fetch(url)
      .then(r => r.json())
      .then(data => {
        this.page += 1;
        return data.hits;
        //return data.
      });
  }

  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
