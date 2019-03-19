/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const CanvasManager_1 = __webpack_require__(1);
class App {
    constructor() {
        this.CanvasManager = new CanvasManager_1.default();
    }
}
exports.default = App;
/**
 * IIFE for starting the app
 */
(() => {
    new App();
})();
//# sourceMappingURL=App.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Block_1 = __webpack_require__(2);
const aabb_1 = __webpack_require__(4);
const collisionResonse_1 = __webpack_require__(5);
class CanvasManager {
    constructor() {
        /**
         * Called on the DOMs reapaint using `requestAnimationFrame`.
         */
        this.loop = () => {
            const newTime = performance.now();
            const deltaTime = (newTime - this._time) / 1000;
            this._time = newTime;
            this.update(deltaTime);
            this.draw();
            requestAnimationFrame(this.loop);
        };
        this.canvas = document.body.querySelector('.js-canvas');
        if (this.canvas === null) {
            console.log(`%c[Canvas Manager] %ccouldn't find the canvas element`, 'color:#f4f94f', 'color:#eee');
        }
        else {
            console.log(`%c[Canvas Manager] %cfound the canvas element`, 'color:#f4f94f', 'color:#eee');
        }
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this._context = this.canvas.getContext('2d');
        console.log(`%c[Canvas Manager] %csetting the context to 2d`, 'color:#f4f94f', 'color:#eee');
        this._time = null;
        this._blocks = [];
        this.init();
    }
    /**
     * Called when the `CanvasManager` is constructed.
     */
    init() {
        this.spawnBlocks();
        this._time = performance.now();
        requestAnimationFrame(this.loop);
    }
    /**
     * Used to spawn a grid of 9 `Block` objects.
     */
    spawnBlocks() {
        let id = 0;
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                const blockPosition = {
                    x: (x * 48 + (x * 8)),
                    y: (y * 48 + (y * 8))
                };
                const newBlock = new Block_1.default(this.canvas, id, blockPosition);
                this._blocks.push(newBlock);
                id++;
            }
        }
    }
    draw() {
        // Clear the canvas at the beginning of each frame
        this._context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this._blocks.length; i++) {
            this._context.fillStyle = this._blocks[i].color;
            this._context.fillRect(this._blocks[i].position.x, this._blocks[i].position.y, this._blocks[i].size.width, this._blocks[i].size.height);
        }
    }
    update(deltaTime) {
        // Update objects position
        for (let i = this._blocks.length - 1; i >= 0; i--) {
            this._blocks[i].update(deltaTime);
            // Check for collisions
            for (let k = 0; k < this._blocks.length; k++) {
                if (this._blocks[i].id !== this._blocks[k].id) {
                    if (aabb_1.default(this._blocks[i], this._blocks[k])) {
                        // Handle collision
                        const collisionReponse = collisionResonse_1.default(this._blocks[i], this._blocks[k]);
                        if (collisionReponse.x !== 0) {
                            this._blocks[i].position.x = collisionReponse.x;
                        }
                        else {
                            this._blocks[i].position.y = collisionReponse.y;
                            this._blocks[i].velocity.deltaY = 1;
                        }
                    }
                }
            }
        }
    }
}
exports.default = CanvasManager;
//# sourceMappingURL=CanvasManager.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const InteractiveObject_1 = __webpack_require__(3);
class Block extends InteractiveObject_1.default {
    constructor(canvas, id, position) {
        super(canvas, id, position, { width: 48, height: 48 });
    }
    /**
     * Called by the `InteractiveObject` class when the `Block` is constructed.
     */
    init() {
    }
    /**
     * Called on `requestAnimationFrame` from the `CanvasManager`
     * @param { number } deltaTime
     */
    update(deltaTime) {
        // Apply friction to the object
        this.velocity.deltaY *= InteractiveObject_1.default.FRICTION;
        // Increase gravity velocity
        this.velocity.deltaY += (deltaTime * InteractiveObject_1.default.GRAVITY_SPEED) + InteractiveObject_1.default.GRAVITY;
        // Update objects position
        this.position.y += this.velocity.deltaY;
        // Limit object to the screen
        if (this.position.y >= (this.canvas.height - this.size.height)) {
            this.velocity.deltaY = 0;
            this.position.y = this.canvas.height - this.size.height;
        }
    }
}
exports.default = Block;
//# sourceMappingURL=Block.js.map

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class InteractiveObject {
    constructor(canvas, id, pos, size, rot = 0) {
        this.position = pos;
        this.rotation = rot;
        this.size = size;
        this.id = id;
        this.color = `rgba(${this.getRandomInt(0, 255)},${this.getRandomInt(0, 255)},${this.getRandomInt(0, 255)},0.87)`;
        this.velocity = { deltaX: 0, deltaY: 0 };
        this.canvas = canvas;
        this.init();
    }
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    /**
     * Called when the `InteractiveBlock` is constructed.
     */
    init() { }
    update(deltaTime) { }
}
InteractiveObject.GRAVITY = 1;
InteractiveObject.GRAVITY_SPEED = 64;
InteractiveObject.FRICTION = 0.97;
exports.default = InteractiveObject;
//# sourceMappingURL=InteractiveObject.js.map

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (object1, object2) => {
    let isColliding = false;
    if (object1.position.x <= object2.position.x + object2.size.width && object1.position.x + object1.size.width >= object2.position.x && object1.position.y <= object2.position.y + object2.size.height && object1.position.y + object1.size.height >= object2.position.y) {
        isColliding = true;
    }
    return isColliding;
};
//# sourceMappingURL=aabb.js.map

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Calculates the overlap between two AABB objects.
 * @returns { ICollisionResponse } `object`
 */
exports.default = (object1, object2) => {
    let collisionResponse = {
        x: 0,
        y: 0
    };
    const distanceX = (object1.position.x + (object1.size.width / 2)) - (object2.position.x + (object2.size.width / 2));
    const distanceY = (object1.position.y + (object1.size.height / 2)) - (object2.position.y + (object2.size.height / 2));
    // Check for Y or X collision
    if (distanceY * distanceY > distanceX * distanceX) {
        if (distanceY > 0) {
            // Resolve bottom
            collisionResponse.y = (object2.position.y + object2.size.height);
        }
        else {
            // Resolve up
            collisionResponse.y = (object2.position.y - object1.size.height);
        }
    }
    else {
        if (distanceX > 0) {
            // Resolve right
            collisionResponse.x = (object2.position.x + object2.size.width);
        }
        else {
            // Resolve left
            collisionResponse.x = (object2.position.x - object1.size.width);
        }
    }
    return collisionResponse;
};
//# sourceMappingURL=collisionResonse.js.map

/***/ })
/******/ ]);