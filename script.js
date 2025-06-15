document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'a0c030e8b04ff573f429953165ed97d9'; // Replace with your OpenWeatherMap API key
    const weatherBtn = document.getElementById('get-weather-btn');
    
    weatherBtn.addEventListener('click', getWeather);
    
    function getWeather() {
        const city = document.getElementById('city-input').value.trim();
        const errorElement = document.getElementById('error-message');
        
        if (!city) {
            errorElement.textContent = 'Please enter a city name';
            return;
        }
        
        errorElement.textContent = '';
        
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found');
                }
                return response.json();
            })
            .then(data => {
                displayWeather(data);
            })
            .catch(error => {
                errorElement.textContent = error.message;
                document.getElementById('weather-info').style.display = 'none';
            });
    }
    
    function displayWeather(data) {
        const weatherInfo = document.getElementById('weather-info');
        const iconCode = data.weather[0].icon;
        
        document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`;
        document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        document.getElementById('temperature').textContent = `Temperature: ${Math.round(data.main.temp)}°C`;
        document.getElementById('weather-description').textContent = `Weather: ${data.weather[0].description}`;
        document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
        document.getElementById('wind-speed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
        
        weatherInfo.style.display = 'block';
    }
});