import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com';

export const fetchPhotosByQuery = (searchedQuery, page) => {
    const requestParams = {
        q: searchedQuery,
        page: page,
        key: "50950053-db3558a1af50bab2399c0c009",
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        per_page: 15,
    };

    return axios.get('/api/', { params: requestParams });
}