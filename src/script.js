//to get Date - time for current conditions

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let currentMonth = date.getMonth();
  let currentDay = date.getDay();
  let currentDate = date.getDate();
  let currentHour = date.getHours();
  let currentMinutes = date.getMinutes();

  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  currentMinutes = checkTime(currentMinutes);

    function checkHour(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  currentHour = checkHour(currentHour);

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

//Search for and return city

function showTemperature(response) {
  tempF = response.data.main.temp;
  document.querySelector(".currentTemp").innerHTML = `${(Math.round(tempF))}`;
  document.querySelector(".currentCity").innerHTML = response.data.name;
  document.querySelector(".humidity").innerHTML = `${response.data.main.humidity}% Humidity`;
  document.querySelector(".sky").innerHTML =response.data.weather[0].description;
  document.querySelector(".wind").innerHTML = `${Math.round(response.data.wind.speed)} mph Wind`;
  document.querySelector("#current-time p").innerHTML = `Last updated: ${formatDate(response.data.dt*1000)} for`;
  icon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
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
  tempF = response.data.main.temp;
  document.querySelector(".currentTemp").innerHTML = `${Math.round(tempF)}`;
  document.querySelector(".currentCity").innerHTML = `${response.data.name}`;
  document.querySelector(".humidity").innerHTML = `${response.data.main.humidity}% Humidity`;
  document.querySelector(".sky").innerHTML=response.data.weather[0].description;
  document.querySelector(".wind").innerHTML = `${Math.round(response.data.wind.speed)} mph Wind`;
  icon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}  
axios.get(apiUrl2).then(showTemperature2);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
//switch from F to C links
function displayCelsiusTemperature(event) {
  event.preventDefault()
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let tempC = (tempF-32) / 1.8;
  console.log(tempC);
  document.querySelector(".currentTemp").innerHTML = Math.round(tempC);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault()
  console.log(tempF);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  document.querySelector(".currentTemp").innerHTML = Math.round(tempF);
} 

let tempF=null;

let locate = document.querySelector("#currentlocation");
locate.addEventListener("click", getCurrentPosition);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchCity("New York");

