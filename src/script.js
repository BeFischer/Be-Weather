//to get Date - time for current conditions

function formatDate() {
  let currentMonth = now.getMonth();
  console.log(currentMonth);
  let currentDay = now.getDay();
  console.log(currentDay);
  let currentDate = now.getDate();
  console.log(currentDate);
  let currentHour = now.getHours();
  console.log(currentHour);
  let currentMinutes = now.getMinutes();

  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  currentMinutes = checkTime(currentMinutes);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  let formattedDate = `${days[currentDay]}, ${months[currentMonth]} ${currentDate} ${currentHour}:${currentMinutes}`;

  return formattedDate;
}

let now = new Date();
let currentTime = formatDate(now);

let setTime = document.querySelector("#current-time p");
setTime.innerHTML = `Weather conditions on ${currentTime} for`;

//Search for and return city

function showTemperature(response) {
  document.querySelector(".currentTemp").innerHTML = `${(Math.round(response.data.main.temp))}°F`;
  document.querySelector(".currentCity").innerHTML = response.data.name;
  document.querySelector(".humidity").innerHTML = `${response.data.main.humidity}% Humidity`;
  document.querySelector(".sky").innerHTML =response.data.weather[0].description;
  document.querySelector(".wind").innerHTML = `Winds at ${Math.round(response.data.wind.speed)} mph`;
}

function searchCity(city) {
  let apiKey = "cfeef4d0b0e86d888145aca4caf511b0";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function city(event) {
  event.preventDefault();
  let cityStateInput = document.querySelector("#location");

  let apiKey = "cfeef4d0b0e86d888145aca4caf511b0";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityStateInput.value}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

document.querySelector("form.byCity").addEventListener("submit", city);

//current Location

function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let units2 = "imperial";
  let apiKey2 = "cfeef4d0b0e86d888145aca4caf511b0";

  let apiUrl2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey2}&units=${units2}`;

  function showTemperature2(response) {
  document.querySelector(".currentTemp").innerHTML = `${Math.round(response.data.main.temp)}°F`;
  document.querySelector(".currentCity").innerHTML = `${response.data.name}`;
  document.querySelector(".humidity").innerHTML = `${response.data.main.humidity}% Humidity`;
  document.querySelector(".sky").innerHTML=response.data.weather[0].description;
  document.querySelector(".wind").innerHTML = `Winds at ${Math.round(response.data.wind.speed)} mph`;
  }
  axios.get(apiUrl2).then(showTemperature2);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

document.querySelector("#currentlocation").addEventListener("click", getCurrentPosition);

searchCity("New York");


