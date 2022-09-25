function writeCity(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-search");
  city.innerHTML = citySearch.value;
  writeData();
}

function showData(response) {
  let temp = response.data.main.temp;
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let wValue = response.data.weather[0].main;
  let num = document.querySelector(".num");
  weatherValue.innerHTML = wValue;
  num.innerHTML = `${Math.round(temp)}°`;
  details.innerHTML = `Humidity: ${humidity}%
  <br/>Wind: ${wind}km/h`;
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
  let now = new Date();
  let date = document.querySelector("#date");
  date.innerHTML = `${
    weekDays[now.getDay()]
  } ${now.getHours()}:${now.getMinutes()}`;
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", writeCity);
let city = document.querySelector("#city");
let details = document.querySelector(".details");
let weatherValue = document.querySelector(".wvalue");
dateSet();
writeData();
