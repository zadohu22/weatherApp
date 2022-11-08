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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0EsbUJBQW1CLCtDQUFNO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixvQkFBb0I7QUFDeEMsSUFBSSwrQ0FBYTtBQUNqQjtBQUNBO0FBQ0EsbUJBQW1CLCtDQUFNO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixrQkFBa0I7QUFDckMsTUFBTSwrQ0FBYTtBQUNuQjtBQUNBO0FBQ0Esa0JBQWtCLCtDQUFNO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixtQkFBbUI7QUFDdEMsSUFBSSwrQ0FBYTtBQUNqQjtBQUNBO0FBQ0Esb0JBQW9CLCtDQUFNO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixvQkFBb0I7QUFDekMsTUFBTSwrQ0FBYTtBQUNuQjtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsK0NBQU07QUFDekI7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG1CQUFtQjtBQUN2QyxNQUFNLCtDQUFhO0FBQ25CO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiwrQ0FBTTtBQUN6QjtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsVUFBVTtBQUM3QixJQUFJLCtDQUFhO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSwyREFBeUI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLDZEQUEyQjtBQUM3QixXQUFXLDBEQUF3QjtBQUNuQyxNQUFNLDJEQUF5QixDQUFDLDBEQUF3QjtBQUN4RDtBQUNBLElBQUksZ0VBQThCO0FBQ2xDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyYXBwLy4vc3JjL0RvbS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyYXBwLy4vc3JjL2NyZWF0ZS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXJhcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXJhcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlcmFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXHJcbmNvbnN0IERvbSA9IHtcclxuICBjaXR5OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2l0eScpLFxyXG4gIHN0YXRlOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhdGUnKSxcclxuICBzdWJtaXQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJtaXQnKSxcclxuICBmb3JtOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9ybScpLFxyXG4gIGNvbnRhaW5lcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpLFxyXG59O1xyXG5cclxuZXhwb3J0IHsgRG9tIH07XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cclxuY29uc3QgY3JlYXRlID0gKGVsZW1lbnQsIGlkLCBjbHMsIHRleHQsIGFwcGVuZCkgPT4ge1xyXG4gIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTtcclxuICBlbC5pZCA9IGlkO1xyXG4gIGVsLmNsYXNzTGlzdC5hZGQoY2xzKTtcclxuICBlbC50ZXh0Q29udGVudCA9IHRleHQ7XHJcbiAgYXBwZW5kLmFwcGVuZENoaWxkKGVsKTtcclxufTtcclxuXHJcbmV4cG9ydCB7IGNyZWF0ZSB9O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXBsdXNwbHVzICovXHJcbi8qIGVzbGludC1kaXNhYmxlIHByZWZlci1kZXN0cnVjdHVyaW5nICovXHJcbi8qIGVzbGludC1kaXNhYmxlIGVvbC1sYXN0ICovXHJcbi8qIGVzbGludC1kaXNhYmxlIGNvbW1hLWRhbmdsZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBwcmVmZXItY29uc3QgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xyXG5cclxuLy8gYXBpIGtleSA9IDE5ZTc5NzQ0MDZlZDM3NzkxMjhhZThkYWEwOTU2ZDRmXHJcblxyXG5pbXBvcnQgeyBEb20gfSBmcm9tICcuL0RvbSc7XHJcbmltcG9ydCB7IGNyZWF0ZSB9IGZyb20gJy4vY3JlYXRlJztcclxuXHJcbmxldCBhcnIgPSBbXTtcclxubGV0IGNpdHlOYW1lID0gJyc7XHJcbmxldCBnZXRJbml0aWFsQ29vcmRpbmF0ZXMgPSBhc3luYyAoKSA9PiB7XHJcbiAgbGV0IGNpdHlWYWwgPSBEb20uY2l0eS52YWx1ZTtcclxuICAvLyBsZXQgc3RhdGVWYWwgPSBEb20uc3RhdGUudmFsdWU7XHJcbiAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXHJcbiAgICBgaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZ2VvLzEuMC9kaXJlY3Q/cT0ke2NpdHlWYWx9LDEmbGltaXQ9MTAmYXBwaWQ9MTllNzk3NDQwNmVkMzc3OTEyOGFlOGRhYTA5NTZkNGZgLFxyXG4gICAgeyBtb2RlOiAnY29ycycgfVxyXG4gICk7XHJcbiAgbGV0IHVzYWJsZSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAvLyBsZXQgbGF0ID0gdXNhYmxlWzBdLmxhdDtcclxuICAvLyBsZXQgbG9uID0gdXNhYmxlWzBdLmxvbjtcclxuICBjb25zb2xlLmxvZyh1c2FibGUpO1xyXG4gIHJldHVybiB1c2FibGU7XHJcbiAgLy8gcmV0dXJuIFtsYXQsIGxvbl07XHJcbn07XHJcblxyXG5sZXQgZ2V0U3BlY2lmaWNDb29yZGluYXRlcyA9IGFzeW5jIChjaXR5LCBzdGF0ZSwgY291bnRyeSkgPT4ge1xyXG4gIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxyXG4gICAgYGh0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2dlby8xLjAvZGlyZWN0P3E9JHtjaXR5fSwke3N0YXRlfSwke2NvdW50cnl9MSZsaW1pdD0xMCZhcHBpZD0xOWU3OTc0NDA2ZWQzNzc5MTI4YWU4ZGFhMDk1NmQ0ZmAsXHJcbiAgICB7IG1vZGU6ICdjb3JzJyB9XHJcbiAgKTtcclxuICBsZXQgdXNhYmxlID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gIGNvbnNvbGUubG9nKHVzYWJsZSk7XHJcbiAgbGV0IGxhdCA9IHVzYWJsZVswXS5sYXQ7XHJcbiAgbGV0IGxvbiA9IHVzYWJsZVswXS5sb247XHJcblxyXG4gIGNvbnNvbGUubG9nKFtsYXQsIGxvbl0pO1xyXG4gIHJldHVybiBbbGF0LCBsb25dO1xyXG59O1xyXG5cclxubGV0IHBpY2tDaXR5ID0gKCkgPT4ge1xyXG4gIGxldCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2NvbnRlbnQnKTtcclxuXHJcbiAgY29udGVudC5mb3JFYWNoKChlLCBpKSA9PiB7XHJcbiAgICBlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICBsZXQgdGV4dCA9IGUuaW5uZXJUZXh0O1xyXG4gICAgICBsZXQgZm9ybWF0ID0gdGV4dC5zcGxpdCgnLCcpO1xyXG4gICAgICBhcnIgPSBbXTtcclxuICAgICAgYXJyLnB1c2goZm9ybWF0WzBdLCBmb3JtYXRbMV0sIGZvcm1hdFsyXSk7XHJcbiAgICAgIGNpdHlOYW1lID0gZm9ybWF0WzBdO1xyXG4gICAgICBjb25zb2xlLmxvZyhjaXR5TmFtZSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKGFycik7XHJcbiAgICAgIC8vIHJlbW92ZSB3aG9sZSBsaXN0IG9mIGNpdGllc1xyXG4gICAgICB3aGlsZSAoRG9tLmNvbnRhaW5lci5maXJzdENoaWxkKSB7XHJcbiAgICAgICAgRG9tLmNvbnRhaW5lci5yZW1vdmVDaGlsZChEb20uY29udGFpbmVyLmZpcnN0Q2hpbGQpO1xyXG4gICAgICB9XHJcbiAgICAgIGRpc3BsYXlXZWF0aGVyKCk7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBjb25zb2xlLmxvZyhhcnIpO1xyXG59O1xyXG5cclxubGV0IGRpc3BsYXlDaXRpZXMgPSBhc3luYyAoKSA9PiB7XHJcbiAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZ2V0SW5pdGlhbENvb3JkaW5hdGVzKCk7XHJcbiAgcmVzcG9uc2UuZm9yRWFjaCgoZSwgaSkgPT4ge1xyXG4gICAgbGV0IGNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICBjb250ZW50LnRleHRDb250ZW50ID0gYCR7ZS5uYW1lfSwgJHtlLnN0YXRlfSwgJHtlLmNvdW50cnl9YDtcclxuICAgIGNvbnRlbnQuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XHJcbiAgICBEb20uY29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnRlbnQpO1xyXG4gICAgY29udGVudC5pZCA9ICdjb250ZW50JztcclxuICB9KTtcclxuICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcbiAgcGlja0NpdHkoKTtcclxufTtcclxuXHJcbmxldCBnZXRXZWF0aGVyID0gYXN5bmMgKGluaXRpYWxPclNwZWNpZmljKSA9PiB7XHJcbiAgbGV0IGNvb3JkcyA9IGF3YWl0IGluaXRpYWxPclNwZWNpZmljO1xyXG4gIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxyXG4gICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP2xhdD0ke2Nvb3Jkc1swXX0mbG9uPSR7Y29vcmRzWzFdfSZ1bml0cz1pbXBlcmlhbCZhcHBpZD0xOWU3OTc0NDA2ZWQzNzc5MTI4YWU4ZGFhMDk1NmQ0ZmBcclxuICApO1xyXG4gIGxldCB3ZWF0aGVyID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gIGNvbnNvbGUubG9nKHdlYXRoZXIpO1xyXG4gIHJldHVybiB3ZWF0aGVyO1xyXG59O1xyXG5cclxuLy8gbGV0IGRpc3BsYXlQaWNrZWRDaXR5ID0gKCkgPT4ge1xyXG4vLyAgIGZvcm1hdFdlYXRoZXIoZ2V0U3BlY2lmaWNDb29yZGluYXRlcyhgJHthcnJbMF19YCwgYCR7YXJyWzFdfWAsIGAke2FyclsyXX1gKSk7XHJcbi8vICAgLy8gcmV0dXJucyB3ZWF0aGVyIG9iamVjdFxyXG5cclxuLy8gfTtcclxuXHJcbmNsYXNzIFdlYXRoZXJPYmoge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgdGVtcCxcclxuICAgIGZlZWxzTGlrZSxcclxuICAgIGNpdHksXHJcbiAgICBjbG91ZENvdmVyLFxyXG4gICAgaHVtaWRpdHksXHJcbiAgICBjb25kaXRpb25zLFxyXG4gICAgY29uZGl0aW9uc0Rlc2MsXHJcbiAgICB3aW5kU3BlZWQsXHJcbiAgICB3aW5kR3VzdCxcclxuICAgIHZpc2liaWxpdHlcclxuICApIHtcclxuICAgIHRoaXMudGVtcCA9IHRlbXA7XHJcbiAgICB0aGlzLmZlZWxzTGlrZSA9IGZlZWxzTGlrZTtcclxuICAgIHRoaXMuY2l0eSA9IGNpdHk7XHJcbiAgICB0aGlzLmNsb3VkQ292ZXIgPSBjbG91ZENvdmVyO1xyXG4gICAgdGhpcy5odW1pZGl0eSA9IGh1bWlkaXR5O1xyXG4gICAgdGhpcy5jb25kaXRpb25zID0gY29uZGl0aW9ucztcclxuICAgIHRoaXMuY29uZGl0aW9uc0Rlc2MgPSBjb25kaXRpb25zRGVzYztcclxuICAgIHRoaXMud2luZFNwZWVkID0gd2luZFNwZWVkO1xyXG4gICAgdGhpcy53aW5kR3VzdCA9IHdpbmRHdXN0O1xyXG4gICAgdGhpcy52aXNpYmlsaXR5ID0gdmlzaWJpbGl0eTtcclxuICB9XHJcbn1cclxuXHJcbmxldCBmb3JtYXRXZWF0aGVyID0gYXN5bmMgKCkgPT4ge1xyXG4gIGxldCB3ZWF0aGVyID0gYXdhaXQgZ2V0V2VhdGhlcihcclxuICAgIGdldFNwZWNpZmljQ29vcmRpbmF0ZXMoYCR7YXJyWzBdfWAsIGAke2FyclsxXX1gLCBgJHthcnJbMl19YClcclxuICApO1xyXG4gIGxldCBmb3JtYXQgPSBuZXcgV2VhdGhlck9iaihcclxuICAgIHdlYXRoZXIubWFpbi50ZW1wLFxyXG4gICAgd2VhdGhlci5tYWluLmZlZWxzX2xpa2UsXHJcbiAgICB3ZWF0aGVyLm5hbWUsXHJcbiAgICB3ZWF0aGVyLmNsb3Vkcy5hbGwsXHJcbiAgICB3ZWF0aGVyLm1haW4uaHVtaWRpdHksXHJcbiAgICB3ZWF0aGVyLndlYXRoZXJbMF0ubWFpbixcclxuICAgIHdlYXRoZXIud2VhdGhlclswXS5kZXNjcmlwdGlvbixcclxuICAgIHdlYXRoZXIud2luZC5zcGVlZCxcclxuICAgIHdlYXRoZXIud2luZC5ndXN0LFxyXG4gICAgd2VhdGhlci52aXNpYmlsaXR5XHJcbiAgKTtcclxuXHJcbiAgLy8gICBjb25zb2xlLmxvZyh3ZWF0aGVyLm1haW4uZmVlbHNfbGlrZSk7XHJcbiAgcmV0dXJuIGZvcm1hdDtcclxufTtcclxuXHJcbmxldCBjaGFuZ2VCYWNrZ3JvdW5kID0gKGNvbmRpdGlvbikgPT4ge1xyXG4gIGlmIChjb25kaXRpb24gPT09ICdDbG91ZHMnKSB7XHJcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9XHJcbiAgICAgICd1cmwoXCIuL2JpbGx5LWh1eW5oLXY5Ym5mTUN5S2JnLXVuc3BsYXNoLmpwZ1wiKSc7XHJcbiAgfSBlbHNlIGlmIChjb25kaXRpb24gPT09ICdSYWluJyB8fCBjb25kaXRpb24gPT09ICdEcml6emxlJykge1xyXG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPVxyXG4gICAgICAndXJsKFwiLi9taXRvZHJ1LWdob3NoLVlmdmVNZ1hTV2tjLXVuc3BsYXNoLmpwZ1wiKSc7XHJcbiAgfSBlbHNlIGlmIChjb25kaXRpb24gPT09ICdUaHVuZGVyc3Rvcm0nKSB7XHJcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9XHJcbiAgICAgICd1cmwoXCIuL3JheWNoZWwtc2FubmVyLTFjSlhwbFR4cm1JLXVuc3BsYXNoLmpwZ1wiKSc7XHJcbiAgfSBlbHNlIGlmIChjb25kaXRpb24gPT09ICdTbm93Jykge1xyXG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPVxyXG4gICAgICAndXJsKFwiLi9icmlhbi1qb25lcy1zOFFTSlRKSTZxZy11bnNwbGFzaC5qcGdcIiknO1xyXG4gIH1lbHNlIGlmKGNvbmRpdGlvbiA9PT0gJ0NsZWFyJyl7XHJcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9XHJcbiAgICAgICd1cmwoXCIuL2FudHVuZXMtdmlsYS1ub3ZhLW5ldG8tSVVBeW9BQmlsYUEtdW5zcGxhc2guanBnXCIpJztcclxuICB9ZWxzZXtcclxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQXR0cmlidXRlKCdiYWNrZ3JvdW5kSW1hZ2UnKTtcclxuICB9XHJcbn07XHJcblxyXG5sZXQgZGlzcGxheVdlYXRoZXIgPSBhc3luYyAoKSA9PiB7XHJcbiAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZm9ybWF0V2VhdGhlcigpO1xyXG4gIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuICBsZXQgdGl0bGUgPSBjcmVhdGUoXHJcbiAgICAnaDInLFxyXG4gICAgJ3RpdGxlJyxcclxuICAgICd0aXRsZScsXHJcbiAgICBgV2VhdGhlciBmb3IgJHtjaXR5TmFtZX1gLFxyXG4gICAgRG9tLmNvbnRhaW5lclxyXG4gICk7XHJcbiAgbGV0IHRlbXAgPSBjcmVhdGUoXHJcbiAgICAncCcsXHJcbiAgICAndGVtcCcsXHJcbiAgICAndGVtcCcsXHJcbiAgICBgVGVtcGVyYXR1cmU6ICR7cmVzcG9uc2UudGVtcH1gLFxyXG4gICAgRG9tLmNvbnRhaW5lclxyXG4gICk7XHJcbiAgbGV0IGNvbmRpdGlvbnMgPSBjcmVhdGUoXHJcbiAgICAncCcsXHJcbiAgICAnY29uZGl0aW9ucycsXHJcbiAgICAnY29uZGl0aW9ucycsXHJcbiAgICBgQ29uZGl0aW9uczogJHtyZXNwb25zZS5jb25kaXRpb25zfSAoJHtyZXNwb25zZS5jb25kaXRpb25zRGVzY30pYCxcclxuICAgIERvbS5jb250YWluZXJcclxuICApO1xyXG4gIGNoYW5nZUJhY2tncm91bmQoYCR7cmVzcG9uc2UuY29uZGl0aW9uc31gKTtcclxuXHJcbiAgbGV0IGNsb3VkQ292ZXIgPSBjcmVhdGUoXHJcbiAgICAncCcsXHJcbiAgICAnY2xvdWRDb3ZlcicsXHJcbiAgICAnY2xvdWRDb3ZlcicsXHJcbiAgICBgQ2xvdWQgQ292ZXI6ICR7cmVzcG9uc2UuY2xvdWRDb3Zlcn0lYCxcclxuICAgIERvbS5jb250YWluZXJcclxuICApO1xyXG4gIGlmIChyZXNwb25zZS5odW1pZGl0eSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBsZXQgaHVtaWRpdHkgPSBjcmVhdGUoXHJcbiAgICAgICdwJyxcclxuICAgICAgJ2h1bWlkaXR5JyxcclxuICAgICAgJ2h1bWlkaXR5JyxcclxuICAgICAgYEh1bWlkaXR5OiAke3Jlc3BvbnNlLmh1bWlkaXR5fSVgLFxyXG4gICAgICBEb20uY29udGFpbmVyXHJcbiAgICApO1xyXG4gIH1cclxuICBsZXQgZmVlbHNMaWtlID0gY3JlYXRlKFxyXG4gICAgJ3AnLFxyXG4gICAgJ2ZlZWxzTGlrZScsXHJcbiAgICAnZmVlbHNMaWtlJyxcclxuICAgIGBGZWVscyBMaWtlOiAke3Jlc3BvbnNlLmZlZWxzTGlrZX1gLFxyXG4gICAgRG9tLmNvbnRhaW5lclxyXG4gICk7XHJcbiAgaWYgKHJlc3BvbnNlLndpbmRTcGVlZCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIGxldCB3aW5kU3BlZWQgPSBjcmVhdGUoXHJcbiAgICAgICdwJyxcclxuICAgICAgJ3dpbmRTcGVlZCcsXHJcbiAgICAgICd3aW5kU3BlZWQnLFxyXG4gICAgICBgV2luZCBTcGVlZDogJHtyZXNwb25zZS53aW5kU3BlZWR9IE1wSGAsXHJcbiAgICAgIERvbS5jb250YWluZXJcclxuICAgICk7XHJcbiAgfVxyXG4gIGlmIChyZXNwb25zZS53aW5kR3VzdCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBsZXQgd2luZEd1c3QgPSBjcmVhdGUoXHJcbiAgICAgICdwJyxcclxuICAgICAgJ3dpbmRHdXN0JyxcclxuICAgICAgJ3dpbmRHdXN0JyxcclxuICAgICAgYFdpbmQgR3VzdDogJHtyZXNwb25zZS53aW5kR3VzdH0gTXBIYCxcclxuICAgICAgRG9tLmNvbnRhaW5lclxyXG4gICAgKTtcclxuICB9XHJcbiAgbGV0IGNvbnZlcnRlZCA9IHJlc3BvbnNlLnZpc2liaWxpdHkgLyAxMDAwO1xyXG4gIGxldCB2aXNpYmlsaXR5ID0gY3JlYXRlKFxyXG4gICAgJ3AnLFxyXG4gICAgJ3Zpc2liaWxpdHknLFxyXG4gICAgJ3Zpc2liaWxpdHknLFxyXG4gICAgYFZpc2liaWxpdHk6ICR7Y29udmVydGVkfWttYCxcclxuICAgIERvbS5jb250YWluZXJcclxuICApO1xyXG59O1xyXG5cclxubGV0IGdpZlRlc3QgPSBhc3luYyAoKSA9PiB7XHJcbiAgbGV0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxyXG4gICAgJ2h0dHBzOi8vYXBpLmdpcGh5LmNvbS92MS9naWZzL3RyYW5zbGF0ZT9hcGlfa2V5PUJSbzNWVjdpRUtuUEhyMmp4T0c1U05wZ0I2Q2d6cURHJnM9cmFpbnlfd2VhdGhlciZ3ZWlyZG5lc3M9MCcsXHJcbiAgICB7IG1vZGU6ICdjb3JzJyB9XHJcbiAgKTtcclxuICBsZXQgeCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICBjb25zb2xlLmxvZyh4KTtcclxuICBpbWcuc3JjID0geC5kYXRhLmltYWdlcy5kb3duc2l6ZWRfbWVkaXVtLnVybDtcclxuICBEb20uY29udGFpbmVyLmFwcGVuZENoaWxkKGltZyk7XHJcbn07XHJcbi8vIGdpZlRlc3QoKTtcclxuXHJcbmxldCBzdWJtaXRMaXN0ZW5lciA9ICgpID0+IHtcclxuICBEb20uc3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgd2hpbGUgKERvbS5jb250YWluZXIuZmlyc3RDaGlsZCkge1xyXG4gICAgICBEb20uY29udGFpbmVyLnJlbW92ZUNoaWxkKERvbS5jb250YWluZXIuZmlyc3RDaGlsZCk7XHJcbiAgICB9XHJcbiAgICBEb20uY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGRpc3BsYXlDaXRpZXMoKTtcclxuICAgIH1jYXRjaChlKXtcclxuICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICB9XHJcbiAgICBcclxuICB9KTtcclxufTtcclxuc3VibWl0TGlzdGVuZXIoKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9