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

let submitListener = () => {
  _Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.submit.addEventListener('click', async () => {
    while (_Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.container.firstChild) {
      _Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.container.removeChild(_Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.container.firstChild);
    }
    displayCities();
  });
};
submitListener();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBYTtBQUNqQjtBQUNBO0FBQ0Esb0JBQW9CLCtDQUFNO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixvQkFBb0I7QUFDekMsTUFBTSwrQ0FBYTtBQUNuQjtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsK0NBQU07QUFDekI7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG1CQUFtQjtBQUN2QyxNQUFNLCtDQUFhO0FBQ25CO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiwrQ0FBTTtBQUN6QjtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsVUFBVTtBQUM3QixJQUFJLCtDQUFhO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQSxFQUFFLDZEQUEyQjtBQUM3QixXQUFXLDBEQUF3QjtBQUNuQyxNQUFNLDJEQUF5QixDQUFDLDBEQUF3QjtBQUN4RDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyYXBwLy4vc3JjL0RvbS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyYXBwLy4vc3JjL2NyZWF0ZS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXJhcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXJhcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlcmFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG5jb25zdCBEb20gPSB7XG4gIGNpdHk6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaXR5JyksXG4gIHN0YXRlOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhdGUnKSxcbiAgc3VibWl0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWl0JyksXG4gIGZvcm06IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb3JtJyksXG4gIGNvbnRhaW5lcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpLFxufTtcblxuZXhwb3J0IHsgRG9tIH07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG5jb25zdCBjcmVhdGUgPSAoZWxlbWVudCwgaWQsIGNscywgdGV4dCwgYXBwZW5kKSA9PiB7XG4gIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTtcbiAgZWwuaWQgPSBpZDtcbiAgZWwuY2xhc3NMaXN0LmFkZChjbHMpO1xuICBlbC50ZXh0Q29udGVudCA9IHRleHQ7XG4gIGFwcGVuZC5hcHBlbmRDaGlsZChlbCk7XG59O1xuXG5leHBvcnQgeyBjcmVhdGUgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyogZXNsaW50LWRpc2FibGUgbm8tcGx1c3BsdXMgKi9cbi8qIGVzbGludC1kaXNhYmxlIHByZWZlci1kZXN0cnVjdHVyaW5nICovXG4vKiBlc2xpbnQtZGlzYWJsZSBlb2wtbGFzdCAqL1xuLyogZXNsaW50LWRpc2FibGUgY29tbWEtZGFuZ2xlICovXG4vKiBlc2xpbnQtZGlzYWJsZSBwcmVmZXItY29uc3QgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG5cbi8vIGFwaSBrZXkgPSAxOWU3OTc0NDA2ZWQzNzc5MTI4YWU4ZGFhMDk1NmQ0ZlxuXG5pbXBvcnQgeyBEb20gfSBmcm9tICcuL0RvbSc7XG5pbXBvcnQgeyBjcmVhdGUgfSBmcm9tICcuL2NyZWF0ZSc7XG5cbmxldCBhcnIgPSBbXTtcbmxldCBjaXR5TmFtZSA9ICcnO1xubGV0IGdldEluaXRpYWxDb29yZGluYXRlcyA9IGFzeW5jICgpID0+IHtcbiAgbGV0IGNpdHlWYWwgPSBEb20uY2l0eS52YWx1ZTtcbiAgLy8gbGV0IHN0YXRlVmFsID0gRG9tLnN0YXRlLnZhbHVlO1xuICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICBgaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZ2VvLzEuMC9kaXJlY3Q/cT0ke2NpdHlWYWx9LDEmbGltaXQ9MTAmYXBwaWQ9MTllNzk3NDQwNmVkMzc3OTEyOGFlOGRhYTA5NTZkNGZgLFxuICAgIHsgbW9kZTogJ2NvcnMnIH1cbiAgKTtcbiAgbGV0IHVzYWJsZSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgLy8gbGV0IGxhdCA9IHVzYWJsZVswXS5sYXQ7XG4gIC8vIGxldCBsb24gPSB1c2FibGVbMF0ubG9uO1xuICBjb25zb2xlLmxvZyh1c2FibGUpO1xuICByZXR1cm4gdXNhYmxlO1xuICAvLyByZXR1cm4gW2xhdCwgbG9uXTtcbn07XG5cbmxldCBnZXRTcGVjaWZpY0Nvb3JkaW5hdGVzID0gYXN5bmMgKGNpdHksIHN0YXRlLCBjb3VudHJ5KSA9PiB7XG4gIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgIGBodHRwOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9nZW8vMS4wL2RpcmVjdD9xPSR7Y2l0eX0sJHtzdGF0ZX0sJHtjb3VudHJ5fTEmbGltaXQ9MTAmYXBwaWQ9MTllNzk3NDQwNmVkMzc3OTEyOGFlOGRhYTA5NTZkNGZgLFxuICAgIHsgbW9kZTogJ2NvcnMnIH1cbiAgKTtcbiAgbGV0IHVzYWJsZSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgY29uc29sZS5sb2codXNhYmxlKTtcbiAgbGV0IGxhdCA9IHVzYWJsZVswXS5sYXQ7XG4gIGxldCBsb24gPSB1c2FibGVbMF0ubG9uO1xuXG4gIGNvbnNvbGUubG9nKFtsYXQsIGxvbl0pO1xuICByZXR1cm4gW2xhdCwgbG9uXTtcbn07XG5cbmxldCBwaWNrQ2l0eSA9ICgpID0+IHtcbiAgbGV0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjY29udGVudCcpO1xuXG4gIGNvbnRlbnQuZm9yRWFjaCgoZSwgaSkgPT4ge1xuICAgIGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBsZXQgdGV4dCA9IGUuaW5uZXJUZXh0O1xuICAgICAgbGV0IGZvcm1hdCA9IHRleHQuc3BsaXQoJywnKTtcbiAgICAgIGFyciA9IFtdO1xuICAgICAgYXJyLnB1c2goZm9ybWF0WzBdLCBmb3JtYXRbMV0sIGZvcm1hdFsyXSk7XG4gICAgICBjaXR5TmFtZSA9IGZvcm1hdFswXTtcbiAgICAgIGNvbnNvbGUubG9nKGNpdHlOYW1lKTtcbiAgICAgIGNvbnNvbGUubG9nKGFycik7XG4gICAgICAvLyByZW1vdmUgd2hvbGUgbGlzdCBvZiBjaXRpZXNcbiAgICAgIHdoaWxlIChEb20uY29udGFpbmVyLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgRG9tLmNvbnRhaW5lci5yZW1vdmVDaGlsZChEb20uY29udGFpbmVyLmZpcnN0Q2hpbGQpO1xuICAgICAgfVxuICAgICAgZGlzcGxheVdlYXRoZXIoKTtcbiAgICB9KTtcbiAgfSk7XG4gIGNvbnNvbGUubG9nKGFycik7XG59O1xuXG5sZXQgZGlzcGxheUNpdGllcyA9IGFzeW5jICgpID0+IHtcbiAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZ2V0SW5pdGlhbENvb3JkaW5hdGVzKCk7XG4gIHJlc3BvbnNlLmZvckVhY2goKGUsIGkpID0+IHtcbiAgICBsZXQgY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBjb250ZW50LnRleHRDb250ZW50ID0gYCR7ZS5uYW1lfSwgJHtlLnN0YXRlfSwgJHtlLmNvdW50cnl9YDtcbiAgICBEb20uY29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuICAgIGNvbnRlbnQuaWQgPSAnY29udGVudCc7XG4gIH0pO1xuICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gIHBpY2tDaXR5KCk7XG59O1xuXG5sZXQgZ2V0V2VhdGhlciA9IGFzeW5jIChpbml0aWFsT3JTcGVjaWZpYykgPT4ge1xuICBsZXQgY29vcmRzID0gYXdhaXQgaW5pdGlhbE9yU3BlY2lmaWM7XG4gIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9sYXQ9JHtjb29yZHNbMF19Jmxvbj0ke2Nvb3Jkc1sxXX0mdW5pdHM9aW1wZXJpYWwmYXBwaWQ9MTllNzk3NDQwNmVkMzc3OTEyOGFlOGRhYTA5NTZkNGZgXG4gICk7XG4gIGxldCB3ZWF0aGVyID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICBjb25zb2xlLmxvZyh3ZWF0aGVyKTtcbiAgcmV0dXJuIHdlYXRoZXI7XG59O1xuXG4vLyBsZXQgZGlzcGxheVBpY2tlZENpdHkgPSAoKSA9PiB7XG4vLyAgIGZvcm1hdFdlYXRoZXIoZ2V0U3BlY2lmaWNDb29yZGluYXRlcyhgJHthcnJbMF19YCwgYCR7YXJyWzFdfWAsIGAke2FyclsyXX1gKSk7XG4vLyAgIC8vIHJldHVybnMgd2VhdGhlciBvYmplY3RcblxuLy8gfTtcblxuY2xhc3MgV2VhdGhlck9iaiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHRlbXAsXG4gICAgZmVlbHNMaWtlLFxuICAgIGNpdHksXG4gICAgY2xvdWRDb3ZlcixcbiAgICBodW1pZGl0eSxcbiAgICBjb25kaXRpb25zLFxuICAgIGNvbmRpdGlvbnNEZXNjLFxuICAgIHdpbmRTcGVlZCxcbiAgICB3aW5kR3VzdCxcbiAgICB2aXNpYmlsaXR5XG4gICkge1xuICAgIHRoaXMudGVtcCA9IHRlbXA7XG4gICAgdGhpcy5mZWVsc0xpa2UgPSBmZWVsc0xpa2U7XG4gICAgdGhpcy5jaXR5ID0gY2l0eTtcbiAgICB0aGlzLmNsb3VkQ292ZXIgPSBjbG91ZENvdmVyO1xuICAgIHRoaXMuaHVtaWRpdHkgPSBodW1pZGl0eTtcbiAgICB0aGlzLmNvbmRpdGlvbnMgPSBjb25kaXRpb25zO1xuICAgIHRoaXMuY29uZGl0aW9uc0Rlc2MgPSBjb25kaXRpb25zRGVzYztcbiAgICB0aGlzLndpbmRTcGVlZCA9IHdpbmRTcGVlZDtcbiAgICB0aGlzLndpbmRHdXN0ID0gd2luZEd1c3Q7XG4gICAgdGhpcy52aXNpYmlsaXR5ID0gdmlzaWJpbGl0eTtcbiAgfVxufVxuXG5sZXQgZm9ybWF0V2VhdGhlciA9IGFzeW5jICgpID0+IHtcbiAgbGV0IHdlYXRoZXIgPSBhd2FpdCBnZXRXZWF0aGVyKFxuICAgIGdldFNwZWNpZmljQ29vcmRpbmF0ZXMoYCR7YXJyWzBdfWAsIGAke2FyclsxXX1gLCBgJHthcnJbMl19YClcbiAgKTtcbiAgbGV0IGZvcm1hdCA9IG5ldyBXZWF0aGVyT2JqKFxuICAgIHdlYXRoZXIubWFpbi50ZW1wLFxuICAgIHdlYXRoZXIubWFpbi5mZWVsc19saWtlLFxuICAgIHdlYXRoZXIubmFtZSxcbiAgICB3ZWF0aGVyLmNsb3Vkcy5hbGwsXG4gICAgd2VhdGhlci5tYWluLmh1bWlkaXR5LFxuICAgIHdlYXRoZXIud2VhdGhlclswXS5tYWluLFxuICAgIHdlYXRoZXIud2VhdGhlclswXS5kZXNjcmlwdGlvbixcbiAgICB3ZWF0aGVyLndpbmQuc3BlZWQsXG4gICAgd2VhdGhlci53aW5kLmd1c3QsXG4gICAgd2VhdGhlci52aXNpYmlsaXR5XG4gICk7XG5cbiAgLy8gICBjb25zb2xlLmxvZyh3ZWF0aGVyLm1haW4uZmVlbHNfbGlrZSk7XG4gIHJldHVybiBmb3JtYXQ7XG59O1xuXG5sZXQgZGlzcGxheVdlYXRoZXIgPSBhc3luYyAoKSA9PiB7XG4gIGxldCByZXNwb25zZSA9IGF3YWl0IGZvcm1hdFdlYXRoZXIoKTtcbiAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICBsZXQgdGl0bGUgPSBjcmVhdGUoXG4gICAgJ2gyJyxcbiAgICAndGl0bGUnLFxuICAgICd0aXRsZScsXG4gICAgYFdlYXRoZXIgZm9yICR7Y2l0eU5hbWV9YCxcbiAgICBEb20uY29udGFpbmVyXG4gICk7XG4gIGxldCB0ZW1wID0gY3JlYXRlKFxuICAgICdwJyxcbiAgICAndGVtcCcsXG4gICAgJ3RlbXAnLFxuICAgIGBUZW1wZXJhdHVyZTogJHtyZXNwb25zZS50ZW1wfWAsXG4gICAgRG9tLmNvbnRhaW5lclxuICApO1xuICBsZXQgY29uZGl0aW9ucyA9IGNyZWF0ZShcbiAgICAncCcsXG4gICAgJ2NvbmRpdGlvbnMnLFxuICAgICdjb25kaXRpb25zJyxcbiAgICBgQ29uZGl0aW9uczogJHtyZXNwb25zZS5jb25kaXRpb25zfSAoJHtyZXNwb25zZS5jb25kaXRpb25zRGVzY30pYCxcbiAgICBEb20uY29udGFpbmVyXG4gICk7XG4gIGxldCBjbG91ZENvdmVyID0gY3JlYXRlKFxuICAgICdwJyxcbiAgICAnY2xvdWRDb3ZlcicsXG4gICAgJ2Nsb3VkQ292ZXInLFxuICAgIGBDbG91ZCBDb3ZlcjogJHtyZXNwb25zZS5jbG91ZENvdmVyfSVgLFxuICAgIERvbS5jb250YWluZXJcbiAgKTtcbiAgaWYgKHJlc3BvbnNlLmh1bWlkaXR5ICE9PSB1bmRlZmluZWQpIHtcbiAgICBsZXQgaHVtaWRpdHkgPSBjcmVhdGUoXG4gICAgICAncCcsXG4gICAgICAnaHVtaWRpdHknLFxuICAgICAgJ2h1bWlkaXR5JyxcbiAgICAgIGBIdW1pZGl0eTogJHtyZXNwb25zZS5odW1pZGl0eX0lYCxcbiAgICAgIERvbS5jb250YWluZXJcbiAgICApO1xuICB9XG4gIGxldCBmZWVsc0xpa2UgPSBjcmVhdGUoXG4gICAgJ3AnLFxuICAgICdmZWVsc0xpa2UnLFxuICAgICdmZWVsc0xpa2UnLFxuICAgIGBGZWVscyBMaWtlOiAke3Jlc3BvbnNlLmZlZWxzTGlrZX1gLFxuICAgIERvbS5jb250YWluZXJcbiAgKTtcbiAgaWYgKHJlc3BvbnNlLndpbmRTcGVlZCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBsZXQgd2luZFNwZWVkID0gY3JlYXRlKFxuICAgICAgJ3AnLFxuICAgICAgJ3dpbmRTcGVlZCcsXG4gICAgICAnd2luZFNwZWVkJyxcbiAgICAgIGBXaW5kIFNwZWVkOiAke3Jlc3BvbnNlLndpbmRTcGVlZH0gTXBIYCxcbiAgICAgIERvbS5jb250YWluZXJcbiAgICApO1xuICB9XG4gIGlmIChyZXNwb25zZS53aW5kR3VzdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IHdpbmRHdXN0ID0gY3JlYXRlKFxuICAgICAgJ3AnLFxuICAgICAgJ3dpbmRHdXN0JyxcbiAgICAgICd3aW5kR3VzdCcsXG4gICAgICBgV2luZCBHdXN0OiAke3Jlc3BvbnNlLndpbmRHdXN0fSBNcEhgLFxuICAgICAgRG9tLmNvbnRhaW5lclxuICAgICk7XG4gIH1cbiAgbGV0IGNvbnZlcnRlZCA9IHJlc3BvbnNlLnZpc2liaWxpdHkgLyAxMDAwO1xuICBsZXQgdmlzaWJpbGl0eSA9IGNyZWF0ZShcbiAgICAncCcsXG4gICAgJ3Zpc2liaWxpdHknLFxuICAgICd2aXNpYmlsaXR5JyxcbiAgICBgVmlzaWJpbGl0eTogJHtjb252ZXJ0ZWR9a21gLFxuICAgIERvbS5jb250YWluZXJcbiAgKTtcbn07XG5cbmxldCBzdWJtaXRMaXN0ZW5lciA9ICgpID0+IHtcbiAgRG9tLnN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICB3aGlsZSAoRG9tLmNvbnRhaW5lci5maXJzdENoaWxkKSB7XG4gICAgICBEb20uY29udGFpbmVyLnJlbW92ZUNoaWxkKERvbS5jb250YWluZXIuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIGRpc3BsYXlDaXRpZXMoKTtcbiAgfSk7XG59O1xuc3VibWl0TGlzdGVuZXIoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==