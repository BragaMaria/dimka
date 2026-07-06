let button = document.querySelector(".search__button");
let input = document.querySelector(".search__input");
let searchDisplay = document.querySelector(".search__display");
let buttontime = document.querySelector('.time_block');
let buttonweather = document.querySelector('.weather_block');
let block_time = document.querySelector('.time1');
let block_weather = document.querySelector('.weather1');

// Переменная для хранения текущей временной зоны города
let currentCityTimezone = null;

// Переключатели между блоками
buttontime.addEventListener('click', (e) => {
    block_time.classList.remove('hidden');
    block_weather.classList.add('hidden');
});

buttonweather.addEventListener('click', (e) => {
    block_time.classList.add('hidden');
    block_weather.classList.remove('hidden');
});

// Обработчик для кнопки поиска в блоке погоды
document.querySelector('.weather1 .search__button').addEventListener("click", () => {
    let weatherInput = document.querySelector('.weather1 .search__input');
    let weatherDisplay = document.querySelector('.weather1 .search__display');
    weatherDisplay.innerHTML = "";
    
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${weatherInput.value}&units=metric&appid=03a094de2fbed757402784c8ab602833`
    )
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        displayWeatherData(data, weatherDisplay);
    })
    .catch((error) => {
        console.log(error);
    });
});

// Обработчик для кнопки поиска в блоке времени
document.querySelector('.time1 .search__button').addEventListener("click", () => {
    let timeInput = document.querySelector('.time1 .search__input');
    let timeDisplay = document.querySelector('.time1 .search__display');
    timeDisplay.innerHTML = "";
    
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${timeInput.value}&units=metric&appid=03a094de2fbed757402784c8ab602833`
    )
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // Сохраняем временную зону города
        currentCityTimezone = data.timezone;
        // Обновляем фон сразу после получения данных
        updateBackgroundForCity();
        displayTimeData(data, timeDisplay);
    })
    .catch((error) => {
        console.log(error);
    });
});

// Функция для отображения погоды
function displayWeatherData(weather, displayElement) {
    console.log(weather);
    
    let block = document.createElement("div");
    block.className = "block";
    block.innerHTML = `
        <div class="city">${weather.name}, ${weather.sys.country}</div>
        <div class="temp">${Math.round(weather.main.temp)}℃</div>
        <div class="weather">${weather.weather[0].description}</div>
        <div class="humidity">Влажность: ${weather.main.humidity}%</div>
        <div class="wind">Ветер: ${weather.wind.speed} м/с</div>
    `;

    displayElement.appendChild(block);
}

// Функция для отображения времени
function displayTimeData(weather, displayElement) {
    console.log(weather);
    
    let cityTime = getCityTime(weather.timezone);
    
    let block = document.createElement("div");
    block.className = "block";
    block.innerHTML = `
        <div class="city">${weather.name}, ${weather.sys.country}</div>
        <div class="date">${cityTime.date}</div>
        <div class="time">${cityTime.time}</div>
        <div class="timezone">UTC${weather.timezone >= 0 ? '+' : ''}${weather.timezone / 3600}</div>
    `;

    displayElement.appendChild(block);
}

function getCityTime(timezoneOffset) {
    const now = new Date();
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    const cityTime = new Date(utcTime + (timezoneOffset * 1000));
    
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };
    
    const timeOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    };
    
    return {
        date: cityTime.toLocaleDateString("en-US", options),
        time: cityTime.toLocaleTimeString("en-US", timeOptions)
    };
}

// Функция для получения текущего времени в городе
function getCityCurrentTime() {
    if (currentCityTimezone === null) {
        // Если город не выбран, используем локальное время
        return new Date();
    }
    
    const now = new Date();
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    return new Date(utcTime + (currentCityTimezone * 1000));
}

// Функция для обновления фона в зависимости от времени в городе
function updateBackgroundForCity() {
    const cityTime = getCityCurrentTime();
    const hours = cityTime.getHours();
    const body = document.body;
    
    // С 20:00 до 8:00 - темный фон, иначе - светлый
    if (hours >= 20 || hours < 8) {
        body.style.backgroundImage = 'url("./fon2.png")';
    } else {
        body.style.backgroundImage = 'url("./fon.jpg")';
    }
}

// Обновляем фон каждую секунду (для точного отображения)
setInterval(updateBackgroundForCity, 1000);

// Также обновляем фон при загрузке страницы (если город уже был выбран)
// Но так как изначально город не выбран, используем локальное время
updateBackgroundForCity();