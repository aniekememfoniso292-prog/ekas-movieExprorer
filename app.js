
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const resultsGrid = document.getElementById('results-grid');    

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
        fetchData(query);
    }
});

async function fetchData(query) {
   resultsGrid.innerHTML = '<p class="loading">Loading data...</p>';
   try {
       const response = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`);
       if (!response.ok) {
           throw new Error('Failed to fetch movie data');
       }
       const data = await response.json();
       renderCards(data);
   } catch (error) {
       console.error('Error fetching movie data:', error);
       resultsGrid.innerHTML = '<p class="error">Error fetching movie data.</p>';
       throw error;
   }
}

function renderCards(items) {
   const cardsHTML = items.map(({show})=>{
        const image = show.image ? show.image.medium : 'https://via.placeholder.com/210x295?text=No+Image';
        const genres = show.genres.length 
        ?show.genres.map((genre) => `<span class="genre">${genre}</span>`).join(' ')
        :'<span class="genre">No genres available</span>';
        const summary = show.summary
        ? show.summary 
        : 'No summary available';
        return `
            <div class="movie-card">
                <img src="${image}" alt="${show.name}" />
                <h3>${show.name}</h3>
                <p>${summary}</p>
                <p>${genres}</p>
            </div>
        `;
    }).join('');

    resultsGrid.innerHTML = cardsHTML;
}
