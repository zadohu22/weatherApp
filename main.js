/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Dom.js":
/*!********************!*\
  !*** ./src/Dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Dom": () => (/* binding */ Dom)
/* harmony export */ });
/* eslint-disable import/prefer-default-export */
const Dom = {
  city: document.getElementById('city'),
  state: document.getElementById('state'),
  submit: document.getElementById('submit'),
  form: document.getElementById('form'),
  container: document.getElementById('container'),
};




/***/ }),

/***/ "./src/create.js":
/*!***********************!*\
  !*** ./src/create.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "create": () => (/* binding */ create)
/* harmony export */ });
/* eslint-disable import/prefer-default-export */
const create = (element, id, cls, text, append) => {
  const el = document.createElement(element);
  el.id = id;
  el.classList.add(cls);
  el.textContent = text;
  append.appendChild(el);
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dom */ "./src/Dom.js");
/* harmony import */ var _create__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create */ "./src/create.js");
/* eslint-disable no-plusplus */
/* eslint-disable prefer-destructuring */
/* eslint-disable eol-last */
/* eslint-disable comma-dangle */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

// api key = 19e7974406ed3779128ae8daa0956d4f




let arr = [];
let cityName = '';
let getInitialCoordinates = async () => {
  let cityVal = _Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.city.value;
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
      while (_Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.container.firstChild) {
        _Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.container.removeChild(_Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.container.firstChild);
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
    content.style.cursor = "pointer";
    _Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.container.appendChild(content);
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

let changeBackground = (condition) => {
  if (condition === 'Clouds') {
    document.body.style.backgroundImage =
      'url("./billy-huynh-v9bnfMCyKbg-unsplash.jpg")';
  } else if (condition === 'Rain' || condition === 'Drizzle') {
    document.body.style.backgroundImage =
      'url("./mitodru-ghosh-YfveMgXSWkc-unsplash.jpg")';
  } else if (condition === 'Thunderstorm') {
    document.body.style.backgroundImage =
      'url("./raychel-sanner-1cJXplTxrmI-unsplash.jpg")';
  } else if (condition === 'Snow') {
    document.body.style.backgroundImage =
      'url("./brian-jones-s8QSJTJI6qg-unsplash.jpg")';
  }else if(condition === 'Clear'){
    document.body.style.backgroundImage =
      'url("./antunes-vila-nova-neto-IUAyoABilaA-unsplash.jpg")';
  }else{
    document.body.removeAttribute('backgroundImage');
  }
};

let displayWeather = async () => {
  let response = await formatWeather();
  console.log(response);
  let title = (0,_create__WEBPACK_IMPORTED_MODULE_1__.create)(
    'h2',
    'title',
    'title',
    `Weather for ${cityName}`,
    _Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.container
  );
  let temp = (0,_create__WEBPACK_IMPORTED_MODULE_1__.create)(
    'p',
    'temp',
    'temp',
    `Temperature: ${response.temp}`,
    _Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.container
  );
  let conditions = (0,_create__WEBPACK_IMPORTED_MODULE_1__.create)(
    'p',
    'conditions',
    'conditions',
    `Conditions: ${response.conditions} (${response.conditionsDesc})`,
    _Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.container
  );
  changeBackground(`${response.conditions}`);

  let cloudCover = (0,_create__WEBPACK_IMPORTED_MODULE_1__.create)(
    'p',
    'cloudCover',
    'cloudCover',
    `Cloud Cover: ${response.cloudCover}%`,
    _Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.container
  );
  if (response.humidity !== undefined) {
    let humidity = (0,_create__WEBPACK_IMPORTED_MODULE_1__.create)(
      'p',
      'humidity',
      'humidity',
      `Humidity: ${response.humidity}%`,
      _Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.container
    );
  }
  let feelsLike = (0,_create__WEBPACK_IMPORTED_MODULE_1__.create)(
    'p',
    'feelsLike',
    'feelsLike',
    `Feels Like: ${response.feelsLike}`,
    _Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.container
  );
  if (response.windSpeed !== 'undefined') {
    let windSpeed = (0,_create__WEBPACK_IMPORTED_MODULE_1__.create)(
      'p',
      'windSpeed',
      'windSpeed',
      `Wind Speed: ${response.windSpeed} MpH`,
      _Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.container
    );
  }
  if (response.windGust !== undefined) {
    let windGust = (0,_create__WEBPACK_IMPORTED_MODULE_1__.create)(
      'p',
      'windGust',
      'windGust',
      `Wind Gust: ${response.windGust} MpH`,
      _Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.container
    );
  }
  let converted = response.visibility / 1000;
  let visibility = (0,_create__WEBPACK_IMPORTED_MODULE_1__.create)(
    'p',
    'visibility',
    'visibility',
    `Visibility: ${converted}km`,
    _Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.container
  );
};

let gifTest = async () => {
  let img = document.createElement('img');
  let response = await fetch(
    'https://api.giphy.com/v1/gifs/translate?api_key=BRo3VV7iEKnPHr2jxOG5SNpgB6CgzqDG&s=rainy_weather&weirdness=0',
    { mode: 'cors' }
  );
  let x = await response.json();
  console.log(x);
  img.src = x.data.images.downsized_medium.url;
  _Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.container.appendChild(img);
};
// gifTest();

let submitListener = () => {
  _Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.submit.addEventListener('click', async () => {
    while (_Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.container.firstChild) {
      _Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.container.removeChild(_Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.container.firstChild);
    }
    _Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.container.classList.remove('hide');
    try {
      displayCities();
    }catch(e){
      console.log(e);
    }
    
  });
};
submitListener();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQSxtQkFBbUIsK0NBQU07QUFDekI7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGtCQUFrQjtBQUNyQyxNQUFNLCtDQUFhO0FBQ25CO0FBQ0E7QUFDQSxrQkFBa0IsK0NBQU07QUFDeEI7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLG1CQUFtQjtBQUN0QyxJQUFJLCtDQUFhO0FBQ2pCO0FBQ0E7QUFDQSxvQkFBb0IsK0NBQU07QUFDMUI7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLG9CQUFvQjtBQUN6QyxNQUFNLCtDQUFhO0FBQ25CO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiwrQ0FBTTtBQUN6QjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsbUJBQW1CO0FBQ3ZDLE1BQU0sK0NBQWE7QUFDbkI7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLCtDQUFNO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixVQUFVO0FBQzdCLElBQUksK0NBQWE7QUFDakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsMkRBQXlCO0FBQzNCO0FBQ0E7O0FBRUE7QUFDQSxFQUFFLDZEQUEyQjtBQUM3QixXQUFXLDBEQUF3QjtBQUNuQyxNQUFNLDJEQUF5QixDQUFDLDBEQUF3QjtBQUN4RDtBQUNBLElBQUksZ0VBQThCO0FBQ2xDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyYXBwLy4vc3JjL0RvbS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyYXBwLy4vc3JjL2NyZWF0ZS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXJhcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXJhcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlcmFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG5jb25zdCBEb20gPSB7XG4gIGNpdHk6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaXR5JyksXG4gIHN0YXRlOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhdGUnKSxcbiAgc3VibWl0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWl0JyksXG4gIGZvcm06IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb3JtJyksXG4gIGNvbnRhaW5lcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpLFxufTtcblxuZXhwb3J0IHsgRG9tIH07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG5jb25zdCBjcmVhdGUgPSAoZWxlbWVudCwgaWQsIGNscywgdGV4dCwgYXBwZW5kKSA9PiB7XG4gIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTtcbiAgZWwuaWQgPSBpZDtcbiAgZWwuY2xhc3NMaXN0LmFkZChjbHMpO1xuICBlbC50ZXh0Q29udGVudCA9IHRleHQ7XG4gIGFwcGVuZC5hcHBlbmRDaGlsZChlbCk7XG59O1xuXG5leHBvcnQgeyBjcmVhdGUgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyogZXNsaW50LWRpc2FibGUgbm8tcGx1c3BsdXMgKi9cbi8qIGVzbGludC1kaXNhYmxlIHByZWZlci1kZXN0cnVjdHVyaW5nICovXG4vKiBlc2xpbnQtZGlzYWJsZSBlb2wtbGFzdCAqL1xuLyogZXNsaW50LWRpc2FibGUgY29tbWEtZGFuZ2xlICovXG4vKiBlc2xpbnQtZGlzYWJsZSBwcmVmZXItY29uc3QgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG5cbi8vIGFwaSBrZXkgPSAxOWU3OTc0NDA2ZWQzNzc5MTI4YWU4ZGFhMDk1NmQ0ZlxuXG5pbXBvcnQgeyBEb20gfSBmcm9tICcuL0RvbSc7XG5pbXBvcnQgeyBjcmVhdGUgfSBmcm9tICcuL2NyZWF0ZSc7XG5cbmxldCBhcnIgPSBbXTtcbmxldCBjaXR5TmFtZSA9ICcnO1xubGV0IGdldEluaXRpYWxDb29yZGluYXRlcyA9IGFzeW5jICgpID0+IHtcbiAgbGV0IGNpdHlWYWwgPSBEb20uY2l0eS52YWx1ZTtcbiAgLy8gbGV0IHN0YXRlVmFsID0gRG9tLnN0YXRlLnZhbHVlO1xuICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICBgaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZ2VvLzEuMC9kaXJlY3Q/cT0ke2NpdHlWYWx9LDEmbGltaXQ9MTAmYXBwaWQ9MTllNzk3NDQwNmVkMzc3OTEyOGFlOGRhYTA5NTZkNGZgLFxuICAgIHsgbW9kZTogJ2NvcnMnIH1cbiAgKTtcbiAgbGV0IHVzYWJsZSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgLy8gbGV0IGxhdCA9IHVzYWJsZVswXS5sYXQ7XG4gIC8vIGxldCBsb24gPSB1c2FibGVbMF0ubG9uO1xuICBjb25zb2xlLmxvZyh1c2FibGUpO1xuICByZXR1cm4gdXNhYmxlO1xuICAvLyByZXR1cm4gW2xhdCwgbG9uXTtcbn07XG5cbmxldCBnZXRTcGVjaWZpY0Nvb3JkaW5hdGVzID0gYXN5bmMgKGNpdHksIHN0YXRlLCBjb3VudHJ5KSA9PiB7XG4gIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgIGBodHRwOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9nZW8vMS4wL2RpcmVjdD9xPSR7Y2l0eX0sJHtzdGF0ZX0sJHtjb3VudHJ5fTEmbGltaXQ9MTAmYXBwaWQ9MTllNzk3NDQwNmVkMzc3OTEyOGFlOGRhYTA5NTZkNGZgLFxuICAgIHsgbW9kZTogJ2NvcnMnIH1cbiAgKTtcbiAgbGV0IHVzYWJsZSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgY29uc29sZS5sb2codXNhYmxlKTtcbiAgbGV0IGxhdCA9IHVzYWJsZVswXS5sYXQ7XG4gIGxldCBsb24gPSB1c2FibGVbMF0ubG9uO1xuXG4gIGNvbnNvbGUubG9nKFtsYXQsIGxvbl0pO1xuICByZXR1cm4gW2xhdCwgbG9uXTtcbn07XG5cbmxldCBwaWNrQ2l0eSA9ICgpID0+IHtcbiAgbGV0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjY29udGVudCcpO1xuXG4gIGNvbnRlbnQuZm9yRWFjaCgoZSwgaSkgPT4ge1xuICAgIGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBsZXQgdGV4dCA9IGUuaW5uZXJUZXh0O1xuICAgICAgbGV0IGZvcm1hdCA9IHRleHQuc3BsaXQoJywnKTtcbiAgICAgIGFyciA9IFtdO1xuICAgICAgYXJyLnB1c2goZm9ybWF0WzBdLCBmb3JtYXRbMV0sIGZvcm1hdFsyXSk7XG4gICAgICBjaXR5TmFtZSA9IGZvcm1hdFswXTtcbiAgICAgIGNvbnNvbGUubG9nKGNpdHlOYW1lKTtcbiAgICAgIGNvbnNvbGUubG9nKGFycik7XG4gICAgICAvLyByZW1vdmUgd2hvbGUgbGlzdCBvZiBjaXRpZXNcbiAgICAgIHdoaWxlIChEb20uY29udGFpbmVyLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgRG9tLmNvbnRhaW5lci5yZW1vdmVDaGlsZChEb20uY29udGFpbmVyLmZpcnN0Q2hpbGQpO1xuICAgICAgfVxuICAgICAgZGlzcGxheVdlYXRoZXIoKTtcbiAgICB9KTtcbiAgfSk7XG4gIGNvbnNvbGUubG9nKGFycik7XG59O1xuXG5sZXQgZGlzcGxheUNpdGllcyA9IGFzeW5jICgpID0+IHtcbiAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZ2V0SW5pdGlhbENvb3JkaW5hdGVzKCk7XG4gIHJlc3BvbnNlLmZvckVhY2goKGUsIGkpID0+IHtcbiAgICBsZXQgY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBjb250ZW50LnRleHRDb250ZW50ID0gYCR7ZS5uYW1lfSwgJHtlLnN0YXRlfSwgJHtlLmNvdW50cnl9YDtcbiAgICBjb250ZW50LnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuICAgIERvbS5jb250YWluZXIuYXBwZW5kQ2hpbGQoY29udGVudCk7XG4gICAgY29udGVudC5pZCA9ICdjb250ZW50JztcbiAgfSk7XG4gIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgcGlja0NpdHkoKTtcbn07XG5cbmxldCBnZXRXZWF0aGVyID0gYXN5bmMgKGluaXRpYWxPclNwZWNpZmljKSA9PiB7XG4gIGxldCBjb29yZHMgPSBhd2FpdCBpbml0aWFsT3JTcGVjaWZpYztcbiAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP2xhdD0ke2Nvb3Jkc1swXX0mbG9uPSR7Y29vcmRzWzFdfSZ1bml0cz1pbXBlcmlhbCZhcHBpZD0xOWU3OTc0NDA2ZWQzNzc5MTI4YWU4ZGFhMDk1NmQ0ZmBcbiAgKTtcbiAgbGV0IHdlYXRoZXIgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gIGNvbnNvbGUubG9nKHdlYXRoZXIpO1xuICByZXR1cm4gd2VhdGhlcjtcbn07XG5cbi8vIGxldCBkaXNwbGF5UGlja2VkQ2l0eSA9ICgpID0+IHtcbi8vICAgZm9ybWF0V2VhdGhlcihnZXRTcGVjaWZpY0Nvb3JkaW5hdGVzKGAke2FyclswXX1gLCBgJHthcnJbMV19YCwgYCR7YXJyWzJdfWApKTtcbi8vICAgLy8gcmV0dXJucyB3ZWF0aGVyIG9iamVjdFxuXG4vLyB9O1xuXG5jbGFzcyBXZWF0aGVyT2JqIHtcbiAgY29uc3RydWN0b3IoXG4gICAgdGVtcCxcbiAgICBmZWVsc0xpa2UsXG4gICAgY2l0eSxcbiAgICBjbG91ZENvdmVyLFxuICAgIGh1bWlkaXR5LFxuICAgIGNvbmRpdGlvbnMsXG4gICAgY29uZGl0aW9uc0Rlc2MsXG4gICAgd2luZFNwZWVkLFxuICAgIHdpbmRHdXN0LFxuICAgIHZpc2liaWxpdHlcbiAgKSB7XG4gICAgdGhpcy50ZW1wID0gdGVtcDtcbiAgICB0aGlzLmZlZWxzTGlrZSA9IGZlZWxzTGlrZTtcbiAgICB0aGlzLmNpdHkgPSBjaXR5O1xuICAgIHRoaXMuY2xvdWRDb3ZlciA9IGNsb3VkQ292ZXI7XG4gICAgdGhpcy5odW1pZGl0eSA9IGh1bWlkaXR5O1xuICAgIHRoaXMuY29uZGl0aW9ucyA9IGNvbmRpdGlvbnM7XG4gICAgdGhpcy5jb25kaXRpb25zRGVzYyA9IGNvbmRpdGlvbnNEZXNjO1xuICAgIHRoaXMud2luZFNwZWVkID0gd2luZFNwZWVkO1xuICAgIHRoaXMud2luZEd1c3QgPSB3aW5kR3VzdDtcbiAgICB0aGlzLnZpc2liaWxpdHkgPSB2aXNpYmlsaXR5O1xuICB9XG59XG5cbmxldCBmb3JtYXRXZWF0aGVyID0gYXN5bmMgKCkgPT4ge1xuICBsZXQgd2VhdGhlciA9IGF3YWl0IGdldFdlYXRoZXIoXG4gICAgZ2V0U3BlY2lmaWNDb29yZGluYXRlcyhgJHthcnJbMF19YCwgYCR7YXJyWzFdfWAsIGAke2FyclsyXX1gKVxuICApO1xuICBsZXQgZm9ybWF0ID0gbmV3IFdlYXRoZXJPYmooXG4gICAgd2VhdGhlci5tYWluLnRlbXAsXG4gICAgd2VhdGhlci5tYWluLmZlZWxzX2xpa2UsXG4gICAgd2VhdGhlci5uYW1lLFxuICAgIHdlYXRoZXIuY2xvdWRzLmFsbCxcbiAgICB3ZWF0aGVyLm1haW4uaHVtaWRpdHksXG4gICAgd2VhdGhlci53ZWF0aGVyWzBdLm1haW4sXG4gICAgd2VhdGhlci53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLFxuICAgIHdlYXRoZXIud2luZC5zcGVlZCxcbiAgICB3ZWF0aGVyLndpbmQuZ3VzdCxcbiAgICB3ZWF0aGVyLnZpc2liaWxpdHlcbiAgKTtcblxuICAvLyAgIGNvbnNvbGUubG9nKHdlYXRoZXIubWFpbi5mZWVsc19saWtlKTtcbiAgcmV0dXJuIGZvcm1hdDtcbn07XG5cbmxldCBjaGFuZ2VCYWNrZ3JvdW5kID0gKGNvbmRpdGlvbikgPT4ge1xuICBpZiAoY29uZGl0aW9uID09PSAnQ2xvdWRzJykge1xuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuYmFja2dyb3VuZEltYWdlID1cbiAgICAgICd1cmwoXCIuL2JpbGx5LWh1eW5oLXY5Ym5mTUN5S2JnLXVuc3BsYXNoLmpwZ1wiKSc7XG4gIH0gZWxzZSBpZiAoY29uZGl0aW9uID09PSAnUmFpbicgfHwgY29uZGl0aW9uID09PSAnRHJpenpsZScpIHtcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9XG4gICAgICAndXJsKFwiLi9taXRvZHJ1LWdob3NoLVlmdmVNZ1hTV2tjLXVuc3BsYXNoLmpwZ1wiKSc7XG4gIH0gZWxzZSBpZiAoY29uZGl0aW9uID09PSAnVGh1bmRlcnN0b3JtJykge1xuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuYmFja2dyb3VuZEltYWdlID1cbiAgICAgICd1cmwoXCIuL3JheWNoZWwtc2FubmVyLTFjSlhwbFR4cm1JLXVuc3BsYXNoLmpwZ1wiKSc7XG4gIH0gZWxzZSBpZiAoY29uZGl0aW9uID09PSAnU25vdycpIHtcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9XG4gICAgICAndXJsKFwiLi9icmlhbi1qb25lcy1zOFFTSlRKSTZxZy11bnNwbGFzaC5qcGdcIiknO1xuICB9ZWxzZSBpZihjb25kaXRpb24gPT09ICdDbGVhcicpe1xuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuYmFja2dyb3VuZEltYWdlID1cbiAgICAgICd1cmwoXCIuL2FudHVuZXMtdmlsYS1ub3ZhLW5ldG8tSVVBeW9BQmlsYUEtdW5zcGxhc2guanBnXCIpJztcbiAgfWVsc2V7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVBdHRyaWJ1dGUoJ2JhY2tncm91bmRJbWFnZScpO1xuICB9XG59O1xuXG5sZXQgZGlzcGxheVdlYXRoZXIgPSBhc3luYyAoKSA9PiB7XG4gIGxldCByZXNwb25zZSA9IGF3YWl0IGZvcm1hdFdlYXRoZXIoKTtcbiAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICBsZXQgdGl0bGUgPSBjcmVhdGUoXG4gICAgJ2gyJyxcbiAgICAndGl0bGUnLFxuICAgICd0aXRsZScsXG4gICAgYFdlYXRoZXIgZm9yICR7Y2l0eU5hbWV9YCxcbiAgICBEb20uY29udGFpbmVyXG4gICk7XG4gIGxldCB0ZW1wID0gY3JlYXRlKFxuICAgICdwJyxcbiAgICAndGVtcCcsXG4gICAgJ3RlbXAnLFxuICAgIGBUZW1wZXJhdHVyZTogJHtyZXNwb25zZS50ZW1wfWAsXG4gICAgRG9tLmNvbnRhaW5lclxuICApO1xuICBsZXQgY29uZGl0aW9ucyA9IGNyZWF0ZShcbiAgICAncCcsXG4gICAgJ2NvbmRpdGlvbnMnLFxuICAgICdjb25kaXRpb25zJyxcbiAgICBgQ29uZGl0aW9uczogJHtyZXNwb25zZS5jb25kaXRpb25zfSAoJHtyZXNwb25zZS5jb25kaXRpb25zRGVzY30pYCxcbiAgICBEb20uY29udGFpbmVyXG4gICk7XG4gIGNoYW5nZUJhY2tncm91bmQoYCR7cmVzcG9uc2UuY29uZGl0aW9uc31gKTtcblxuICBsZXQgY2xvdWRDb3ZlciA9IGNyZWF0ZShcbiAgICAncCcsXG4gICAgJ2Nsb3VkQ292ZXInLFxuICAgICdjbG91ZENvdmVyJyxcbiAgICBgQ2xvdWQgQ292ZXI6ICR7cmVzcG9uc2UuY2xvdWRDb3Zlcn0lYCxcbiAgICBEb20uY29udGFpbmVyXG4gICk7XG4gIGlmIChyZXNwb25zZS5odW1pZGl0eSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IGh1bWlkaXR5ID0gY3JlYXRlKFxuICAgICAgJ3AnLFxuICAgICAgJ2h1bWlkaXR5JyxcbiAgICAgICdodW1pZGl0eScsXG4gICAgICBgSHVtaWRpdHk6ICR7cmVzcG9uc2UuaHVtaWRpdHl9JWAsXG4gICAgICBEb20uY29udGFpbmVyXG4gICAgKTtcbiAgfVxuICBsZXQgZmVlbHNMaWtlID0gY3JlYXRlKFxuICAgICdwJyxcbiAgICAnZmVlbHNMaWtlJyxcbiAgICAnZmVlbHNMaWtlJyxcbiAgICBgRmVlbHMgTGlrZTogJHtyZXNwb25zZS5mZWVsc0xpa2V9YCxcbiAgICBEb20uY29udGFpbmVyXG4gICk7XG4gIGlmIChyZXNwb25zZS53aW5kU3BlZWQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgbGV0IHdpbmRTcGVlZCA9IGNyZWF0ZShcbiAgICAgICdwJyxcbiAgICAgICd3aW5kU3BlZWQnLFxuICAgICAgJ3dpbmRTcGVlZCcsXG4gICAgICBgV2luZCBTcGVlZDogJHtyZXNwb25zZS53aW5kU3BlZWR9IE1wSGAsXG4gICAgICBEb20uY29udGFpbmVyXG4gICAgKTtcbiAgfVxuICBpZiAocmVzcG9uc2Uud2luZEd1c3QgIT09IHVuZGVmaW5lZCkge1xuICAgIGxldCB3aW5kR3VzdCA9IGNyZWF0ZShcbiAgICAgICdwJyxcbiAgICAgICd3aW5kR3VzdCcsXG4gICAgICAnd2luZEd1c3QnLFxuICAgICAgYFdpbmQgR3VzdDogJHtyZXNwb25zZS53aW5kR3VzdH0gTXBIYCxcbiAgICAgIERvbS5jb250YWluZXJcbiAgICApO1xuICB9XG4gIGxldCBjb252ZXJ0ZWQgPSByZXNwb25zZS52aXNpYmlsaXR5IC8gMTAwMDtcbiAgbGV0IHZpc2liaWxpdHkgPSBjcmVhdGUoXG4gICAgJ3AnLFxuICAgICd2aXNpYmlsaXR5JyxcbiAgICAndmlzaWJpbGl0eScsXG4gICAgYFZpc2liaWxpdHk6ICR7Y29udmVydGVkfWttYCxcbiAgICBEb20uY29udGFpbmVyXG4gICk7XG59O1xuXG5sZXQgZ2lmVGVzdCA9IGFzeW5jICgpID0+IHtcbiAgbGV0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAnaHR0cHM6Ly9hcGkuZ2lwaHkuY29tL3YxL2dpZnMvdHJhbnNsYXRlP2FwaV9rZXk9QlJvM1ZWN2lFS25QSHIyanhPRzVTTnBnQjZDZ3pxREcmcz1yYWlueV93ZWF0aGVyJndlaXJkbmVzcz0wJyxcbiAgICB7IG1vZGU6ICdjb3JzJyB9XG4gICk7XG4gIGxldCB4ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICBjb25zb2xlLmxvZyh4KTtcbiAgaW1nLnNyYyA9IHguZGF0YS5pbWFnZXMuZG93bnNpemVkX21lZGl1bS51cmw7XG4gIERvbS5jb250YWluZXIuYXBwZW5kQ2hpbGQoaW1nKTtcbn07XG4vLyBnaWZUZXN0KCk7XG5cbmxldCBzdWJtaXRMaXN0ZW5lciA9ICgpID0+IHtcbiAgRG9tLnN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICB3aGlsZSAoRG9tLmNvbnRhaW5lci5maXJzdENoaWxkKSB7XG4gICAgICBEb20uY29udGFpbmVyLnJlbW92ZUNoaWxkKERvbS5jb250YWluZXIuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIERvbS5jb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIHRyeSB7XG4gICAgICBkaXNwbGF5Q2l0aWVzKCk7XG4gICAgfWNhdGNoKGUpe1xuICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgfVxuICAgIFxuICB9KTtcbn07XG5zdWJtaXRMaXN0ZW5lcigpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9