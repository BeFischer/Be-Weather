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

function wDirection(deg) {
  let direction = 0;
if (deg >315 | deg<45) {direction = "N";}
if (deg > 225 && deg<315) {direction ="W";}
if (deg > 135 && deg<225) {direction ="S";}
if (deg > 45 && deg<235) {direction ="E";}
return `${direction}`;
}

//Search for and return city

//function showTemperature(response) {
  //let wDirection = response.data.wind.deg;
  //if wDirection 
  //console.log(response.data.wind);
  //tempF = response.data.main.temp;
  //tempFfeelsLike=response.data.main.feels_like;
  //document.querySelector(".currentTemp").innerHTML = `${(Math.round(tempF))}`;
  //document.querySelector(".currentCity").innerHTML = response.data.name;
  //document.querySelector(".humidity").innerHTML = `${response.data.main.humidity}% Humidity`;
  //document.querySelector("#feelsLike").innerHTML = `${Math.round(response.data.main.feels_like)}`;
  //document.querySelector(".sky").innerHTML =response.data.weather[0].description;
  //document.querySelector(".sun").innerHTML =`Sunrise:${formatHours(response.data.sys.sunrise*1000)} Sunset:${formatHours(response.data.sys.sunset*1000)}`;

  //document.querySelector(".wind").innerHTML =`${wDirection(response.data.wind.deg)} Wind:${Math.round(response.data.wind.speed)}mph`
  //;Gusts:${Math.round(response.data.wind.gust)}mph`;
 
  //document.querySelector("#current-time p").innerHTML = `Last updated: ${formatDate(response.data.dt*1000)} ${formatHours(response.data.dt*1000)} for`;
  //icon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  //);
  //icon.setAttribute("alt", response.data.weather[0].description);
//}
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 8; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-3">
      <h3>
        ${formatHours(forecast.dt * 1000)}
      </h3>
      <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      />
      <div class="weather-forecast-temperature">
        <span id ="max">
          ${Math.round(forecast.main.temp_max)}° </span>
        <span id ="min">
        ${Math.round(forecast.main.temp_min)}° </span>
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
  axios.get(apiUrl).then(showCoordinates);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);

}

function city(event) {
  event.preventDefault();

  let cityStateInput = document.querySelector("#location");
  let apiKey = "cfeef4d0b0e86d888145aca4caf511b0";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityStateInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCoordinates);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityStateInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);

}


//current Location

function showCoordinates(response) {
  let long = response.data.coord.lon;
  let lat = response.data.coord.lat;
  let units2 = "imperial";
  let apiKey2 = "cfeef4d0b0e86d888145aca4caf511b0";

  apiUrl2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey2}&units=${units2}`;
  axios.get(apiUrl2).then(showTemperature2);

  apiUrl2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey2}&units=${units2}`;
  axios.get(apiUrl2).then(displayForecast);

  apiUrl2 = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${long}&appid=${apiKey2}&units=${units2}`;
  axios.get(apiUrl2).then(displayUV);
}

function showPosition(position) {
       fahrenheitLink.classList.add("active");
      celsiusLink.classList.remove("acitve");

  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let units2 = "imperial";
  let apiKey2 = "cfeef4d0b0e86d888145aca4caf511b0";

  let apiUrl2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey2}&units=${units2}`;
  axios.get(apiUrl2).then(showTemperature2);

  apiUrl2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey2}&units=${units2}`;
  axios.get(apiUrl2).then(displayForecast);

  apiUrl2 = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${long}&appid=${apiKey2}&units=${units2}`;
  axios.get(apiUrl2).then(displayUV);
}
  function showTemperature2(response) {
      fahrenheitLink.classList.add("active");
      celsiusLink.classList.remove("active");
  tempF = response.data.main.temp;
  tempFfeelsLike=response.data.main.feels_like;
  //console.log(response.data.wind);
  //console.log(response.data.coord.lon);

  document.querySelector(".currentTemp").innerHTML = `${Math.round(tempF)}`;
  document.querySelector(".currentCity").innerHTML = `${response.data.name}`;
  document.querySelector("#location").value =`${response.data.name}`;


  document.querySelector("#feelsLike").innerHTML = `${Math.round(tempFfeelsLike)}`;
  document.querySelector(".humidity").innerHTML = `  ${response.data.main.humidity}% Humidity`;
  document.querySelector(".sunrise").innerHTML =`${formatHours(response.data.sys.sunrise * 1000)}      |`;
  
  document.querySelector(".sunset").innerHTML =`${formatHours(response.data.sys.sunset*1000)}`;
  document.querySelector(".sky").innerHTML=response.data.weather[0].description;
  document.querySelector(".wind").innerHTML =`  ${Math.round(response.data.wind.speed)}mph ${wDirection(response.data.wind.deg)} Wind`;
  //Gusts:${Math.round(response.data.wind.gust)}mph`; not available
  document.querySelector("#current-time p").innerHTML = `Last updated: ${formatDate(response.data.dt*1000)} ${formatHours(response.data.dt*1000)} for`;


  icon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}  

//UV for current location
function displayUV(response) {
 // console.log(response.data.value)
  document.querySelector(".uV").innerHTML=`${Math.round(response.data.value)} UV Index`;

 // document.querySelector(".humidity").innerHTML = `${response.data.main.humidity}% Humidity`;
}


//switch from F to C links
function displayCelsiusTemperature(event) {
  event.preventDefault()
  let tempC = (tempF-32) / 1.8;
  let tempCfeelsLike = (tempFfeelsLike -32)/1.8;
   celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  document.querySelector(".currentTemp").innerHTML = Math.round(tempC);
  document.querySelector("#feelsLike").innerHTML =Math.round(tempCfeelsLike);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault()
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  document.querySelector(".currentTemp").innerHTML = Math.round(tempF);
document.querySelector("#feelsLike").innerHTML =Math.round(tempFfeelsLike);
} 

let tempF=null;
let tempFfeelsLike = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

document.querySelector("form.byCity").addEventListener("submit", city);

searchCity("New York");

let locate = document.querySelector("#currentlocation");
locate.addEventListener("click", getCurrentPosition);

