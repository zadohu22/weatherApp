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
let cityName = "";
let getInitialCoordinates = async () => {
  let cityVal = _Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.city.value;
  // let stateVal = Dom.state.value;
  let response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${cityVal},1&limit=10&appid=19e7974406ed3779128ae8daa0956d4f`,
    { mode: "cors" }
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
    `https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}1&limit=10&appid=19e7974406ed3779128ae8daa0956d4f`,
    { mode: "cors" }
  );
  let usable = await response.json();
  console.log(usable);
  let lat = usable[0].lat;
  let lon = usable[0].lon;

  console.log([lat, lon]);
  return [lat, lon];
};

let pickCity = () => {
  let content = document.querySelectorAll("#content");

  content.forEach((e, i) => {
    e.addEventListener("click", () => {
      let text = e.innerText;
      let format = text.split(",");
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
    let content = document.createElement("p");
    content.textContent = `${e.name}, ${e.state}, ${e.country}`;
    content.style.cursor = "pointer";
    _Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.container.appendChild(content);
    content.id = "content";
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
  if (condition === "Clouds") {
    document.body.style.backgroundImage =
      'url("./billy-huynh-v9bnfMCyKbg-unsplash.jpg")';
  } else if (condition === "Rain" || condition === "Drizzle") {
    document.body.style.backgroundImage =
      'url("./mitodru-ghosh-YfveMgXSWkc-unsplash.jpg")';
  } else if (condition === "Thunderstorm") {
    document.body.style.backgroundImage =
      'url("./raychel-sanner-1cJXplTxrmI-unsplash.jpg")';
  } else if (condition === "Snow") {
    document.body.style.backgroundImage =
      'url("./brian-jones-s8QSJTJI6qg-unsplash.jpg")';
  } else if (condition === "Clear") {
    document.body.style.backgroundImage =
      'url("./antunes-vila-nova-neto-IUAyoABilaA-unsplash.jpg")';
  } else {
    document.body.removeAttribute("backgroundImage");
  }
};

let displayWeather = async () => {
  let response = await formatWeather();
  console.log(response);
  let title = (0,_create__WEBPACK_IMPORTED_MODULE_1__.create)(
    "h2",
    "title",
    "title",
    `Weather for ${cityName}`,
    _Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.container
  );
  let temp = (0,_create__WEBPACK_IMPORTED_MODULE_1__.create)(
    "p",
    "temp",
    "temp",
    `Temperature: ${response.temp}`,
    _Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.container
  );
  let conditions = (0,_create__WEBPACK_IMPORTED_MODULE_1__.create)(
    "p",
    "conditions",
    "conditions",
    `Conditions: ${response.conditions} (${response.conditionsDesc})`,
    _Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.container
  );
  changeBackground(`${response.conditions}`);

  let cloudCover = (0,_create__WEBPACK_IMPORTED_MODULE_1__.create)(
    "p",
    "cloudCover",
    "cloudCover",
    `Cloud Cover: ${response.cloudCover}%`,
    _Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.container
  );
  if (response.humidity !== undefined) {
    let humidity = (0,_create__WEBPACK_IMPORTED_MODULE_1__.create)(
      "p",
      "humidity",
      "humidity",
      `Humidity: ${response.humidity}%`,
      _Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.container
    );
  }
  let feelsLike = (0,_create__WEBPACK_IMPORTED_MODULE_1__.create)(
    "p",
    "feelsLike",
    "feelsLike",
    `Feels Like: ${response.feelsLike}`,
    _Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.container
  );
  if (response.windSpeed !== "undefined") {
    let windSpeed = (0,_create__WEBPACK_IMPORTED_MODULE_1__.create)(
      "p",
      "windSpeed",
      "windSpeed",
      `Wind Speed: ${response.windSpeed} MpH`,
      _Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.container
    );
  }
  if (response.windGust !== undefined) {
    let windGust = (0,_create__WEBPACK_IMPORTED_MODULE_1__.create)(
      "p",
      "windGust",
      "windGust",
      `Wind Gust: ${response.windGust} MpH`,
      _Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.container
    );
  }
  let converted = response.visibility / 1000;
  let visibility = (0,_create__WEBPACK_IMPORTED_MODULE_1__.create)(
    "p",
    "visibility",
    "visibility",
    `Visibility: ${converted}km`,
    _Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.container
  );
};

let gifTest = async () => {
  let img = document.createElement("img");
  let response = await fetch(
    "https://api.giphy.com/v1/gifs/translate?api_key=BRo3VV7iEKnPHr2jxOG5SNpgB6CgzqDG&s=rainy_weather&weirdness=0",
    { mode: "cors" }
  );
  let x = await response.json();
  console.log(x);
  img.src = x.data.images.downsized_medium.url;
  _Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.container.appendChild(img);
};
// gifTest();

let submitListener = () => {
  _Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.submit.addEventListener("click", async () => {
    while (_Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.container.firstChild) {
      _Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.container.removeChild(_Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.container.firstChild);
    }
    _Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.container.classList.remove("hide");
    try {
      displayCities();
    } catch (e) {
      console.log(e);
    }
  });
};
submitListener();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0EsbUJBQW1CLCtDQUFNO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixvQkFBb0I7QUFDeEMsSUFBSSwrQ0FBYTtBQUNqQjtBQUNBO0FBQ0EsbUJBQW1CLCtDQUFNO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixrQkFBa0I7QUFDckMsTUFBTSwrQ0FBYTtBQUNuQjtBQUNBO0FBQ0Esa0JBQWtCLCtDQUFNO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixtQkFBbUI7QUFDdEMsSUFBSSwrQ0FBYTtBQUNqQjtBQUNBO0FBQ0Esb0JBQW9CLCtDQUFNO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixvQkFBb0I7QUFDekMsTUFBTSwrQ0FBYTtBQUNuQjtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsK0NBQU07QUFDekI7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG1CQUFtQjtBQUN2QyxNQUFNLCtDQUFhO0FBQ25CO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiwrQ0FBTTtBQUN6QjtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsVUFBVTtBQUM3QixJQUFJLCtDQUFhO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSwyREFBeUI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLDZEQUEyQjtBQUM3QixXQUFXLDBEQUF3QjtBQUNuQyxNQUFNLDJEQUF5QixDQUFDLDBEQUF3QjtBQUN4RDtBQUNBLElBQUksZ0VBQThCO0FBQ2xDO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlcmFwcC8uL3NyYy9Eb20uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcmFwcC8uL3NyYy9jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcmFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlcmFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXJhcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xyXG5jb25zdCBEb20gPSB7XHJcbiAgY2l0eTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NpdHknKSxcclxuICBzdGF0ZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXRlJyksXHJcbiAgc3VibWl0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWl0JyksXHJcbiAgZm9ybTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvcm0nKSxcclxuICBjb250YWluZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKSxcclxufTtcclxuXHJcbmV4cG9ydCB7IERvbSB9O1xyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXHJcbmNvbnN0IGNyZWF0ZSA9IChlbGVtZW50LCBpZCwgY2xzLCB0ZXh0LCBhcHBlbmQpID0+IHtcclxuICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudCk7XHJcbiAgZWwuaWQgPSBpZDtcclxuICBlbC5jbGFzc0xpc3QuYWRkKGNscyk7XHJcbiAgZWwudGV4dENvbnRlbnQgPSB0ZXh0O1xyXG4gIGFwcGVuZC5hcHBlbmRDaGlsZChlbCk7XHJcbn07XHJcblxyXG5leHBvcnQgeyBjcmVhdGUgfTtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBwcmVmZXItZGVzdHJ1Y3R1cmluZyAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBlb2wtbGFzdCAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBjb21tYS1kYW5nbGUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgcHJlZmVyLWNvbnN0ICovXHJcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXHJcbi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cclxuXHJcbi8vIGFwaSBrZXkgPSAxOWU3OTc0NDA2ZWQzNzc5MTI4YWU4ZGFhMDk1NmQ0ZlxyXG5cclxuaW1wb3J0IHsgRG9tIH0gZnJvbSBcIi4vRG9tXCI7XHJcbmltcG9ydCB7IGNyZWF0ZSB9IGZyb20gXCIuL2NyZWF0ZVwiO1xyXG5cclxubGV0IGFyciA9IFtdO1xyXG5sZXQgY2l0eU5hbWUgPSBcIlwiO1xyXG5sZXQgZ2V0SW5pdGlhbENvb3JkaW5hdGVzID0gYXN5bmMgKCkgPT4ge1xyXG4gIGxldCBjaXR5VmFsID0gRG9tLmNpdHkudmFsdWU7XHJcbiAgLy8gbGV0IHN0YXRlVmFsID0gRG9tLnN0YXRlLnZhbHVlO1xyXG4gIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxyXG4gICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9nZW8vMS4wL2RpcmVjdD9xPSR7Y2l0eVZhbH0sMSZsaW1pdD0xMCZhcHBpZD0xOWU3OTc0NDA2ZWQzNzc5MTI4YWU4ZGFhMDk1NmQ0ZmAsXHJcbiAgICB7IG1vZGU6IFwiY29yc1wiIH1cclxuICApO1xyXG4gIGxldCB1c2FibGUgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgLy8gbGV0IGxhdCA9IHVzYWJsZVswXS5sYXQ7XHJcbiAgLy8gbGV0IGxvbiA9IHVzYWJsZVswXS5sb247XHJcbiAgY29uc29sZS5sb2codXNhYmxlKTtcclxuICByZXR1cm4gdXNhYmxlO1xyXG4gIC8vIHJldHVybiBbbGF0LCBsb25dO1xyXG59O1xyXG5cclxubGV0IGdldFNwZWNpZmljQ29vcmRpbmF0ZXMgPSBhc3luYyAoY2l0eSwgc3RhdGUsIGNvdW50cnkpID0+IHtcclxuICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcclxuICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZ2VvLzEuMC9kaXJlY3Q/cT0ke2NpdHl9LCR7c3RhdGV9LCR7Y291bnRyeX0xJmxpbWl0PTEwJmFwcGlkPTE5ZTc5NzQ0MDZlZDM3NzkxMjhhZThkYWEwOTU2ZDRmYCxcclxuICAgIHsgbW9kZTogXCJjb3JzXCIgfVxyXG4gICk7XHJcbiAgbGV0IHVzYWJsZSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICBjb25zb2xlLmxvZyh1c2FibGUpO1xyXG4gIGxldCBsYXQgPSB1c2FibGVbMF0ubGF0O1xyXG4gIGxldCBsb24gPSB1c2FibGVbMF0ubG9uO1xyXG5cclxuICBjb25zb2xlLmxvZyhbbGF0LCBsb25dKTtcclxuICByZXR1cm4gW2xhdCwgbG9uXTtcclxufTtcclxuXHJcbmxldCBwaWNrQ2l0eSA9ICgpID0+IHtcclxuICBsZXQgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjY29udGVudFwiKTtcclxuXHJcbiAgY29udGVudC5mb3JFYWNoKChlLCBpKSA9PiB7XHJcbiAgICBlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgIGxldCB0ZXh0ID0gZS5pbm5lclRleHQ7XHJcbiAgICAgIGxldCBmb3JtYXQgPSB0ZXh0LnNwbGl0KFwiLFwiKTtcclxuICAgICAgYXJyID0gW107XHJcbiAgICAgIGFyci5wdXNoKGZvcm1hdFswXSwgZm9ybWF0WzFdLCBmb3JtYXRbMl0pO1xyXG4gICAgICBjaXR5TmFtZSA9IGZvcm1hdFswXTtcclxuICAgICAgY29uc29sZS5sb2coY2l0eU5hbWUpO1xyXG4gICAgICBjb25zb2xlLmxvZyhhcnIpO1xyXG4gICAgICAvLyByZW1vdmUgd2hvbGUgbGlzdCBvZiBjaXRpZXNcclxuICAgICAgd2hpbGUgKERvbS5jb250YWluZXIuZmlyc3RDaGlsZCkge1xyXG4gICAgICAgIERvbS5jb250YWluZXIucmVtb3ZlQ2hpbGQoRG9tLmNvbnRhaW5lci5maXJzdENoaWxkKTtcclxuICAgICAgfVxyXG4gICAgICBkaXNwbGF5V2VhdGhlcigpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgY29uc29sZS5sb2coYXJyKTtcclxufTtcclxuXHJcbmxldCBkaXNwbGF5Q2l0aWVzID0gYXN5bmMgKCkgPT4ge1xyXG4gIGxldCByZXNwb25zZSA9IGF3YWl0IGdldEluaXRpYWxDb29yZGluYXRlcygpO1xyXG4gIHJlc3BvbnNlLmZvckVhY2goKGUsIGkpID0+IHtcclxuICAgIGxldCBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgICBjb250ZW50LnRleHRDb250ZW50ID0gYCR7ZS5uYW1lfSwgJHtlLnN0YXRlfSwgJHtlLmNvdW50cnl9YDtcclxuICAgIGNvbnRlbnQuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XHJcbiAgICBEb20uY29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnRlbnQpO1xyXG4gICAgY29udGVudC5pZCA9IFwiY29udGVudFwiO1xyXG4gIH0pO1xyXG4gIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuICBwaWNrQ2l0eSgpO1xyXG59O1xyXG5cclxubGV0IGdldFdlYXRoZXIgPSBhc3luYyAoaW5pdGlhbE9yU3BlY2lmaWMpID0+IHtcclxuICBsZXQgY29vcmRzID0gYXdhaXQgaW5pdGlhbE9yU3BlY2lmaWM7XHJcbiAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXHJcbiAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/bGF0PSR7Y29vcmRzWzBdfSZsb249JHtjb29yZHNbMV19JnVuaXRzPWltcGVyaWFsJmFwcGlkPTE5ZTc5NzQ0MDZlZDM3NzkxMjhhZThkYWEwOTU2ZDRmYFxyXG4gICk7XHJcbiAgbGV0IHdlYXRoZXIgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgY29uc29sZS5sb2cod2VhdGhlcik7XHJcbiAgcmV0dXJuIHdlYXRoZXI7XHJcbn07XHJcblxyXG4vLyBsZXQgZGlzcGxheVBpY2tlZENpdHkgPSAoKSA9PiB7XHJcbi8vICAgZm9ybWF0V2VhdGhlcihnZXRTcGVjaWZpY0Nvb3JkaW5hdGVzKGAke2FyclswXX1gLCBgJHthcnJbMV19YCwgYCR7YXJyWzJdfWApKTtcclxuLy8gICAvLyByZXR1cm5zIHdlYXRoZXIgb2JqZWN0XHJcblxyXG4vLyB9O1xyXG5cclxuY2xhc3MgV2VhdGhlck9iaiB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICB0ZW1wLFxyXG4gICAgZmVlbHNMaWtlLFxyXG4gICAgY2l0eSxcclxuICAgIGNsb3VkQ292ZXIsXHJcbiAgICBodW1pZGl0eSxcclxuICAgIGNvbmRpdGlvbnMsXHJcbiAgICBjb25kaXRpb25zRGVzYyxcclxuICAgIHdpbmRTcGVlZCxcclxuICAgIHdpbmRHdXN0LFxyXG4gICAgdmlzaWJpbGl0eVxyXG4gICkge1xyXG4gICAgdGhpcy50ZW1wID0gdGVtcDtcclxuICAgIHRoaXMuZmVlbHNMaWtlID0gZmVlbHNMaWtlO1xyXG4gICAgdGhpcy5jaXR5ID0gY2l0eTtcclxuICAgIHRoaXMuY2xvdWRDb3ZlciA9IGNsb3VkQ292ZXI7XHJcbiAgICB0aGlzLmh1bWlkaXR5ID0gaHVtaWRpdHk7XHJcbiAgICB0aGlzLmNvbmRpdGlvbnMgPSBjb25kaXRpb25zO1xyXG4gICAgdGhpcy5jb25kaXRpb25zRGVzYyA9IGNvbmRpdGlvbnNEZXNjO1xyXG4gICAgdGhpcy53aW5kU3BlZWQgPSB3aW5kU3BlZWQ7XHJcbiAgICB0aGlzLndpbmRHdXN0ID0gd2luZEd1c3Q7XHJcbiAgICB0aGlzLnZpc2liaWxpdHkgPSB2aXNpYmlsaXR5O1xyXG4gIH1cclxufVxyXG5cclxubGV0IGZvcm1hdFdlYXRoZXIgPSBhc3luYyAoKSA9PiB7XHJcbiAgbGV0IHdlYXRoZXIgPSBhd2FpdCBnZXRXZWF0aGVyKFxyXG4gICAgZ2V0U3BlY2lmaWNDb29yZGluYXRlcyhgJHthcnJbMF19YCwgYCR7YXJyWzFdfWAsIGAke2FyclsyXX1gKVxyXG4gICk7XHJcbiAgbGV0IGZvcm1hdCA9IG5ldyBXZWF0aGVyT2JqKFxyXG4gICAgd2VhdGhlci5tYWluLnRlbXAsXHJcbiAgICB3ZWF0aGVyLm1haW4uZmVlbHNfbGlrZSxcclxuICAgIHdlYXRoZXIubmFtZSxcclxuICAgIHdlYXRoZXIuY2xvdWRzLmFsbCxcclxuICAgIHdlYXRoZXIubWFpbi5odW1pZGl0eSxcclxuICAgIHdlYXRoZXIud2VhdGhlclswXS5tYWluLFxyXG4gICAgd2VhdGhlci53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLFxyXG4gICAgd2VhdGhlci53aW5kLnNwZWVkLFxyXG4gICAgd2VhdGhlci53aW5kLmd1c3QsXHJcbiAgICB3ZWF0aGVyLnZpc2liaWxpdHlcclxuICApO1xyXG5cclxuICAvLyAgIGNvbnNvbGUubG9nKHdlYXRoZXIubWFpbi5mZWVsc19saWtlKTtcclxuICByZXR1cm4gZm9ybWF0O1xyXG59O1xyXG5cclxubGV0IGNoYW5nZUJhY2tncm91bmQgPSAoY29uZGl0aW9uKSA9PiB7XHJcbiAgaWYgKGNvbmRpdGlvbiA9PT0gXCJDbG91ZHNcIikge1xyXG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPVxyXG4gICAgICAndXJsKFwiLi9iaWxseS1odXluaC12OWJuZk1DeUtiZy11bnNwbGFzaC5qcGdcIiknO1xyXG4gIH0gZWxzZSBpZiAoY29uZGl0aW9uID09PSBcIlJhaW5cIiB8fCBjb25kaXRpb24gPT09IFwiRHJpenpsZVwiKSB7XHJcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9XHJcbiAgICAgICd1cmwoXCIuL21pdG9kcnUtZ2hvc2gtWWZ2ZU1nWFNXa2MtdW5zcGxhc2guanBnXCIpJztcclxuICB9IGVsc2UgaWYgKGNvbmRpdGlvbiA9PT0gXCJUaHVuZGVyc3Rvcm1cIikge1xyXG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPVxyXG4gICAgICAndXJsKFwiLi9yYXljaGVsLXNhbm5lci0xY0pYcGxUeHJtSS11bnNwbGFzaC5qcGdcIiknO1xyXG4gIH0gZWxzZSBpZiAoY29uZGl0aW9uID09PSBcIlNub3dcIikge1xyXG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPVxyXG4gICAgICAndXJsKFwiLi9icmlhbi1qb25lcy1zOFFTSlRKSTZxZy11bnNwbGFzaC5qcGdcIiknO1xyXG4gIH0gZWxzZSBpZiAoY29uZGl0aW9uID09PSBcIkNsZWFyXCIpIHtcclxuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuYmFja2dyb3VuZEltYWdlID1cclxuICAgICAgJ3VybChcIi4vYW50dW5lcy12aWxhLW5vdmEtbmV0by1JVUF5b0FCaWxhQS11bnNwbGFzaC5qcGdcIiknO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUF0dHJpYnV0ZShcImJhY2tncm91bmRJbWFnZVwiKTtcclxuICB9XHJcbn07XHJcblxyXG5sZXQgZGlzcGxheVdlYXRoZXIgPSBhc3luYyAoKSA9PiB7XHJcbiAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZm9ybWF0V2VhdGhlcigpO1xyXG4gIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuICBsZXQgdGl0bGUgPSBjcmVhdGUoXHJcbiAgICBcImgyXCIsXHJcbiAgICBcInRpdGxlXCIsXHJcbiAgICBcInRpdGxlXCIsXHJcbiAgICBgV2VhdGhlciBmb3IgJHtjaXR5TmFtZX1gLFxyXG4gICAgRG9tLmNvbnRhaW5lclxyXG4gICk7XHJcbiAgbGV0IHRlbXAgPSBjcmVhdGUoXHJcbiAgICBcInBcIixcclxuICAgIFwidGVtcFwiLFxyXG4gICAgXCJ0ZW1wXCIsXHJcbiAgICBgVGVtcGVyYXR1cmU6ICR7cmVzcG9uc2UudGVtcH1gLFxyXG4gICAgRG9tLmNvbnRhaW5lclxyXG4gICk7XHJcbiAgbGV0IGNvbmRpdGlvbnMgPSBjcmVhdGUoXHJcbiAgICBcInBcIixcclxuICAgIFwiY29uZGl0aW9uc1wiLFxyXG4gICAgXCJjb25kaXRpb25zXCIsXHJcbiAgICBgQ29uZGl0aW9uczogJHtyZXNwb25zZS5jb25kaXRpb25zfSAoJHtyZXNwb25zZS5jb25kaXRpb25zRGVzY30pYCxcclxuICAgIERvbS5jb250YWluZXJcclxuICApO1xyXG4gIGNoYW5nZUJhY2tncm91bmQoYCR7cmVzcG9uc2UuY29uZGl0aW9uc31gKTtcclxuXHJcbiAgbGV0IGNsb3VkQ292ZXIgPSBjcmVhdGUoXHJcbiAgICBcInBcIixcclxuICAgIFwiY2xvdWRDb3ZlclwiLFxyXG4gICAgXCJjbG91ZENvdmVyXCIsXHJcbiAgICBgQ2xvdWQgQ292ZXI6ICR7cmVzcG9uc2UuY2xvdWRDb3Zlcn0lYCxcclxuICAgIERvbS5jb250YWluZXJcclxuICApO1xyXG4gIGlmIChyZXNwb25zZS5odW1pZGl0eSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBsZXQgaHVtaWRpdHkgPSBjcmVhdGUoXHJcbiAgICAgIFwicFwiLFxyXG4gICAgICBcImh1bWlkaXR5XCIsXHJcbiAgICAgIFwiaHVtaWRpdHlcIixcclxuICAgICAgYEh1bWlkaXR5OiAke3Jlc3BvbnNlLmh1bWlkaXR5fSVgLFxyXG4gICAgICBEb20uY29udGFpbmVyXHJcbiAgICApO1xyXG4gIH1cclxuICBsZXQgZmVlbHNMaWtlID0gY3JlYXRlKFxyXG4gICAgXCJwXCIsXHJcbiAgICBcImZlZWxzTGlrZVwiLFxyXG4gICAgXCJmZWVsc0xpa2VcIixcclxuICAgIGBGZWVscyBMaWtlOiAke3Jlc3BvbnNlLmZlZWxzTGlrZX1gLFxyXG4gICAgRG9tLmNvbnRhaW5lclxyXG4gICk7XHJcbiAgaWYgKHJlc3BvbnNlLndpbmRTcGVlZCAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgbGV0IHdpbmRTcGVlZCA9IGNyZWF0ZShcclxuICAgICAgXCJwXCIsXHJcbiAgICAgIFwid2luZFNwZWVkXCIsXHJcbiAgICAgIFwid2luZFNwZWVkXCIsXHJcbiAgICAgIGBXaW5kIFNwZWVkOiAke3Jlc3BvbnNlLndpbmRTcGVlZH0gTXBIYCxcclxuICAgICAgRG9tLmNvbnRhaW5lclxyXG4gICAgKTtcclxuICB9XHJcbiAgaWYgKHJlc3BvbnNlLndpbmRHdXN0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgIGxldCB3aW5kR3VzdCA9IGNyZWF0ZShcclxuICAgICAgXCJwXCIsXHJcbiAgICAgIFwid2luZEd1c3RcIixcclxuICAgICAgXCJ3aW5kR3VzdFwiLFxyXG4gICAgICBgV2luZCBHdXN0OiAke3Jlc3BvbnNlLndpbmRHdXN0fSBNcEhgLFxyXG4gICAgICBEb20uY29udGFpbmVyXHJcbiAgICApO1xyXG4gIH1cclxuICBsZXQgY29udmVydGVkID0gcmVzcG9uc2UudmlzaWJpbGl0eSAvIDEwMDA7XHJcbiAgbGV0IHZpc2liaWxpdHkgPSBjcmVhdGUoXHJcbiAgICBcInBcIixcclxuICAgIFwidmlzaWJpbGl0eVwiLFxyXG4gICAgXCJ2aXNpYmlsaXR5XCIsXHJcbiAgICBgVmlzaWJpbGl0eTogJHtjb252ZXJ0ZWR9a21gLFxyXG4gICAgRG9tLmNvbnRhaW5lclxyXG4gICk7XHJcbn07XHJcblxyXG5sZXQgZ2lmVGVzdCA9IGFzeW5jICgpID0+IHtcclxuICBsZXQgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcclxuICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcclxuICAgIFwiaHR0cHM6Ly9hcGkuZ2lwaHkuY29tL3YxL2dpZnMvdHJhbnNsYXRlP2FwaV9rZXk9QlJvM1ZWN2lFS25QSHIyanhPRzVTTnBnQjZDZ3pxREcmcz1yYWlueV93ZWF0aGVyJndlaXJkbmVzcz0wXCIsXHJcbiAgICB7IG1vZGU6IFwiY29yc1wiIH1cclxuICApO1xyXG4gIGxldCB4ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gIGNvbnNvbGUubG9nKHgpO1xyXG4gIGltZy5zcmMgPSB4LmRhdGEuaW1hZ2VzLmRvd25zaXplZF9tZWRpdW0udXJsO1xyXG4gIERvbS5jb250YWluZXIuYXBwZW5kQ2hpbGQoaW1nKTtcclxufTtcclxuLy8gZ2lmVGVzdCgpO1xyXG5cclxubGV0IHN1Ym1pdExpc3RlbmVyID0gKCkgPT4ge1xyXG4gIERvbS5zdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcclxuICAgIHdoaWxlIChEb20uY29udGFpbmVyLmZpcnN0Q2hpbGQpIHtcclxuICAgICAgRG9tLmNvbnRhaW5lci5yZW1vdmVDaGlsZChEb20uY29udGFpbmVyLmZpcnN0Q2hpbGQpO1xyXG4gICAgfVxyXG4gICAgRG9tLmNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGRpc3BsYXlDaXRpZXMoKTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn07XHJcbnN1Ym1pdExpc3RlbmVyKCk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==