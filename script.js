//Date + Time
function displayDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let IndexDay = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[IndexDay];
  return `${day} ${hours}:${minutes}`;
}

let timeNow = document.querySelector("#current-time");
let currentTime = new Date();

timeNow.innerHTML = displayDate(currentTime);

//API weather map
function displayWeather(response) {
  document.querySelector("#city").innerHTML = document.querySelector(
    "#input-location"
  ).value;
  document.querySelector("#temp-element").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function citySearch(city) {
  let apiKey = "d59d21823b0a48106ca99bf9e0c71303";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function citySubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  let cityInput = document.querySelector("#input-location");
  city.innerHTML = cityInput.value;
  citySearch(cityInput.value);
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "d59d21823b0a48106ca99bf9e0c71303";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", citySubmit);

let currentButton = document.querySelector("#location-button");
currentButton.addEventListener("click", getCurrentLocation);

//Temperature Convertion
function displayCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp-element");
  tempElement.innerHTML = Math.round(tempCelsius);
}

let tempCelsius = document.querySelector("#temperature");

function convertFahrenheit(event) {
  event.preventDefault();
  let tempFahrenheit = (tempCelsius * 9) / 5 + 32;
  let tempElement = document.querySelector("#temp-element");
  tempElement.innerHTML = Math.round(tempFahrenheit);
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertFahrenheit);

// landing page city
citySearch("Madrid");
