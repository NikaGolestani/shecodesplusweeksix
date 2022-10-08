function writeCity(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-search");
  city.innerHTML = citySearch.value;
  writeData();
}

function gpsCity(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = `cabdbda40038ba7d1165b953b1c7bd6c`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;
  axios.get(apiUrl).then(showData);
}

function handlegps() {
  navigator.geolocation.getCurrentPosition(gpsCity);
}

function showData(response) {
  let temp = response.data.main.temp;
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let cityGet = response.data.name;
  let wValue = response.data.weather[0].main;
  let mintemp = response.data.main.temp_min;
  let maxtemp = response.data.main.temp_max;
  if (wValue === "Clear") {
    emoji.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }
  if (wValue === "Clouds") {
    emoji.innerHTML = '<i class="fa-solid fa-cloud"></i>';
  }
  if (wValue === "Rain") {
    emoji.innerHTML = '<i class="fa-solid fa-cloud-rain"></i>';
  }
  if (wValue === "Thunderstorm") {
    emoji.innerHTML = '<i class="fa-solid fa-cloud-bolt"></i>';
  }
  if (wValue === "Moderate Rain") {
    emoji.innerHTML = '<i class="fa-solid fa-cloud-showers-heavy"></i>';
  }
  if (wValue === "light Rain") {
    emoji.innerHTML = '<i class="fa-regular fa-cloud-rain"></i>';
  }
  if (wValue === "Few Clouds") {
    emoji.innerHTML = '<i class="fa-solid fa-cloud"></i>';
  }
  if (wValue === "Broken Clouds") {
    emoji.innerHTML = '<i class="fa-solid fa-cloud"></i>';
  }
  if (wValue === "Fog") {
    emoji.innerHTML = '<i class="fa-solid fa-cloud-fog"></i>';
  }
  if (wValue === "Wind") {
    emoji.innerHTML = '<i class="fa-solid fa-wind"></i>';
  }
  if (wValue === "Snow") {
    emoji.innerHTML = '<i class="fa-solid fa-cloud-snow"></i>';
  }
  min.innerHTML = Math.round(mintemp);
  max.innerHTML = Math.round(maxtemp);
  city.innerHTML = cityGet;
  weatherValue.innerHTML = wValue;
  num.innerHTML = `${Math.round(temp)}`;
  details.innerHTML = `Humidity: ${humidity}%
  <br/>Wind: ${wind}km/h`;
  getForecast(response.data.coord);
}

function writeData() {
  let cityText = city.textContent;
  let apiKey = `cabdbda40038ba7d1165b953b1c7bd6c`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityText}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showData);
}

let weekDays = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`,
];
function dateSet() {
  let date = document.querySelector("#date");
  let hour = now.getHours();
  if (hour < 10) {
    hour = "0" + hour;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = "0" + minute;
  }
  date.innerHTML = `${weekDays[now.getDay()]} ${hour}:${minute}`;
}
let searchForm = document.querySelector("#search-form");
let now = new Date();
searchForm.addEventListener("submit", writeCity);
let num = document.querySelector(".int");
let city = document.querySelector("#city");
let details = document.querySelector(".details");
let weatherValue = document.querySelector(".wvalue");
let degree = document.querySelector(".degreec");
let emoji = document.querySelector("#emoji");
let current = document.querySelector(".currentbutton");
let min = document.querySelector("#mainmin");
let max = document.querySelector("#mainmax");
current.addEventListener("click", handlegps);
let forcastdays = document.querySelectorAll(".day");
let forecastMinmax = document.querySelectorAll(".littletext");
let forcastEmoji = document.querySelectorAll(".forecastemoji");
//forcast
function weekDate() {
  let today = now.getDay();
  let x = 0;
  while (x < 5) {
    if (6 === today) {
      forcastdays[x].innerHTML = weekDays[0];
      today = 0;
    } else {
      forcastdays[x].innerHTML = weekDays[today];
    }
    today = today + 1;
    x = x + 1;
  }
}

function showDataForecast(response) {
  x = 0;
  while (x < 5) {
    let forecastMin = response.data.daily[x + 1].temp.min;
    let forecastMax = response.data.daily[x + 1].temp.max;
    forecastMinmax[x].innerHTML = `${Math.round(forecastMax)} / ${Math.round(
      forecastMin
    )}`;
    console.log(response.data.daily[x + 1].weather[0].main);
    let forecastValue = response.data.daily[x + 1].weather[0].main;
    if (forecastValue === "Clear") {
      forcastEmoji[x].innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
    if (forecastValue === "Clouds") {
      forcastEmoji[x].innerHTML = '<i class="fa-solid fa-cloud"></i>';
    }
    if (forecastValue === "Rain") {
      forcastEmoji[x].innerHTML = '<i class="fa-solid fa-cloud-rain"></i>';
    }
    if (forecastValue === "Thunderstorm") {
      forcastEmoji[x].innerHTML = '<i class="fa-solid fa-cloud-bolt"></i>';
    }
    if (forecastValue === "Moderate Rain") {
      forcastEmoji[x].innerHTML =
        '<i class="fa-solid fa-cloud-showers-heavy"></i>';
    }
    if (forecastValue === "light Rain") {
      forcastEmoji[x].innerHTML = '<i class="fa-regular fa-cloud-rain"></i>';
    }
    if (forecastValue === "Few Clouds") {
      forcastEmoji[x].innerHTML = '<i class="fa-solid fa-cloud"></i>';
    }
    if (forecastValue === "Broken Clouds") {
      forcastEmoji[x].innerHTML = '<i class="fa-solid fa-cloud"></i>';
    }
    if (forecastValue === "Fog") {
      forcastEmoji[x].innerHTML = '<i class="fa-solid fa-cloud-fog"></i>';
    }
    if (forecastValue === "Wind") {
      forcastEmoji[x].innerHTML = '<i class="fa-solid fa-wind"></i>';
    }
    if (forecastValue === "Snow") {
      forcastEmoji[x].innerHTML = '<i class="fa-solid fa-cloud-snow"></i>';
    }
    x = x + 1;
  }
}

function getForecast(coords) {
  let apiKey = `cabdbda40038ba7d1165b953b1c7bd6c`;
  let lat = coords.lat;
  let lon = coords.lon;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showDataForecast);
}

weekDate();
dateSet();
writeData();
