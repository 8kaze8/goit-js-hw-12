import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const API_KEY = '47185863-23d7cbe33afa61790ac726fc1';
const BASE_URL = 'https://pixabay.com/api/';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('#gallery');
const input = document.querySelector('#search-input');
const loading = document.querySelector('#loading');
const loadMoreContainer = document.querySelector('#load-more-container');
const loadMoreButton = document.querySelector('#load-more');
const endMessage = document.querySelector('#end-message');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;
let lightbox = null;

document.addEventListener('DOMContentLoaded', () => {
  loadMoreContainer.style.display = 'none';
  endMessage.style.display = 'none';

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const query = input.value.trim();

    if (!query) {
      iziToast.error({
        title: 'Error',
        message: 'Please enter a search term',
      });
      return;
    }

    currentPage = 1;
    currentQuery = query;
    gallery.innerHTML = '';
    loadMoreContainer.style.display = 'none';
    endMessage.style.display = 'none';

    await fetchImages();
  });

  loadMoreButton.addEventListener('click', async () => {
    currentPage += 1;
    await fetchImages();
  });

  lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    nav: true,
    loop: true,
  });
});

async function fetchImages() {
  loading.style.display = 'flex';

  try {
    const url = `${BASE_URL}?key=${API_KEY}&q=${currentQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=40`;
    const response = await axios.get(url);
    const data = response.data;

    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'No images found, please try again.',
      });
      loadMoreContainer.style.display = 'none';
      endMessage.style.display = 'none';
      return;
    }

    totalHits = data.totalHits;
    renderImages(data.hits);
    checkEndOfResults();

    if (currentPage === 1) {
      iziToast.success({
        title: 'Success',
        message: `Found ${totalHits} images!`,
      });
    }

    lightbox.refresh();

    if (currentPage > 1) {
      scrollPage();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images, please try again.',
    });
  } finally {
    loading.style.display = 'none';
  }
}

function renderImages(hits) {
  const markup = hits
    .map(
      hit => `
    <div class="image-card">
      <a href="${hit.largeImageURL}" data-lightbox="gallery">
        <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
      </a>
      <div class="image-info">
        <p class="tags">${hit.tags}</p>
        <p><strong>Likes:</strong> ${hit.likes}</p>
        <p><strong>Views:</strong> ${hit.views}</p>
        <p><strong>Comments:</strong> ${hit.comments}</p>
        <p><strong>Downloads:</strong> ${hit.downloads}</p>
      </div>
    </div>
  `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}

function scrollPage() {
  const galleryCard = document.querySelector('.image-card');
  if (galleryCard) {
    const { height } = galleryCard.getBoundingClientRect();
    window.scrollBy({
      top: height * 2,
      behavior: 'smooth',
    });
  }
}

function checkEndOfResults() {
  const totalPages = Math.ceil(totalHits / 40);
  const loadedImages = currentPage * 40;

  if (loadedImages >= totalHits) {
    loadMoreContainer.style.display = 'none';
    endMessage.style.display = 'block';
  } else {
    loadMoreContainer.style.display = 'flex';
    endMessage.style.display = 'none';
  }
}
