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

let gifTest = async () => {
  let img = document.createElement('img');
  let response = await fetch('https://api.giphy.com/v1/gifs/translate?api_key=BRo3VV7iEKnPHr2jxOG5SNpgB6CgzqDG&s=rainy_weather&weirdness=0', { mode: 'cors' });
  let x = await response.json();
  console.log(x);
  img.src = x.data.images.downsized_medium.url;
  _Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.container.appendChild(img);
};
gifTest();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBYTtBQUNqQjtBQUNBO0FBQ0Esb0JBQW9CLCtDQUFNO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixvQkFBb0I7QUFDekMsTUFBTSwrQ0FBYTtBQUNuQjtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsK0NBQU07QUFDekI7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG1CQUFtQjtBQUN2QyxNQUFNLCtDQUFhO0FBQ25CO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiwrQ0FBTTtBQUN6QjtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsVUFBVTtBQUM3QixJQUFJLCtDQUFhO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLCtJQUErSSxjQUFjO0FBQzdKO0FBQ0E7QUFDQTtBQUNBLEVBQUUsMkRBQXlCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLEVBQUUsNkRBQTJCO0FBQzdCLFdBQVcsMERBQXdCO0FBQ25DLE1BQU0sMkRBQXlCLENBQUMsMERBQXdCO0FBQ3hEO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXJhcHAvLi9zcmMvRG9tLmpzIiwid2VicGFjazovL3dlYXRoZXJhcHAvLi9zcmMvY3JlYXRlLmpzIiwid2VicGFjazovL3dlYXRoZXJhcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlcmFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlcmFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXJhcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cbmNvbnN0IERvbSA9IHtcbiAgY2l0eTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NpdHknKSxcbiAgc3RhdGU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGF0ZScpLFxuICBzdWJtaXQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJtaXQnKSxcbiAgZm9ybTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvcm0nKSxcbiAgY29udGFpbmVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJyksXG59O1xuXG5leHBvcnQgeyBEb20gfTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cbmNvbnN0IGNyZWF0ZSA9IChlbGVtZW50LCBpZCwgY2xzLCB0ZXh0LCBhcHBlbmQpID0+IHtcbiAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xuICBlbC5pZCA9IGlkO1xuICBlbC5jbGFzc0xpc3QuYWRkKGNscyk7XG4gIGVsLnRleHRDb250ZW50ID0gdGV4dDtcbiAgYXBwZW5kLmFwcGVuZENoaWxkKGVsKTtcbn07XG5cbmV4cG9ydCB7IGNyZWF0ZSB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xuLyogZXNsaW50LWRpc2FibGUgcHJlZmVyLWRlc3RydWN0dXJpbmcgKi9cbi8qIGVzbGludC1kaXNhYmxlIGVvbC1sYXN0ICovXG4vKiBlc2xpbnQtZGlzYWJsZSBjb21tYS1kYW5nbGUgKi9cbi8qIGVzbGludC1kaXNhYmxlIHByZWZlci1jb25zdCAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cblxuLy8gYXBpIGtleSA9IDE5ZTc5NzQ0MDZlZDM3NzkxMjhhZThkYWEwOTU2ZDRmXG5cbmltcG9ydCB7IERvbSB9IGZyb20gJy4vRG9tJztcbmltcG9ydCB7IGNyZWF0ZSB9IGZyb20gJy4vY3JlYXRlJztcblxubGV0IGFyciA9IFtdO1xubGV0IGNpdHlOYW1lID0gJyc7XG5sZXQgZ2V0SW5pdGlhbENvb3JkaW5hdGVzID0gYXN5bmMgKCkgPT4ge1xuICBsZXQgY2l0eVZhbCA9IERvbS5jaXR5LnZhbHVlO1xuICAvLyBsZXQgc3RhdGVWYWwgPSBEb20uc3RhdGUudmFsdWU7XG4gIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgIGBodHRwOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9nZW8vMS4wL2RpcmVjdD9xPSR7Y2l0eVZhbH0sMSZsaW1pdD0xMCZhcHBpZD0xOWU3OTc0NDA2ZWQzNzc5MTI4YWU4ZGFhMDk1NmQ0ZmAsXG4gICAgeyBtb2RlOiAnY29ycycgfVxuICApO1xuICBsZXQgdXNhYmxlID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAvLyBsZXQgbGF0ID0gdXNhYmxlWzBdLmxhdDtcbiAgLy8gbGV0IGxvbiA9IHVzYWJsZVswXS5sb247XG4gIGNvbnNvbGUubG9nKHVzYWJsZSk7XG4gIHJldHVybiB1c2FibGU7XG4gIC8vIHJldHVybiBbbGF0LCBsb25dO1xufTtcblxubGV0IGdldFNwZWNpZmljQ29vcmRpbmF0ZXMgPSBhc3luYyAoY2l0eSwgc3RhdGUsIGNvdW50cnkpID0+IHtcbiAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgYGh0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2dlby8xLjAvZGlyZWN0P3E9JHtjaXR5fSwke3N0YXRlfSwke2NvdW50cnl9MSZsaW1pdD0xMCZhcHBpZD0xOWU3OTc0NDA2ZWQzNzc5MTI4YWU4ZGFhMDk1NmQ0ZmAsXG4gICAgeyBtb2RlOiAnY29ycycgfVxuICApO1xuICBsZXQgdXNhYmxlID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICBjb25zb2xlLmxvZyh1c2FibGUpO1xuICBsZXQgbGF0ID0gdXNhYmxlWzBdLmxhdDtcbiAgbGV0IGxvbiA9IHVzYWJsZVswXS5sb247XG5cbiAgY29uc29sZS5sb2coW2xhdCwgbG9uXSk7XG4gIHJldHVybiBbbGF0LCBsb25dO1xufTtcblxubGV0IHBpY2tDaXR5ID0gKCkgPT4ge1xuICBsZXQgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNjb250ZW50Jyk7XG5cbiAgY29udGVudC5mb3JFYWNoKChlLCBpKSA9PiB7XG4gICAgZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGxldCB0ZXh0ID0gZS5pbm5lclRleHQ7XG4gICAgICBsZXQgZm9ybWF0ID0gdGV4dC5zcGxpdCgnLCcpO1xuICAgICAgYXJyID0gW107XG4gICAgICBhcnIucHVzaChmb3JtYXRbMF0sIGZvcm1hdFsxXSwgZm9ybWF0WzJdKTtcbiAgICAgIGNpdHlOYW1lID0gZm9ybWF0WzBdO1xuICAgICAgY29uc29sZS5sb2coY2l0eU5hbWUpO1xuICAgICAgY29uc29sZS5sb2coYXJyKTtcbiAgICAgIC8vIHJlbW92ZSB3aG9sZSBsaXN0IG9mIGNpdGllc1xuICAgICAgd2hpbGUgKERvbS5jb250YWluZXIuZmlyc3RDaGlsZCkge1xuICAgICAgICBEb20uY29udGFpbmVyLnJlbW92ZUNoaWxkKERvbS5jb250YWluZXIuZmlyc3RDaGlsZCk7XG4gICAgICB9XG4gICAgICBkaXNwbGF5V2VhdGhlcigpO1xuICAgIH0pO1xuICB9KTtcbiAgY29uc29sZS5sb2coYXJyKTtcbn07XG5cbmxldCBkaXNwbGF5Q2l0aWVzID0gYXN5bmMgKCkgPT4ge1xuICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBnZXRJbml0aWFsQ29vcmRpbmF0ZXMoKTtcbiAgcmVzcG9uc2UuZm9yRWFjaCgoZSwgaSkgPT4ge1xuICAgIGxldCBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIGNvbnRlbnQudGV4dENvbnRlbnQgPSBgJHtlLm5hbWV9LCAke2Uuc3RhdGV9LCAke2UuY291bnRyeX1gO1xuICAgIERvbS5jb250YWluZXIuYXBwZW5kQ2hpbGQoY29udGVudCk7XG4gICAgY29udGVudC5pZCA9ICdjb250ZW50JztcbiAgfSk7XG4gIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgcGlja0NpdHkoKTtcbn07XG5cbmxldCBnZXRXZWF0aGVyID0gYXN5bmMgKGluaXRpYWxPclNwZWNpZmljKSA9PiB7XG4gIGxldCBjb29yZHMgPSBhd2FpdCBpbml0aWFsT3JTcGVjaWZpYztcbiAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP2xhdD0ke2Nvb3Jkc1swXX0mbG9uPSR7Y29vcmRzWzFdfSZ1bml0cz1pbXBlcmlhbCZhcHBpZD0xOWU3OTc0NDA2ZWQzNzc5MTI4YWU4ZGFhMDk1NmQ0ZmBcbiAgKTtcbiAgbGV0IHdlYXRoZXIgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gIGNvbnNvbGUubG9nKHdlYXRoZXIpO1xuICByZXR1cm4gd2VhdGhlcjtcbn07XG5cbi8vIGxldCBkaXNwbGF5UGlja2VkQ2l0eSA9ICgpID0+IHtcbi8vICAgZm9ybWF0V2VhdGhlcihnZXRTcGVjaWZpY0Nvb3JkaW5hdGVzKGAke2FyclswXX1gLCBgJHthcnJbMV19YCwgYCR7YXJyWzJdfWApKTtcbi8vICAgLy8gcmV0dXJucyB3ZWF0aGVyIG9iamVjdFxuXG4vLyB9O1xuXG5jbGFzcyBXZWF0aGVyT2JqIHtcbiAgY29uc3RydWN0b3IoXG4gICAgdGVtcCxcbiAgICBmZWVsc0xpa2UsXG4gICAgY2l0eSxcbiAgICBjbG91ZENvdmVyLFxuICAgIGh1bWlkaXR5LFxuICAgIGNvbmRpdGlvbnMsXG4gICAgY29uZGl0aW9uc0Rlc2MsXG4gICAgd2luZFNwZWVkLFxuICAgIHdpbmRHdXN0LFxuICAgIHZpc2liaWxpdHlcbiAgKSB7XG4gICAgdGhpcy50ZW1wID0gdGVtcDtcbiAgICB0aGlzLmZlZWxzTGlrZSA9IGZlZWxzTGlrZTtcbiAgICB0aGlzLmNpdHkgPSBjaXR5O1xuICAgIHRoaXMuY2xvdWRDb3ZlciA9IGNsb3VkQ292ZXI7XG4gICAgdGhpcy5odW1pZGl0eSA9IGh1bWlkaXR5O1xuICAgIHRoaXMuY29uZGl0aW9ucyA9IGNvbmRpdGlvbnM7XG4gICAgdGhpcy5jb25kaXRpb25zRGVzYyA9IGNvbmRpdGlvbnNEZXNjO1xuICAgIHRoaXMud2luZFNwZWVkID0gd2luZFNwZWVkO1xuICAgIHRoaXMud2luZEd1c3QgPSB3aW5kR3VzdDtcbiAgICB0aGlzLnZpc2liaWxpdHkgPSB2aXNpYmlsaXR5O1xuICB9XG59XG5cbmxldCBmb3JtYXRXZWF0aGVyID0gYXN5bmMgKCkgPT4ge1xuICBsZXQgd2VhdGhlciA9IGF3YWl0IGdldFdlYXRoZXIoXG4gICAgZ2V0U3BlY2lmaWNDb29yZGluYXRlcyhgJHthcnJbMF19YCwgYCR7YXJyWzFdfWAsIGAke2FyclsyXX1gKVxuICApO1xuICBsZXQgZm9ybWF0ID0gbmV3IFdlYXRoZXJPYmooXG4gICAgd2VhdGhlci5tYWluLnRlbXAsXG4gICAgd2VhdGhlci5tYWluLmZlZWxzX2xpa2UsXG4gICAgd2VhdGhlci5uYW1lLFxuICAgIHdlYXRoZXIuY2xvdWRzLmFsbCxcbiAgICB3ZWF0aGVyLm1haW4uaHVtaWRpdHksXG4gICAgd2VhdGhlci53ZWF0aGVyWzBdLm1haW4sXG4gICAgd2VhdGhlci53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLFxuICAgIHdlYXRoZXIud2luZC5zcGVlZCxcbiAgICB3ZWF0aGVyLndpbmQuZ3VzdCxcbiAgICB3ZWF0aGVyLnZpc2liaWxpdHlcbiAgKTtcblxuICAvLyAgIGNvbnNvbGUubG9nKHdlYXRoZXIubWFpbi5mZWVsc19saWtlKTtcbiAgcmV0dXJuIGZvcm1hdDtcbn07XG5cbmxldCBkaXNwbGF5V2VhdGhlciA9IGFzeW5jICgpID0+IHtcbiAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZm9ybWF0V2VhdGhlcigpO1xuICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gIGxldCB0aXRsZSA9IGNyZWF0ZShcbiAgICAnaDInLFxuICAgICd0aXRsZScsXG4gICAgJ3RpdGxlJyxcbiAgICBgV2VhdGhlciBmb3IgJHtjaXR5TmFtZX1gLFxuICAgIERvbS5jb250YWluZXJcbiAgKTtcbiAgbGV0IHRlbXAgPSBjcmVhdGUoXG4gICAgJ3AnLFxuICAgICd0ZW1wJyxcbiAgICAndGVtcCcsXG4gICAgYFRlbXBlcmF0dXJlOiAke3Jlc3BvbnNlLnRlbXB9YCxcbiAgICBEb20uY29udGFpbmVyXG4gICk7XG4gIGxldCBjb25kaXRpb25zID0gY3JlYXRlKFxuICAgICdwJyxcbiAgICAnY29uZGl0aW9ucycsXG4gICAgJ2NvbmRpdGlvbnMnLFxuICAgIGBDb25kaXRpb25zOiAke3Jlc3BvbnNlLmNvbmRpdGlvbnN9ICgke3Jlc3BvbnNlLmNvbmRpdGlvbnNEZXNjfSlgLFxuICAgIERvbS5jb250YWluZXJcbiAgKTtcbiAgbGV0IGNsb3VkQ292ZXIgPSBjcmVhdGUoXG4gICAgJ3AnLFxuICAgICdjbG91ZENvdmVyJyxcbiAgICAnY2xvdWRDb3ZlcicsXG4gICAgYENsb3VkIENvdmVyOiAke3Jlc3BvbnNlLmNsb3VkQ292ZXJ9JWAsXG4gICAgRG9tLmNvbnRhaW5lclxuICApO1xuICBpZiAocmVzcG9uc2UuaHVtaWRpdHkgIT09IHVuZGVmaW5lZCkge1xuICAgIGxldCBodW1pZGl0eSA9IGNyZWF0ZShcbiAgICAgICdwJyxcbiAgICAgICdodW1pZGl0eScsXG4gICAgICAnaHVtaWRpdHknLFxuICAgICAgYEh1bWlkaXR5OiAke3Jlc3BvbnNlLmh1bWlkaXR5fSVgLFxuICAgICAgRG9tLmNvbnRhaW5lclxuICAgICk7XG4gIH1cbiAgbGV0IGZlZWxzTGlrZSA9IGNyZWF0ZShcbiAgICAncCcsXG4gICAgJ2ZlZWxzTGlrZScsXG4gICAgJ2ZlZWxzTGlrZScsXG4gICAgYEZlZWxzIExpa2U6ICR7cmVzcG9uc2UuZmVlbHNMaWtlfWAsXG4gICAgRG9tLmNvbnRhaW5lclxuICApO1xuICBpZiAocmVzcG9uc2Uud2luZFNwZWVkICE9PSAndW5kZWZpbmVkJykge1xuICAgIGxldCB3aW5kU3BlZWQgPSBjcmVhdGUoXG4gICAgICAncCcsXG4gICAgICAnd2luZFNwZWVkJyxcbiAgICAgICd3aW5kU3BlZWQnLFxuICAgICAgYFdpbmQgU3BlZWQ6ICR7cmVzcG9uc2Uud2luZFNwZWVkfSBNcEhgLFxuICAgICAgRG9tLmNvbnRhaW5lclxuICAgICk7XG4gIH1cbiAgaWYgKHJlc3BvbnNlLndpbmRHdXN0ICE9PSB1bmRlZmluZWQpIHtcbiAgICBsZXQgd2luZEd1c3QgPSBjcmVhdGUoXG4gICAgICAncCcsXG4gICAgICAnd2luZEd1c3QnLFxuICAgICAgJ3dpbmRHdXN0JyxcbiAgICAgIGBXaW5kIEd1c3Q6ICR7cmVzcG9uc2Uud2luZEd1c3R9IE1wSGAsXG4gICAgICBEb20uY29udGFpbmVyXG4gICAgKTtcbiAgfVxuICBsZXQgY29udmVydGVkID0gcmVzcG9uc2UudmlzaWJpbGl0eSAvIDEwMDA7XG4gIGxldCB2aXNpYmlsaXR5ID0gY3JlYXRlKFxuICAgICdwJyxcbiAgICAndmlzaWJpbGl0eScsXG4gICAgJ3Zpc2liaWxpdHknLFxuICAgIGBWaXNpYmlsaXR5OiAke2NvbnZlcnRlZH1rbWAsXG4gICAgRG9tLmNvbnRhaW5lclxuICApO1xufTtcblxubGV0IGdpZlRlc3QgPSBhc3luYyAoKSA9PiB7XG4gIGxldCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vYXBpLmdpcGh5LmNvbS92MS9naWZzL3RyYW5zbGF0ZT9hcGlfa2V5PUJSbzNWVjdpRUtuUEhyMmp4T0c1U05wZ0I2Q2d6cURHJnM9cmFpbnlfd2VhdGhlciZ3ZWlyZG5lc3M9MCcsIHsgbW9kZTogJ2NvcnMnIH0pO1xuICBsZXQgeCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgY29uc29sZS5sb2coeCk7XG4gIGltZy5zcmMgPSB4LmRhdGEuaW1hZ2VzLmRvd25zaXplZF9tZWRpdW0udXJsO1xuICBEb20uY29udGFpbmVyLmFwcGVuZENoaWxkKGltZyk7XG59O1xuZ2lmVGVzdCgpO1xubGV0IHN1Ym1pdExpc3RlbmVyID0gKCkgPT4ge1xuICBEb20uc3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xuICAgIHdoaWxlIChEb20uY29udGFpbmVyLmZpcnN0Q2hpbGQpIHtcbiAgICAgIERvbS5jb250YWluZXIucmVtb3ZlQ2hpbGQoRG9tLmNvbnRhaW5lci5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgZGlzcGxheUNpdGllcygpO1xuICB9KTtcbn07XG5zdWJtaXRMaXN0ZW5lcigpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9