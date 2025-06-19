import iziToast from "izitoast";
import SimpleLightbox from "simplelightbox";
import { createGalleryCardTemplate } from "./js/render-functions";
import { fetchPhotosByQuery } from "./js/pixabay-api";

const searchFormEl = document.querySelector(".js-search-form");
const galleryEl = document.querySelector(".js-gallery");
const loaderEl = document.querySelector(".loader");
const loadMoreButton = document.querySelector('.load-more-btn');

let simplelightbox = new SimpleLightbox(".gallery-card a", {
    captionsData: "alt",
    captionDelay: 250,
});

let page = 1;
let inputValue = '';


const onSearchFormSubmit = async (event) => {
    try {
        event.preventDefault();

        inputValue = event.currentTarget.elements.user_query.value.trim();

        if (inputValue === "") {
            iziToast.error({
                message: "Search value should not be empty!",
                position: "topRight",
            });
            return;
        }

        searchFormEl.reset();

        galleryEl.innerHTML = "";
        loadMoreButton.classList.add("is-hidden");
        loaderEl.classList.remove("is-hidden");

        page = 1;

        const response = await fetchPhotosByQuery(inputValue, page);

        loaderEl.classList.add("is-hidden");

        if (response.data.totalHits === 0) {
            iziToast.error({
                message: "Sorry, there are no images matching your search query. Please try again!",
                position: "topRight",
            });
            galleryEl.innerHTML = "";
            searchFormEl.reset();
            return;
        }

        if (response.data.totalHits > 15) {
            loadMoreButton.classList.remove("is-hidden");
            loadMoreButton.addEventListener("click", onLoadMoreButtonClick);
        }

        galleryEl.innerHTML = createGalleryCardTemplate(response.data.hits);
        smoothScroll();
        simplelightbox.refresh();
    } catch (err) {
        iziToast.error({
            message: 'An error occurred. Please try again later.',
            position: 'topRight',
        });
    }
};

searchFormEl.addEventListener("submit", onSearchFormSubmit);

const onLoadMoreButtonClick = async (event) => {
    try {
        loadMoreButton.classList.add("is-hidden");
        loaderEl.classList.remove("is-hidden");

        page++;
        const response = await fetchPhotosByQuery(inputValue, page);

        loaderEl.classList.add("is-hidden");
        loadMoreButton.classList.remove("is-hidden");

        galleryEl.insertAdjacentHTML("beforeend", createGalleryCardTemplate(response.data.hits));
        smoothScroll();
        simplelightbox.refresh();

        if (response.data.totalHits <= page * 15) {
            loadMoreButton.classList.add("is-hidden");
            loadMoreButton.removeEventListener("click", onLoadMoreButtonClick);

            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: "topRight",
            });
        }
    } catch (err) {
        iziToast.error({
            message: 'An error occurred. Please try again later.',
            position: 'topRight',
        });
    }
};

function smoothScroll() {
    const galleryCardEl = document.querySelector(".gallery-card");
    if (!galleryCardEl) return;
    const rect = galleryCardEl.getBoundingClientRect();
    const cardHeight = rect.height;
    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
    });
}
