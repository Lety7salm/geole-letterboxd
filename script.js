const apiKey = '11aefd7d'
const movieList = document.getElementById('movie-list')
const searchInput = document.getElementById('search-input')
const searchButton = document.getElementById('search-button')


async function fetchMovies(query) {
  try {
    const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`)
    const data = await response.json()
    
    if (data.Response === "True") {
      displayMovies(data.Search)
    } else {
      movieList.innerHTML = '<p>Nenhum título encontrado.</p>'
    }
  } catch (error) {
    console.error('Erro ao buscar filmes:', error)
    movieList.innerHTML = '<p>Erro ao carregar os títulos.</p>'
  }
}

function displayMovies(movies) {
  movieList.innerHTML = ''
  
  movies.forEach(movie => {
    const movieCard = document.createElement('div')
    movieCard.classList.add('movie-card')
    
    const movieImage = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/250x375?text=Imagem+Indisponível'
    movieCard.innerHTML = `
      <img src="${movieImage}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
      
    `
    
    movieList.appendChild(movieCard)
  })
}

searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim()
  if (query) {
    fetchMovies(query)
  } else {
    movieList.innerHTML = '<p>Por favor, insira um título para buscar.</p>'
  }
})
  


