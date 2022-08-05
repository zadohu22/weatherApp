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




let getCoordinates = async () => {
  let cityVal = _Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.city.value;
  let stateVal = _Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.state.value;
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
  let x = (0,_create__WEBPACK_IMPORTED_MODULE_1__.create)('p', 'temp', 'temp', `${response.temp}`, _Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.container);
};

let submitListener = () => {
  _Dom__WEBPACK_IMPORTED_MODULE_0__.Dom.submit.addEventListener('click', async () => {
    displayWeather();
  });
};

submitListener();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWU7Ozs7Ozs7Ozs7Ozs7OztBQ1RmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWtCOzs7Ozs7O1VDVGxCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRTRCO0FBQ007O0FBRWxDO0FBQ0EsZ0JBQWdCLGdEQUFjO0FBQzlCLGlCQUFpQixpREFBZTtBQUNoQztBQUNBLHNEQUFzRCxRQUFRLEdBQUcsU0FBUztBQUMxRSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRCxVQUFVLE9BQU8sVUFBVTtBQUN0RjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsK0NBQU0seUJBQXlCLGNBQWMsR0FBRywrQ0FBYTtBQUN2RTs7QUFFQTtBQUNBLEVBQUUsNkRBQTJCO0FBQzdCO0FBQ0EsR0FBRztBQUNIOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlcmFwcC8uL3NyYy9Eb20uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcmFwcC8uL3NyYy9jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcmFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlcmFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXJhcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuY29uc3QgRG9tID0ge1xuICBjaXR5OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2l0eScpLFxuICBzdGF0ZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXRlJyksXG4gIHN1Ym1pdDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Ym1pdCcpLFxuICBmb3JtOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9ybScpLFxuICBjb250YWluZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKSxcbn07XG5cbmV4cG9ydCB7IERvbSB9O1xuIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuY29uc3QgY3JlYXRlID0gKGVsZW1lbnQsIGlkLCBjbHMsIHRleHQsIGFwcGVuZCkgPT4ge1xuICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudCk7XG4gIGVsLmlkID0gaWQ7XG4gIGVsLmNsYXNzTGlzdC5hZGQoY2xzKTtcbiAgZWwudGV4dENvbnRlbnQgPSB0ZXh0O1xuICBhcHBlbmQuYXBwZW5kQ2hpbGQoZWwpO1xufTtcblxuZXhwb3J0IHsgY3JlYXRlIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXBsdXNwbHVzICovXG4vKiBlc2xpbnQtZGlzYWJsZSBwcmVmZXItZGVzdHJ1Y3R1cmluZyAqL1xuLyogZXNsaW50LWRpc2FibGUgZW9sLWxhc3QgKi9cbi8qIGVzbGludC1kaXNhYmxlIGNvbW1hLWRhbmdsZSAqL1xuLyogZXNsaW50LWRpc2FibGUgcHJlZmVyLWNvbnN0ICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuXG4vLyBhcGkga2V5ID0gMTllNzk3NDQwNmVkMzc3OTEyOGFlOGRhYTA5NTZkNGZcblxuaW1wb3J0IHsgRG9tIH0gZnJvbSAnLi9Eb20nO1xuaW1wb3J0IHsgY3JlYXRlIH0gZnJvbSAnLi9jcmVhdGUnO1xuXG5sZXQgZ2V0Q29vcmRpbmF0ZXMgPSBhc3luYyAoKSA9PiB7XG4gIGxldCBjaXR5VmFsID0gRG9tLmNpdHkudmFsdWU7XG4gIGxldCBzdGF0ZVZhbCA9IERvbS5zdGF0ZS52YWx1ZTtcbiAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgYGh0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2dlby8xLjAvZGlyZWN0P3E9JHtjaXR5VmFsfSwke3N0YXRlVmFsfSwxJmxpbWl0PTEwJmFwcGlkPTE5ZTc5NzQ0MDZlZDM3NzkxMjhhZThkYWEwOTU2ZDRmYCxcbiAgICB7IG1vZGU6ICdjb3JzJyB9XG4gICk7XG4gIGxldCB1c2FibGUgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gIGxldCBsYXQgPSB1c2FibGVbMF0ubGF0O1xuICBsZXQgbG9uID0gdXNhYmxlWzBdLmxvbjtcbiAgcmV0dXJuIFtsYXQsIGxvbl07XG59O1xuXG5sZXQgZ2V0V2VhdGhlciA9IGFzeW5jICgpID0+IHtcbiAgbGV0IGNvb3JkcyA9IGF3YWl0IGdldENvb3JkaW5hdGVzKCk7XG4gIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9sYXQ9JHtjb29yZHNbMF19Jmxvbj0ke2Nvb3Jkc1sxXX0mdW5pdHM9aW1wZXJpYWwmYXBwaWQ9MTllNzk3NDQwNmVkMzc3OTEyOGFlOGRhYTA5NTZkNGZgXG4gICk7XG4gIGxldCB3ZWF0aGVyID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICBjb25zb2xlLmxvZyh3ZWF0aGVyKTtcbiAgcmV0dXJuIHdlYXRoZXI7XG59O1xuXG5jbGFzcyBXZWF0aGVyT2JqIHtcbiAgY29uc3RydWN0b3IoXG4gICAgdGVtcCxcbiAgICBmZWVsc0xpa2UsXG4gICAgY2l0eSxcbiAgICBjbG91ZENvdmVyLFxuICAgIGh1bWlkaXR5LFxuICAgIGNvbmRpdGlvbnMsXG4gICAgd2luZFNwZWVkLFxuICAgIHZpc2liaWxpdHlcbiAgKSB7XG4gICAgdGhpcy50ZW1wID0gdGVtcDtcbiAgICB0aGlzLmZlZWxzTGlrZSA9IGZlZWxzTGlrZTtcbiAgICB0aGlzLmNpdHkgPSBjaXR5O1xuICAgIHRoaXMuY2xvdWRDb3ZlciA9IGNsb3VkQ292ZXI7XG4gICAgdGhpcy5odW1pZGl0eSA9IGh1bWlkaXR5O1xuICAgIHRoaXMuY29uZGl0aW9ucyA9IGNvbmRpdGlvbnM7XG4gICAgdGhpcy53aW5kU3BlZWQgPSB3aW5kU3BlZWQ7XG4gICAgdGhpcy52aXNpYmlsaXR5ID0gdmlzaWJpbGl0eTtcbiAgfVxufVxuXG5sZXQgZm9ybWF0V2VhdGhlciA9IGFzeW5jICgpID0+IHtcbiAgbGV0IHdlYXRoZXIgPSBhd2FpdCBnZXRXZWF0aGVyKCk7XG4gIGxldCBmb3JtYXQgPSBuZXcgV2VhdGhlck9iaihcbiAgICB3ZWF0aGVyLm1haW4udGVtcCxcbiAgICB3ZWF0aGVyLm1haW4uZmVlbHNfbGlrZSxcbiAgICB3ZWF0aGVyLm5hbWUsXG4gICAgd2VhdGhlci5jbG91ZHMuYWxsLFxuICAgIHdlYXRoZXIubWFpbi5odW1pZGl0eSxcbiAgICB3ZWF0aGVyLndlYXRoZXJbMF0ubWFpbixcbiAgICB3ZWF0aGVyLndpbmQuc3BlZWQsXG4gICAgd2VhdGhlci52aXNpYmlsaXR5XG4gICk7XG5cbiAgLy8gICBjb25zb2xlLmxvZyh3ZWF0aGVyLm1haW4uZmVlbHNfbGlrZSk7XG4gIHJldHVybiBmb3JtYXQ7XG59O1xuXG5sZXQgZGlzcGxheVdlYXRoZXIgPSBhc3luYyAoKSA9PiB7XG4gIGxldCByZXNwb25zZSA9IGF3YWl0IGZvcm1hdFdlYXRoZXIoKTtcbiAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICBsZXQgeCA9IGNyZWF0ZSgncCcsICd0ZW1wJywgJ3RlbXAnLCBgJHtyZXNwb25zZS50ZW1wfWAsIERvbS5jb250YWluZXIpO1xufTtcblxubGV0IHN1Ym1pdExpc3RlbmVyID0gKCkgPT4ge1xuICBEb20uc3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xuICAgIGRpc3BsYXlXZWF0aGVyKCk7XG4gIH0pO1xufTtcblxuc3VibWl0TGlzdGVuZXIoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==