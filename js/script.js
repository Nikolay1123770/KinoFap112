
// Функция поиска контента
async function searchContent() {
    const searchInput = document.getElementById('searchInput').value.trim();
    const resultsContainer = document.getElementById('searchResults');

    if (!searchInput) {
        alert("Пожалуйста, введите название фильма или сериала");
        return;
    }

    // Замените на свой API URL
    const apiUrl = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${encodeURIComponent(searchInput)}&page=1`;
    
    try {
        const response = await fetch(apiUrl, {
            headers: {
                'X-API-KEY': 'your-api-key',
            }
        });

        if (!response.ok) {
            throw new Error('Ошибка при поиске');
        }

        const data = await response.json();
        displayResults(data.films);
    } catch (error) {
        console.error(error);
        resultsContainer.innerHTML = 'Произошла ошибка при поиске.';
    }
}

function displayResults(films) {
    const resultsContainer = document.getElementById('searchResults');
    if (!films || films.length === 0) {
        resultsContainer.innerHTML = 'Ничего не найдено';
        return;
    }

    let html = '<div class="results-title">Результаты поиска:</div>';
    films.forEach(film => {
        html += `
            <div class="film-item" onclick="selectFilm(${film.filmId}, '${film.nameRu || film.nameEn}')">
                <img src="${film.posterUrlPreview || 'https://via.placeholder.com/100x150'}" alt="${film.nameRu || film.nameEn}">
                <div class="film-info">
                    <div class="film-title">${film.nameRu || film.nameEn}</div>
                    <div class="film-year">${film.year || 'Год неизвестен'}</div>
                    <div class="film-rating">Рейтинг: ${film.rating || 'нет'}</div>
                </div>
            </div>
        `;
    });

    resultsContainer.innerHTML = html;
}

function selectFilm(filmId, filmTitle) {
    // Переход на страницу плеера
    window.location.href = `player.html?filmId=${filmId}&title=${filmTitle}`;
}
