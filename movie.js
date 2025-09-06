const urlParams = new URLSearchParams(window.location.search);
const filmId = urlParams.get('id');

async function fetchFilmDetails() {
    const response = await fetch(\`https://kinopoiskapiunofficial.tech/api/v2.2/films/\${filmId}\`, {
        headers: {
            'X-API-KEY': '960dc4e3-9eae-4072-8f0c-98a5ed6c0d2a',
        }
    });

    const data = await response.json();
    const film = data.film;

    const movieDetails = document.getElementById("movieDetails");
    movieDetails.innerHTML = \`
        <img src="\${film.posterUrl}" alt="\${film.nameRu}">
        <h2>\${film.nameRu}</h2>
        <p><strong>Год:</strong> \${film.year}</p>
        <p><strong>Рейтинг:</strong> \${film.ratingKinopoisk}</p>
        <p><strong>Описание:</strong> \${film.description}</p>
    \`;
}

fetchFilmDetails();