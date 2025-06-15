// HTML Elements
const form = document.getElementById('weatherForm');
const input = document.getElementById('cityInput');
const result = document.getElementById('result');

form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const city = input.value.trim();
    if (!city) {
        result.textContent = 'Please enter a city name.';
        return;
    }
    result.textContent = 'Loading...';

    try {
        const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();
        result.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
        `;
    } catch (err) {
        result.textContent = 'Error: ' + err.message;
    }
});