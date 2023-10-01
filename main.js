const API_KEY = 'api_key=604160ab77d3cad0d21843a9b1357115'
const BASE_URL = 'https://api.themoviedb.org/3/'
const API_URL = BASE_URL + 'discover/movie?sort_by=vote_average.desc&vote_count.gte=10000&' + API_KEY
const IMG_URL = 'https://image.tmdb.org/t/p/w500'

// making an API request to retrieve the top 5 movies
fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    const movieList = document.getElementById('movie-list')
    //slice is used here to extract the top 5 and return a new array with them
    const movies = data.results.slice(0, 5) //getting the top 5 movies from the API response

// iterating over the movies array
//and for each movie, a link is created that contains inside it the poster of each movie and its title as the alt
//the link directs to the movie details page when clicked
    movies.forEach(movie => {
      const movieElement = document.createElement('a')
      movieElement.className = 'movie'
      movieElement.href = `movie-details.html?id=${movie.id}`
      movieElement.innerHTML = `<img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">`
      movieList.appendChild(movieElement)
    })
  })
  .catch(error => console.error(error)) //handling any errors that may happen during API request
