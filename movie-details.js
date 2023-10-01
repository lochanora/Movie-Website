const API_KEY = 'api_key=604160ab77d3cad0d21843a9b1357115'
const BASE_URL = 'https://api.themoviedb.org/3/'
const IMG_URL = 'https://image.tmdb.org/t/p/w500'

const movieDetails = document.getElementById('movie-details')
const reviewForm = document.getElementById('review-form')

//creating a new URLSearchParams object that can be used to easily access and manipulate the query parameters.
const urlParams = new URLSearchParams(window.location.search)
//getting the movieID from the URL query string and naming it movieID
const movieId = urlParams.get('id')

// if a movie ID exists in the query string, fetch the movie details from the API and show them on the page
if (movieId) {
  fetch(`${BASE_URL}movie/${movieId}?${API_KEY}`)
    .then(response => response.json())
    .then(movie => {
      movieDetails.innerHTML = `
        <h2>${movie.title}</h2>
        <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
        <p>${movie.overview}</p>
        <p>Rating: ${movie.vote_average}</p> `
      localStorage.setItem(`title_${movieId}`, movie.title)
    })
    .catch(error => console.error(error)) //handling any errors that may happen during API request
}
//Once the review form is submitted, the review will be stored in local storage and  the user will be redirected to the review page
reviewForm.addEventListener('submit', event => {
  event.preventDefault()
  const reviewInput = document.getElementById('review')
  const review = reviewInput.value
  localStorage.setItem(`review_${movieId}`, review)
  localStorage.setItem(`title_${movieId}`, movieDetails.querySelector('h2').textContent)
  reviewInput.value = ''
  window.location.href = `reviews.html`
})