const currentTemp = document.querySelector("#current-temp");
const weatherDesc = document.querySelector("#weather-desc");
const forecastContainer = document.querySelector("#forecast");

const API_KEY = "dbf07758f569b4d51790b7604d8ca164";
const lat = 6.5244;
const lon = 3.3792;

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

const displayCurrentWeather = (data) => {
  currentTemp.textContent = `${Math.round(data.main.temp)}°C`;
  weatherDesc.textContent = data.weather[0].description;
};

const displayForecast = (data) => {
  forecastContainer.innerHTML = "";

  const dailyForecasts = data.list.filter((item) =>
    item.dt_txt.includes("12:00:00")
  ).slice(0, 3);

  dailyForecasts.forEach((day) => {
    const date = new Date(day.dt_txt);
    const forecastItem = document.createElement("p");

    forecastItem.textContent = `${date.toLocaleDateString("en-US", {
      weekday: "long"
    })}: ${Math.round(day.main.temp)}°C`;

    forecastContainer.appendChild(forecastItem);
  });
};

const getWeather = async () => {
  try {
    const currentResponse = await fetch(currentWeatherUrl);
    const forecastResponse = await fetch(forecastUrl);

    if (!currentResponse.ok || !forecastResponse.ok) {
      throw new Error("Weather data could not be loaded.");
    }

    const currentData = await currentResponse.json();
    const forecastData = await forecastResponse.json();

    displayCurrentWeather(currentData);
    displayForecast(forecastData);
  } catch (error) {
    currentTemp.textContent = "Unavailable";
    weatherDesc.textContent = "Weather data unavailable.";
    forecastContainer.innerHTML = "<p>Forecast unavailable.</p>";
    console.error(error);
  }
};

getWeather();