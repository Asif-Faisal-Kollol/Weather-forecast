const apiKey = 'f7d116ba903010904d44e59ee9336dc8';
const city = '  Dhaka';
const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

async function fetchWeatherData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayWeatherData(data) {
    const weatherContainer = document.getElementById('weather-container');
    
    data.list.forEach(item => {
        const weatherCard = document.createElement('div');
        weatherCard.classList.add('weather-card');
        
        const weatherIcon = document.createElement('img');
        weatherIcon.classList.add('weather-icon');
        weatherIcon.src = `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
        
        const weatherDetails = document.createElement('div');
        weatherDetails.classList.add('weather-details');
        weatherDetails.innerHTML = `
            <p>${item.dt_txt}</p>
            <p>${item.main.temp}°C</p>
            <p>${item.weather[0].description}</p>
        `;
        
        weatherCard.appendChild(weatherIcon);
        weatherCard.appendChild(weatherDetails);
        
        weatherContainer.appendChild(weatherCard);
    });
}

async function init() {
    const weatherData = await fetchWeatherData();
    if (weatherData) {
        displayWeatherData(weatherData);
    }
}

init();
