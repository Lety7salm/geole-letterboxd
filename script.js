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

async function fetchMovieDetails(imdbID) {
  try {
    const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`)
    const data = await response.json()
    
    if (data.Response === "True") {
      return {
        runtime: data.Runtime,
        genre: data.Genre,
        plot: data.Plot 
      }
    } else {
      return { runtime: 'N/A', genre: 'N/A', plot: 'Sinopse não disponível' }
    }
  } catch (error) {
    console.error('Erro ao carregar detalhes do filme:', error)
    return { runtime: 'N/A', genre: 'N/A', plot: 'Erro ao carregar sinopse' }
  }
}

function displayMovies(movies) {
  movieList.innerHTML = ''
  
  movies.forEach(async (movie) => {
    const movieCard = document.createElement('div')
    movieCard.classList.add('movie-card')
    
    const movieImage = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/250x375?text=Imagem+Indisponível'

    const { runtime, genre, plot } = await fetchMovieDetails(movie.imdbID)

    movieCard.innerHTML = `
      <img src="${movieImage}" alt="${movie.Title}" class="movie-image">
      <h3>${movie.Title}</h3>
      <p>Ano: ${movie.Year}</p>
      <p><strong>Duração:</strong> ${runtime}</p>
      <p><strong>Gênero:</strong> ${genre}</p>
      <p><strong>Sinopse:</strong> <span class="plot">${plot}</span></p>  <!-- Exibe a sinopse aqui -->
    `
   
    const plotElement = movieCard.querySelector('.plot')
    plotElement.style.display = 'none'

    movieCard.querySelector('.movie-image').addEventListener('click', () => {

      if (plotElement.style.display === 'none') {
        plotElement.style.display = 'block'
      } else {
        plotElement.style.display = 'none'
      }
    })

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

