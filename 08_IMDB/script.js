const apiKey = 'https://developer.imdb.com/';

function searchMovies() {
const searchQuery = document.querySelector('input[type="text"]').value;
const url = `https://imdb-api.com/es/API/SearchMovie/${apiKey}/${searchQuery}`;


fetch(url)
.then(response => response.json())
.then(data => {
    const moviesList = document.querySelector('.movies-list');
    moviesList.innerHTML = '';
    data.results.forEach(movie => {
    const movieListItem = document.createElement('li');
    movieListItem.innerHTML = `
        <img class="movie-poster" src="${movie.image}">
        <div>
        <span class="movie-title">${movie.title}</span>
        <span class="movie-year">(${movie.year})</span>
        <span class="movie-rating">${movie.imDbRating}/10</span>
        </div>
    `;
    movieListItem.addEventListener('click', () => {
        showMovieDetails(movie.id);
    });
    moviesList.appendChild(movieListItem);
    });
})
.catch(error => console.error(error));
}

function showMovieDetails(movieId) {
const url = `https://imdb-api.com/es/API/Title/${apiKey}/${movieId}`;

fetch(url)
.then(response => response.json())
.then(data => {
    const movieDetails = document.querySelector('.movie-details');
    movieDetails.innerHTML = `
    <h3>${data.title} (${data.year})</h3>
    <img src="${data.image}">
    <p>${data.plot}</p>
    <p><strong>Director:</strong> ${data.directors}</p>
    <p><strong>Reparto:</strong> ${data.stars}</p>
    <p><strong>Género:</strong> ${data.genres}</p>
    <p><strong>Calificación:</strong> ${data.imDbRating}/10 (${data.imDbRatingCount} votos)</p>
    `;
})
.catch(error => console.error(error));
}

function filterMoviesByRating() {
const ratingFilter = document.querySelector('#rating-filter').value;
const moviesList = document.querySelectorAll('.movies-list li');

moviesList.forEach(movieListItem => {
const movieRating = movieListItem.querySelector('.movie-rating').textContent;
if (movieRating < ratingFilter) {
    movieListItem.style.display = 'none';
} else {
    movieListItem.style.display = 'flex';
}
});

const ratingValue = document.querySelector('#rating-value');
ratingValue.textContent = ratingFilter;
}
