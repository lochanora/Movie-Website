const API_KEY = 'api_key=604160ab77d3cad0d21843a9b1357115'
const BASE_URL = 'https://api.themoviedb.org/3/'
const API_URL = BASE_URL + 'discover/movie?sort_by=vote_average.desc&vote_count.gte=10000&' + API_KEY
const IMG_URL = 'https://image.tmdb.org/t/p/w500'

//getting all the elements by their id
const main = document.getElementById('main')
const prev = document.getElementById('prev')
const next = document.getElementById('next')
const current = document.getElementById('current')

//keeping track of the pagination
let currentPage = 1
let nextPage = 2
let prevPage = 3
let lastUrl = ''
let totalPages = 100

getMovies(API_URL)

 //getMovies function used to get the movies from API
function getMovies(url) {
    lastUrl = url
    fetch(url).then(res => res.json()).then(data => {
        if (data.results.length !== 0) {
            showMovies(data.results)
            currentPage = data.page
            nextPage = currentPage + 1
            prevPage = currentPage - 1
            totalPages = data.total_pages

            current.innerText = currentPage

            if (currentPage <= 1) {
                prev.classList.add('disabled')
                next.classList.remove('disabled')
            } else if (currentPage >= totalPages) {
                prev.classList.remove('disabled')
                next.classList.add('disabled')
            } else {
                prev.classList.remove('disabled')
                next.classList.remove('disabled')
            }
        } else {
            main.innerHTML = `<h1 class='no-results'>No Results Found</h1>`
        }
    })
}
//showMovies function that will be used to display the movies on the page
function showMovies(data) {
    main.innerHTML = ''

    data.forEach(movie => {
        const { id, title, poster_path, vote_average } = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML =
            `<a href="/movie-details.html?id=${id}">
                <img src="${poster_path ? IMG_URL + poster_path : 'http://via.placeholder.com/1080x1580'}" alt="${title}">
            </a>
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>`

        main.appendChild(movieEl)
    })
}
//getColor function that will determine the color of the vote average score
function getColor(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}
// pageCall function that updates the page parameter and passes the updated URL to the getMovies function
function pageCall(page) {
    let urlSplit = lastUrl.split('?')
    let queryParams = urlSplit[1].split('&')
    let key = queryParams[queryParams.length - 1].split('=')
    if (key[0] != 'page') {
        let url = lastUrl + '&page=' + page
        getMovies(url)
    } else {
        key[1] = page.toString()
        let a = key.join('=')
        queryParams[queryParams.length - 1] = a
        let b = queryParams.join('&')
        let url = urlSplit[0] + '?' + b
        getMovies(url)
    }
}
// event listener for the previous page button
prev.addEventListener('click', () => {
    if (prevPage > 0) { // if there is a previous page, move to that page
        pageCall(prevPage)
    }
})
 // event listener for the next page button
next.addEventListener('click', () => {
    if (nextPage <= totalPages) { //if there is a next page, move to that page
        pageCall(nextPage)
    }
})

