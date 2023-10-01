for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key.includes('review_')) {
        const movieId = key.split('_')[1]
        const movieTitle = localStorage.getItem(`title_${movieId}`)
        const reviewList = document.getElementById('review-list')
        const reviewElement = document.createElement('li')
        reviewElement.textContent = `${localStorage.getItem(key)} (Movie Title: ${movieTitle})`
        reviewList.appendChild(reviewElement)
      }
    } 