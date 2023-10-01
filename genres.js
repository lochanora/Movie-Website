
const API_KEY = 'api_key=604160ab77d3cad0d21843a9b1357115'
const BASE_URL = 'https://api.themoviedb.org/3/'
const API_URL = BASE_URL + '/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&' + API_KEY
const IMG_URL = 'https://image.tmdb.org/t/p/w500'
const searchURL = BASE_URL + '/search/movie?' + API_KEY

//initializing the genres that will be used to filter the movies
const genres = [
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }
]
//getting all the elements by their id
const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
const tagsEl = document.getElementById('tags')
const prev = document.getElementById('prev')
const next = document.getElementById('next')
const current = document.getElementById('current')

//keeping track of the pagination
var currentPage = 1 //
var nextPage = 2
var prevPage = 3
var lastUrl = ''
var totalPages = 100

//new array that will be in charge of keeping track of the selected genres
var selectedGenre = []


setGenre()
//the setGenre function is used to create new tags and add them to the HTML
function setGenre() {
    tagsEl.innerHTML = '' // clearing the tag container to remove any previous tags 

    //For each genre a container will be created and added to the tags container
    genres.forEach(genre => {
        const t = document.createElement('div')
        t.classList.add('tag')
        t.id = genre.id
        t.innerText = genre.name

        t.addEventListener('click', () => { 
            if (selectedGenre.length == 0) { // if there is no genre selected, the current one is pused to the selectedGenre array
                selectedGenre.push(genre.id)
            } else {
                if (selectedGenre.includes(genre.id)) { //if the current genre is already selected, remove it from the selectedGnere array
                    selectedGenre.forEach((id, idx) => {
                        if (id == genre.id) {
                            selectedGenre.splice(idx, 1)
                        }
                    })
                } else { // if no condition applies , push the current genre to the array
                    selectedGenre.push(genre.id)
                }
            }
            console.log(selectedGenre) 
            //Calling the getMovies function with a new API url that contains the previous API url snd the selected genres
            getMovies(API_URL + '&with_genres=' + encodeURI(selectedGenre.join(',')))
            highlightSelection() //calling the highlightSelection to highlight the selected tag
        })
        tagsEl.append(t)
    })
}
//This function creates a clear tag that will clear the selectedGenre once it is clicked
function cleatBtn() {
    let clearBtn = document.getElementById('clear')
    if (clearBtn) {
        clearBtn.classList.add('highlight')
    } else {
        let clear = document.createElement('div')
        clear.classList.add('tag', 'highlight')
        clear.id = 'clear'
        clear.innerText = 'Clear x'

        //once clicked , the click tag will clear the selectedGenre arrayand resets the tags and fetch all movies
        clear.addEventListener('click', () => {
            selectedGenre = []
            setGenre()
            getMovies(API_URL)
        })
        tagsEl.append(clear)
    }

}

//highlightSelection is used to highlight the genre tage/s clicked 
function highlightSelection() {
    const tags = document.querySelectorAll('.tag') //selecting all the tags
    tags.forEach(tag => { //for each tag , the highlight will be removed
        tag.classList.remove('highlight')
    })
    cleatBtn() // calling the clearBtn function
    // if there are selected genres, the highlight should be added back to the selected ones
    if (selectedGenre.length != 0) {
        selectedGenre.forEach(id => {
            const hightlightedTag = document.getElementById(id)
            hightlightedTag.classList.add('highlight')
        })
    }
}


getMovies(API_URL)

 //getMovies function used to get the movies from API
function getMovies(url) {
    lastUrl = url // keeping track of the last url for the pagination
    fetch(url).then(res => res.json()).then(data => { //fetching the data the url 
        console.log(data.results)
        if (data.results.length !== 0) { // if there are movies in the API response they should be shown
            showMovies(data.results)
            //updating the pagination variables
            currentPage = data.page
            nextPage = currentPage + 1
            prevPage = currentPage - 1
            totalPages = data.total_pages
            //updating the diplay of the current page
            current.innerText = currentPage

            // updating the disabled status of the previous and next buttons 
            if (currentPage <= 1) { //if the current page is the first, the previous should be disabled
                prev.classList.add('disabled')
                next.classList.remove('disabled')
            } else if (currentPage >= totalPages) {
                prev.classList.remove('disabled')
                next.classList.add('disabled')
            } else { 
                prev.classList.remove('disabled')
                next.classList.remove('disabled')
            }

        } else { //in case no movies are displayed, show the following message
            main.innerHTML =
                `<h1 class='no-results'>No Results Found</h1>`
        }
        //Always showing the movies, even if there are none for the purpose of cleaning the previous search
        showMovies(data.results)
    })
}

 //showMovies function that will be used to display the movies on the page
function showMovies(data) {
    main.innerHTML = '' //clearing the main element to remove any previous search results

//for each movie in the data , a container will be created containing poster as well as the overview and other elements.
    data.forEach(movie => { 
        const { title, poster_path, vote_average, overview } = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML =
            `<img src="${poster_path ? IMG_URL + poster_path : 'http://via.placeholder.com/1080x1580'}" alt="${title}">
         <div class="movie-info">
           <h3>${title}</h3>
           <span class="${getColor(vote_average)}">${vote_average}</span>
        </div >
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
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

 // event listener for the search submission form
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchTerm = search.value // getting the search term and reseting the selected genre
    selectedGenre = []
    setGenre()

    if (searchTerm) { // if the search term exists, get the movies for it
        getMovies(searchURL + '&query=' + searchTerm)
    } else { //if not, get all movies
        getMovies(API_URL)
    }
})

// pageCall function that updates the page parameter and passes the updated URL to the getMovies function
function pageCall(page) {
    let urlSplit = lastUrl.split('?') //spliting the URL in 2 parts using ? as a seperator 
    //spliting the query parameters into an array of single parameters using & as a seperator
    let queryParams = urlSplit[1].split('&') 
    //taling the last parameter from the array and spliting it into two parts using = as a seperator
    let key = queryParams[queryParams.length - 1].split('=') 
    if (key[0] != 'page') { //if the last parameter isnt a page parameter, then add a new page paramter to the end of the query string
        let url = lastUrl + '&page=' + page
        getMovies(url) //calling the getMovies function with the updtaed URL

    } else { // If the last parameter is already a "page" parameter, update its value 
        key[1] = page.toString()
        //joining the updated paraneter back into a string and replacing the original parameter in the query string
        let a = key.join('=')
        queryParams[queryParams.length - 1] = a
        // join all parameters back into a query string
        let b = queryParams.join('&')
        let url = urlSplit[0] + '?' + b 
        getMovies(url) //calling the getMovies function with the updtaed URL
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
