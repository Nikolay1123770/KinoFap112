
// Функция поиска контента
async function searchContent() {
    const searchInput = document.getElementById('searchInput').value.trim();
    const resultsContainer = document.getElementById('searchResults');

    if (!searchInput) {
        alert("Пожалуйста, введите название фильма или сериала");
        return;
    }

    // Проверка на секретную команду
    if (searchInput === '#112') {
        window.location.href = 'secret.html'; // Перенаправление на секретную страницу
        return;
    }

    // Замените на свой API URL для поиска фильмов
    const apiUrl = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${encodeURIComponent(searchInput)}&page=1`;

    try {
        const response = await fetch(apiUrl, {
            headers: {
                'X-API-KEY': '960dc4e3-9eae-4072-8f0c-98a5ed6c0d2a',
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
    films.slice(0, 5).forEach(film => {
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
    document.getElementById("searchResults").innerHTML = '';
    document.getElementById("searchInput").value = '';
    openPlayer(filmId); // Запуск плеера сразу после выбора фильма
}

function openPlayer(filmId) {
    const iframeSrc = `https://api1690380040.atomics.ws/embed/kp/${filmId}`;
    document.getElementById("playerIframe").src = iframeSrc;
}

function closePlayer() {
    document.getElementById("playerIframe").src = ""; // Очистить iframe при закрытии
}
