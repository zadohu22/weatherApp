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

let getCoordinates = async () => {
  let cityVal = Dom.city.value;
  let stateVal = Dom.state.value;
  let response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityVal},${stateVal},1&limit=10&appid=19e7974406ed3779128ae8daa0956d4f`,
    { mode: 'cors' }
  );
  let usable = await response.json();
  let lat = usable[0].lat;
  let lon = usable[0].lon;
  return [lat, lon];
};

let getWeather = async () => {
  let coords = await getCoordinates();
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coords[0]}&lon=${coords[1]}&units=imperial&appid=19e7974406ed3779128ae8daa0956d4f`
  );
  let weather = await response.json();
  console.log(weather);
  return weather;
};

class WeatherObj {
  constructor(
    temp,
    feelsLike,
    city,
    cloudCover,
    humidity,
    conditions,
    windSpeed,
    visibility
  ) {
    this.temp = temp;
    this.feelsLike = feelsLike;
    this.city = city;
    this.cloudCover = cloudCover;
    this.humidity = humidity;
    this.conditions = conditions;
    this.windSpeed = windSpeed;
    this.visibility = visibility;
  }
}

let formatWeather = async () => {
  let weather = await getWeather();
  let format = new WeatherObj(
    weather.main.temp,
    weather.main.feels_like,
    weather.name,
    weather.clouds.all,
    weather.main.humidity,
    weather.weather[0].main,
    weather.wind.speed,
    weather.visibility
  );

  //   console.log(weather.main.feels_like);
  return format;
};

let displayWeather = async () => {
  let response = await formatWeather();
  console.log(response);
  let x = create('p', 'temp', 'temp', `${response.temp}`, Dom.container);
};

let submitListener = () => {
  Dom.submit.addEventListener('click', async () => {
    displayWeather();
  });
};

submitListener();
