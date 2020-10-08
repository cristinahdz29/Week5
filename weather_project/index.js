//Weather API key: 8c6626013e22126eac677ecd2717073a

//- Please, use the endpoint api.openweathermap.org for your API calls
// - Example of API call:
// api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=8c6626013e22126eac677ecd2717073a

//Getting elements from HTML
//Search HTML elements
let searchWeatherDiv = document.getElementById("searchWeatherDiv");
let cityTextBox = document.getElementById("cityTextBox");
let searchButton = document.getElementById("searchButton");

//Display HTML elements
let h1 = document.getElementById("currentWeatherMessage");
let weatherDisplayDiv = document.getElementById("weatherDisplayDiv");
let pCityName = document.getElementById("cityName");
let pDescription = document.getElementById("description");
let pTemp = document.getElementById("temp");
let h2High = document.getElementById("highTemp");
let pLow = document.getElementById("lowTemp");
let pFeelsLike = document.getElementById("feelsLike");
let pHumidity = document.getElementById("humidity");

//API key
let apiKey = "8c6626013e22126eac677ecd2717073a";

//description emoji object

let descriptionObject = {
  "clear sky": "🌞",
  "few clouds": "🌥",
  "scattered clouds": "🌥",
  "broken clouds": "🌥",
  "overcast clouds": "🌥",
  haze: "🌥",
  "light rain": "☔️",
  smoke: "🔥",
  "heavy intensity rain": "⛈"
};

// function feelLikeEmoji (){
//     if (feelsLikeTemp <= 50){
//         pFeelsLike.innerHTML = `<b>Feels like: </b> <br> 🥶 ${feelsLikeTemp}&#x2109`;
//     } else if (feelsLikeTemp > 51 && feelsLikeTemp <= 80) {
//         pFeelsLike.innerHTML = `<b>Feels like: </b> <br> 😎 ${feelsLikeTemp}&#x2109`;
//     } else {
//         pFeelsLike.innerHTML = `<b>Feels like: </b> <br> 🥵 ${feelsLikeTemp}&#x2109`;
//     }
// }

//add event listener to Search Button
searchButton.addEventListener("click", async function () {
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityTextBox.value}&appid=8c6626013e22126eac677ecd2717073a&units=imperial`;

  let response = await fetch(url);
  let json = await response.json();
  console.log(json.main.temp);
  let temp = Math.round(json.main.temp);
  console.log(temp);
  let feelsLikeTemp = Math.round(json.main.feels_like);
  console.log(feelsLikeTemp);

  h1.innerHTML = `Currently ${temp} &#x2109 in ${json.name}`;

  let highTemp = Math.round(json.main.temp_max);
  let lowTemp = Math.round(json.main.temp_min);

  //   pCityName.innerHTML = `City: ${json.name}`;
  //   weatherDisplayDiv.appendChild(pCityName);
  h2High.innerHTML = `${lowTemp} &#x2109  / <b>${highTemp} &#x2109 <b/b>`;
  weatherDisplayDiv.appendChild(h2High);

  pDescription.innerHTML = `<b>Description:</b><br> ${
    descriptionObject[json.weather[0].description] || ""
  } ${json.weather[0].description}`;
  weatherDisplayDiv.appendChild(pDescription);

  //   pTemp.innerHTML = `Temperature: ${temp} &#x2109`;
  //   weatherDisplayDiv.appendChild(pTemp);

  //   pLow.innerHTML = `L: ${lowTemp} &#x2109`;
  //   weatherDisplayDiv.appendChild(pLow)
  if (feelsLikeTemp <= 50) {
    pFeelsLike.innerHTML = `<b>Feels like: </b> <br> 🥶 ${feelsLikeTemp}&#x2109`;
  } else if (feelsLikeTemp <= 80) {
    pFeelsLike.innerHTML = `<b>Feels like: </b> <br> 😎 ${feelsLikeTemp}&#x2109`;
  } else {
    pFeelsLike.innerHTML = `<b>Feels like: </b> <br> 🥵 ${feelsLikeTemp}&#x2109`;
  }

  weatherDisplayDiv.appendChild(pFeelsLike);

  pHumidity.innerHTML = `<b>Humidity:</b> <br> 💧${json.main.humidity}%`;
  weatherDisplayDiv.appendChild(pHumidity);
});
