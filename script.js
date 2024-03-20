
const apiKey = '04b6c21e511d72258ad425ee2d4a6e43'; // Your OpenWeather API key
const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');
const searchHistory = document.getElementById('search-history');
let cities = [];

// Load cities from localStorage
if (localStorage.getItem('cities')) {
  cities = JSON.parse(localStorage.getItem('cities'));
  renderSearchHistory();
}

// Event listener for form submission
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    getWeatherData(city);
    cityInput.value = '';
  }
});

// Function to fetch weather data from API
async function getWeatherData(city) {
  try {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    // Process data and display weather information
    displayWeather(data);
    // Add city to search history
    addToSearchHistory(city);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

// Function to display weather information
function displayWeather(data) {
  const date = new Date(data.dt * 1000); // Convert timestamp to date
  const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`; // Format date
  const temperature = `${data.main.temp}°C`; // Temperature in Celsius
  const windSpeed = `${data.wind.speed} m/s`; // Wind speed
  const humidity = `${data.main.humidity}%`; // Humidity

  const weatherCardHTML = `
    <div class="weather-card">
      <h2>${formattedDate}</h2>
      <p>Temperature: ${temperature}</p>
      <p>Wind: ${windSpeed}</p>
      <p>Humidity: ${humidity}</p>
    </div>
  `;

  weatherInfo.innerHTML = weatherCardHTML;
}

// Function to add city to search history
function addToSearchHistory(city) {
  cities.push(city);
  localStorage.setItem('cities', JSON.stringify(cities));
  renderSearchHistory();
}

// Function to render search history
function renderSearchHistory() {
  searchHistory.innerHTML = '';
  cities.forEach(city => {
    const button = document.createElement('button');
    button.textContent = city;
    button.addEventListener('click', () => {
      getWeatherData(city);
    });
    searchHistory.appendChild(button);
  });
}

