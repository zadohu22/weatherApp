/* eslint-disable no-plusplus */
/* eslint-disable prefer-destructuring */
/* eslint-disable eol-last */
/* eslint-disable comma-dangle */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

// api key = 19e7974406ed3779128ae8daa0956d4f

import { Dom } from './Dom';
import { create } from './create';

let arr = [];
let cityName = '';
let getInitialCoordinates = async () => {
  let cityVal = Dom.city.value;
  // let stateVal = Dom.state.value;
  let response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityVal},1&limit=10&appid=19e7974406ed3779128ae8daa0956d4f`,
    { mode: 'cors' }
  );
  let usable = await response.json();
  // let lat = usable[0].lat;
  // let lon = usable[0].lon;
  console.log(usable);
  return usable;
  // return [lat, lon];
};

let getSpecificCoordinates = async (city, state, country) => {
  let response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}1&limit=10&appid=19e7974406ed3779128ae8daa0956d4f`,
    { mode: 'cors' }
  );
  let usable = await response.json();
  console.log(usable);
  let lat = usable[0].lat;
  let lon = usable[0].lon;

  console.log([lat, lon]);
  return [lat, lon];
};

let pickCity = () => {
  let content = document.querySelectorAll('#content');

  content.forEach((e, i) => {
    e.addEventListener('click', () => {
      let text = e.innerText;
      let format = text.split(',');
      arr = [];
      arr.push(format[0], format[1], format[2]);
      cityName = format[0];
      console.log(cityName);
      console.log(arr);
      // remove whole list of cities
      while (Dom.container.firstChild) {
        Dom.container.removeChild(Dom.container.firstChild);
      }
      displayWeather();
    });
  });
  console.log(arr);
};

let displayCities = async () => {
  let response = await getInitialCoordinates();
  response.forEach((e, i) => {
    let content = document.createElement('p');
    content.textContent = `${e.name}, ${e.state}, ${e.country}`;
    Dom.container.appendChild(content);
    content.id = 'content';
  });
  console.log(response);
  pickCity();
};

let getWeather = async (initialOrSpecific) => {
  let coords = await initialOrSpecific;
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coords[0]}&lon=${coords[1]}&units=imperial&appid=19e7974406ed3779128ae8daa0956d4f`
  );
  let weather = await response.json();
  console.log(weather);
  return weather;
};

// let displayPickedCity = () => {
//   formatWeather(getSpecificCoordinates(`${arr[0]}`, `${arr[1]}`, `${arr[2]}`));
//   // returns weather object

// };

class WeatherObj {
  constructor(
    temp,
    feelsLike,
    city,
    cloudCover,
    humidity,
    conditions,
    conditionsDesc,
    windSpeed,
    windGust,
    visibility
  ) {
    this.temp = temp;
    this.feelsLike = feelsLike;
    this.city = city;
    this.cloudCover = cloudCover;
    this.humidity = humidity;
    this.conditions = conditions;
    this.conditionsDesc = conditionsDesc;
    this.windSpeed = windSpeed;
    this.windGust = windGust;
    this.visibility = visibility;
  }
}

let formatWeather = async () => {
  let weather = await getWeather(
    getSpecificCoordinates(`${arr[0]}`, `${arr[1]}`, `${arr[2]}`)
  );
  let format = new WeatherObj(
    weather.main.temp,
    weather.main.feels_like,
    weather.name,
    weather.clouds.all,
    weather.main.humidity,
    weather.weather[0].main,
    weather.weather[0].description,
    weather.wind.speed,
    weather.wind.gust,
    weather.visibility
  );

  //   console.log(weather.main.feels_like);
  return format;
};

let displayWeather = async () => {
  let response = await formatWeather();
  console.log(response);
  let title = create(
    'h2',
    'title',
    'title',
    `Weather for ${cityName}`,
    Dom.container
  );
  let temp = create(
    'p',
    'temp',
    'temp',
    `Temperature: ${response.temp}`,
    Dom.container
  );
  let conditions = create(
    'p',
    'conditions',
    'conditions',
    `Conditions: ${response.conditions} (${response.conditionsDesc})`,
    Dom.container
  );
  let cloudCover = create(
    'p',
    'cloudCover',
    'cloudCover',
    `Cloud Cover: ${response.cloudCover}%`,
    Dom.container
  );
  if (response.humidity !== undefined) {
    let humidity = create(
      'p',
      'humidity',
      'humidity',
      `Humidity: ${response.humidity}%`,
      Dom.container
    );
  }
  let feelsLike = create(
    'p',
    'feelsLike',
    'feelsLike',
    `Feels Like: ${response.feelsLike}`,
    Dom.container
  );
  if (response.windSpeed !== 'undefined') {
    let windSpeed = create(
      'p',
      'windSpeed',
      'windSpeed',
      `Wind Speed: ${response.windSpeed} MpH`,
      Dom.container
    );
  }
  if (response.windGust !== undefined) {
    let windGust = create(
      'p',
      'windGust',
      'windGust',
      `Wind Gust: ${response.windGust} MpH`,
      Dom.container
    );
  }
  let converted = response.visibility / 1000;
  let visibility = create(
    'p',
    'visibility',
    'visibility',
    `Visibility: ${converted}km`,
    Dom.container
  );
};

let gifTest = async () => {
  let img = document.createElement('img');
  let response = await fetch('https://api.giphy.com/v1/gifs/translate?api_key=BRo3VV7iEKnPHr2jxOG5SNpgB6CgzqDG&s=rainy_weather&weirdness=0', { mode: 'cors' });
  let x = await response.json();
  console.log(x);
  img.src = x.data.images.downsized_medium.url;
  Dom.container.appendChild(img);
};
gifTest();
let submitListener = () => {
  Dom.submit.addEventListener('click', async () => {
    while (Dom.container.firstChild) {
      Dom.container.removeChild(Dom.container.firstChild);
    }
    displayCities();
  });
};
submitListener();
