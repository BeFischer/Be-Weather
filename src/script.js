//to get Date - time for current conditions

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let dateofMonth = date.getDate();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
let month = months[date.getMonth()]

return `${day} ${month} ${dateofMonth}`;
}
  function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

//Search for and return city

function showTemperature(response) {
  //let wDirection = response.data.wind.deg;
  //if wDirection 
  console.log(response.data.main.feels_like);
  tempF = response.data.main.temp;
  document.querySelector(".currentTemp").innerHTML = `${(Math.round(tempF))}`;
  document.querySelector(".currentCity").innerHTML = response.data.name;
  document.querySelector(".humidity").innerHTML = `${response.data.main.humidity}% Humidity`;
  document.querySelector("#feelsLike").innerHTML = `${Math.round(response.data.main.feels_like)}`;
  document.querySelector(".sky").innerHTML =response.data.weather[0].description;

  document.querySelector(".wind").innerHTML = `${Math.round(response.data.wind.speed)} mph Wind`;
  document.querySelector("#current-time p").innerHTML = `Last updated: ${formatDate(response.data.dt*1000)} ${formatHours(response.data.dt*1000)} for`;
  icon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 12; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
      <h3>
        ${formatHours(forecast.dt * 1000)}
      </h3>
      <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      />
      <div class="weather-forecast-temperature">
        <strong>
          ${Math.round(forecast.main.temp_max)}°
        </strong>
        ${Math.round(forecast.main.temp_min)}°
      </div>
      <p class="forecastHumidity">${forecast.main.humidity}% humidity
    </div>
  `;
  }

}


function searchCity(city) {
  let apiKey = "cfeef4d0b0e86d888145aca4caf511b0";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);

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
  axios.get(apiUrl2).then(showTemperature2);

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

  apiUrl2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey2}&units=${units2}`;
  axios.get(apiUrl2).then(displayForecast);
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
  let tempCfeelsLike = (tempFfeelsLike -32)/1.8;
  console.log(tempC);
  document.querySelector(".currentTemp").innerHTML = Math.round(tempC);
  document.querySelector("#feelsLike").innerHTML =Math.round(tempCfeelsLike);

}

function displayFahrenheitTemperature(event) {
  event.preventDefault()
  console.log(tempF);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  document.querySelector(".currentTemp").innerHTML = Math.round(tempF);
} 

let tempF=null;
let tempFfeelsLike = null

let locate = document.querySelector("#currentlocation");
locate.addEventListener("click", getCurrentPosition);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchCity("New York");

