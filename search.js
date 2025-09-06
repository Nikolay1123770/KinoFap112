async function searchContent() {
    const searchInput = document.getElementById("searchInput").value;
    const resultsContainer = document.getElementById("searchResults");

    if (!searchInput) {
        alert("Пожалуйста, введите название фильма");
        return;
    }

    resultsContainer.innerHTML = 'Загрузка...';

    try {
        const response = await fetch(\`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=\${encodeURIComponent(searchInput)}&page=1\`, {
            headers: {
                'X-API-KEY': '960dc4e3-9eae-4072-8f0c-98a5ed6c0d2a',
            }
        });
        const data = await response.json();
        const films = data.films;

        if (films.length === 0) {
            resultsContainer.innerHTML = 'Нет результатов';
        } else {
            let html = '';
            films.forEach(film => {
                html += \`
                    <div class="film-item" onclick="window.location.href='movie.html?id=\${film.filmId}'">
                        <img src="\${film.posterUrlPreview}" alt="\${film.nameRu}">
                        <div class="film-info">
                            <h3>\${film.nameRu}</h3>
                            <p>\${film.year}</p>
                        </div>
                    </div>
                \`;
            });
            resultsContainer.innerHTML = html;
        }
    } catch (error) {
        resultsContainer.innerHTML = 'Ошибка при поиске.';
    }
}