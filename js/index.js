// Days and month names for display
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthNames = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

// Function to display weather data
function displayWeather(location, currentWeather, forecastDays) {
  const currentDate = new Date(currentWeather.last_updated.replace(" ", "T"));
  
  // HTML for today's weather
  const weatherHtml = `
    <div class="col-md-4">
      <div class="weather-today">
        <div class="header">
          <div class="day">${days[currentDate.getDay()]}</div>
          <div class="date">${currentDate.getDate()} ${monthNames[currentDate.getMonth()]}</div>
        </div>
        <div class="weather-content">
          <div class="location">${location.name}</div>
          <div class="degree">
            <div class="num">${currentWeather.temp_c}<sup>o</sup>C</div>
            <div class="icon">
              <img src="https:${currentWeather.condition.icon}" alt="Weather Icon" width="90">
            </div>
          </div>
          <div class="custom">${currentWeather.condition.text}</div>
          <span><img src="images/icon-umberella.png" alt="" width="21" height="21">20%</span>
          <span><img src="images/icon-wind.png" alt="" width="23" height="21">${currentWeather.wind_kph} km/h</span>
          <span><img src="images/icon-compass.png" alt="" width="21" height="21">${currentWeather.wind_dir}</span>
        </div>
      </div>
    </div>`;

  // HTML for forecast days
  let forecastHtml = "";
  for (let i = 1; i < forecastDays.length; i++) {
    const date = new Date(forecastDays[i].date);
    forecastHtml += `
      <div class="col-md-4">
      <div class="weather">
          <div class="header">
            <div class="day">${days[date.getDay()]}</div>
            <div class="date">${date.getDate()} ${monthNames[date.getMonth()]}</div>
          </div>
          <div class="weather-content">
            <div class="icon">
              <img src="https:${forecastDays[i].day.condition.icon}" width="48" alt="Weather Icon">
            </div>
            <div class="degree">
              ${forecastDays[i].day.maxtemp_c}<sup>o</sup>C
            </div>
            <small>${forecastDays[i].day.mintemp_c}<sup>o</sup>C</small>
            <div class="custom">${forecastDays[i].day.condition.text}</div>
          </div>
        </div>
      </div>`;
  }

  // Inject HTML into the weather container
  document.getElementById("weather").innerHTML = weatherHtml + forecastHtml;
}

// Function to fetch weather data
async function fetchWeather(city) {
  const apiKey = "8643846741d3464b913182511241212"; 
  const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Network response was not ok");
    
    const data = await response.json();
    displayWeather(data.location, data.current, data.forecast.forecastday);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// Event listener for search input
document.getElementById("search").addEventListener("keyup", (event) => {
  const city = event.target.value;
  if (city) {
    fetchWeather(city);
  }
});

// Initial fetch for a default city
fetchWeather("Cairo");
